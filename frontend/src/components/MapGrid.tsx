import React from 'react'
import { GpsSessionPositions } from '../services/gps-session'
import { MapGridPanel } from './MapGridPanel'

type Props = {
  groupedData: Record<string, GpsSessionPositions[]>
}

const MapGrid: React.FC<Props> = ({ groupedData }) => {
  return (
    <div className="map-grid">
      {Object.entries(groupedData).map(([sessionId, positions]) => (
        <MapGridPanel
          sessionId={sessionId}
          positions={positions}
          key={sessionId}
        />
      ))}
    </div>
  )
}

export default MapGrid
