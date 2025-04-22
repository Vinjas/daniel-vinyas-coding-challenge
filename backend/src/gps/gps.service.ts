import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GpsPosition } from "../database/gps-position.entity";
import * as path from "node:path";
import * as fs from "node:fs";
import { parse } from "csv-parse/sync";
import { CreateGpsPositionDto } from "./dto/create-gps-position.dto";
import { GpsSessionDto } from "./dto/gps-session.dto";

@Injectable()
export class GpsService {
  constructor(
    @InjectRepository(GpsPosition)
    private readonly gpsPositionRepository: Repository<GpsPosition>,
  ) {}

  /**
   * Calculates the total distance in kilometers for a given list of GPS points.
   * Uses the Haversine formula to compute the great-circle distance between consecutive points.
   *
   * @param points Ordered list of GPS positions belonging to a session.
   * @returns Total distance in kilometers, rounded to two decimal places.
   */
  private calculateDistance(points: GpsPosition[]): number {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371;
    let total = 0;

    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      const dLat = toRad(b.latitude - a.latitude);
      const dLon = toRad(b.longitude - a.longitude);
      const lat1 = toRad(a.latitude);
      const lat2 = toRad(b.latitude);

      const aCalc =
        Math.sin(dLat / 2) ** 2 +
        Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));

      total += R * c;
    }

    return parseFloat(total.toFixed(2));
  }

  // Fetch all GPS positions
  async getAllGpsPositions(): Promise<GpsPosition[]> {
    return this.gpsPositionRepository.find();
  }

  // Fetch GPS positions by session ID
  async getGpsPositionsById(sessionId: string): Promise<GpsPosition[] | null> {
    return this.gpsPositionRepository.find({ where: { sessionId } });
  }

  // Save GPS position
  async saveGpsPosition(gpsPosition: GpsPosition): Promise<GpsPosition> {
    return this.gpsPositionRepository.save(gpsPosition);
  }

  // Method to create the new GpsPosition entity from the CSV parsed data using its own DTO
  async createGpsPosition(data: CreateGpsPositionDto): Promise<GpsPosition> {
    return this.gpsPositionRepository.create(data);
  }

  /**
   * Retrieves a GPS session by ID, including metadata and all GPS positions.
   * Calculates the start and end times, total duration, and distance.
   *
   * @param sessionId The ID of the session to retrieve.
   * @returns A structured session object with metadata and GPS points, or null if not found.
   */
  async getGpsSessionData(sessionId: string): Promise<GpsSessionDto | null> {
    const points = await this.getGpsPositionsById(sessionId);

    if (!points || points.length === 0) return null;

    const startTime = points[0].timestamp.getTime();
    const endTime = points[points.length - 1].timestamp.getTime();
    const durationMinutes = Math.floor((endTime - startTime) / 60000);
    const distanceKm = this.calculateDistance(points);

    return {
      sessionId,
      startTime,
      endTime,
      durationMinutes,
      distanceKm,
      points,
    };
  }
}
