import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GpsPosition } from "../database/gps-position.entity";
import * as path from "node:path";
import * as fs from "node:fs";
import {parse} from "csv-parse/sync";
import {CreateGpsPositionDto} from "./dto/create-gps-position.dto";

@Injectable()
export class GpsService {
  constructor(
    @InjectRepository(GpsPosition)
    private readonly gpsPositionRepository: Repository<GpsPosition>,
  ) {}

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
}
