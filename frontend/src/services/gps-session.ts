export class GpsSession {
  sessionId!: string
  startTime!: number
  endTime!: number
  durationMinutes!: number
  distanceKm!: number
  points!: GpsSessionPositions[]
}

export interface GpsSessionPositions {
  id: number
  latitude: number
  longitude: number
  sessionId: string
  timestamp: number
}
