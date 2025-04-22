import { GpsSession } from '../services/gps-session'
import React from 'react'

type SessionDetailsPanelProps = {
  session: GpsSession
}

export function SessionDetailsPanel(props: SessionDetailsPanelProps) {
  const { session } = props

  return (
    <div className="sessions-details-panel-wrapper">
      <p>
        <strong>Start:</strong> {new Date(session.startTime).toLocaleString()}
      </p>
      <p>
        <strong>End:</strong> {new Date(session.endTime).toLocaleString()}
      </p>
      <p>
        <strong>Duration:</strong> {session.durationMinutes} minutes
      </p>
      <p>
        <strong>Total distance:</strong> {session.distanceKm} kilometers
      </p>
    </div>
  )
}
