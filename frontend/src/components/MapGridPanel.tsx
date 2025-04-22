import { Map } from './Map'
import React from 'react'
import { GpsSessionPositions } from '../services/gps-session'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

type MapGridPanelProps = {
  sessionId: string
  positions: GpsSessionPositions[]
}

export function MapGridPanel(props: MapGridPanelProps) {
  const { sessionId, positions } = props

  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`/session/${sessionId}`)
  }

  return (
    <div className="map-item">
      <div className="map-item-header">
        <h3>Session {sessionId}</h3>
        <Button onClick={handleOnClick}>Details</Button>
      </div>

      <Map gpsPositions={positions} sessionId={sessionId} />
    </div>
  )
}
