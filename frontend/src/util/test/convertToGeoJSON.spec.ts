import { GpsSessionPositions } from '../../services/gps-session'
import { convertToGeoJSON } from '../convertToGeoJSON'

describe('convertToGeoJSON', () => {
  const samplePositions: GpsSessionPositions[] = [
    {
      id: 1,
      latitude: 52.52,
      longitude: 13.405,
      timestamp: 1728556800000,
      sessionId: '1',
    },
    {
      id: 2,
      latitude: 52.5205,
      longitude: 13.406,
      timestamp: 1728557100000,
      sessionId: '1',
    },
  ]

  it('should convert GPS positions to GeoJSON LineString format', () => {
    const result = convertToGeoJSON(samplePositions)

    expect(result).toEqual({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [13.405, 52.52],
              [13.406, 52.5205],
            ],
          },
          properties: {},
        },
      ],
    })
  })

  it('should return an empty LineString for empty input', () => {
    const result = convertToGeoJSON([])

    expect(result).toEqual({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [],
          },
          properties: {},
        },
      ],
    })
  })
})
