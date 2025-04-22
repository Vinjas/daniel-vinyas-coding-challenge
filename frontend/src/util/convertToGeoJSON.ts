// Function to convert latitude/longitude arrays into GeoJSON
import { GpsSessionPositions } from '../services/gps-session'

export const convertToGeoJSON = (positions: GpsSessionPositions[]) => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: positions.map((pos) => [pos.longitude, pos.latitude]),
        },
        properties: {},
      },
    ],
  } as never
}
