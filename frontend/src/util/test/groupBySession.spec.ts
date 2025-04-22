import { GpsSessionPositions } from '../../services/gps-session'
import { groupBySession } from '../groupBySession'

describe('groupBySession', () => {
  const mockData: GpsSessionPositions[] = [
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
      sessionId: '2',
    },
    {
      id: 3,
      latitude: 52.521,
      longitude: 13.407,
      timestamp: 1728557200000,
      sessionId: '1',
    },
  ]

  it('should group GPS positions by sessionId', () => {
    const result = groupBySession(mockData)

    expect(Object.keys(result)).toEqual(['1', '2'])
    expect(result['1']).toHaveLength(2)
    expect(result['2']).toHaveLength(1)
  })

  it('should return an empty object if input is empty', () => {
    const result = groupBySession([])
    expect(result).toEqual({})
  })
})
