import { GpsPosition } from "../../database/gps-position.entity";

export class GpsSessionDto {
  sessionId!: string;
  startTime!: number;
  endTime!: number;
  durationMinutes!: number;
  distanceKm!: number;
  points!: GpsPosition[];
}
