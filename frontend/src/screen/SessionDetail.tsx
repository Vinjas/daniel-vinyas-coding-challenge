import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../services/use-fetch'
import { Map } from '../components/Map'
import { GpsSession } from '../services/gps-session'
import { SessionDetailsPanel } from '../components/SessionDetailsPanel'
import { Button } from '../components/Button'

export function SessionDetail() {
  const { sessionId } = useParams()

  const navigate = useNavigate()

  const { data, error, loading } = useFetch<GpsSession>(
    `gps-position/${sessionId}`,
  )

  const handleOnClick = () => {
    navigate('/')
  }

  if (error) return <div>Error: {error.toString()}</div>
  if (!data) return <div>Loading session {sessionId}...</div>

  return (
    <div className="session-detail-wrapper">
      <h1 className="session-detail-header">Session {sessionId}</h1>

      {Boolean(error) && <div>Error: {(error as Error).message}</div>}

      {loading && <div>Loading session...</div>}

      {Boolean(data) && (
        <>
          <Map gpsPositions={data.points} sessionId={sessionId!} />

          <br />

          <SessionDetailsPanel session={data} />

          <br />

          <Button onClick={handleOnClick}>← Back to all sessions</Button>
        </>
      )}
    </div>
  )
}
