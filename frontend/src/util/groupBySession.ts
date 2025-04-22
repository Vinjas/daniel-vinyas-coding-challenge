import { GpsSessionPositions } from '../services/gps-session'

export function groupBySession(
  gpsData: GpsSessionPositions[],
): Record<string, GpsSessionPositions[]> {
  return gpsData.reduce(
    (acc, position) => {
      const session = position.sessionId

      if (!acc[session]) acc[session] = []

      acc[session].push(position)

      return acc
    },
    {} as Record<string, GpsSessionPositions[]>,
  )
}
