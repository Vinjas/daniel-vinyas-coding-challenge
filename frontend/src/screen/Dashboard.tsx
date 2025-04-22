import React, { useMemo } from 'react'
import { useFetch } from '../services/use-fetch'
import MapGrid from '../components/MapGrid'
import { groupBySession } from '../util/groupBySession'
import { GpsSessionPositions } from '../services/gps-session'

export default function Dashboard() {
  const { data, error, loading } = useFetch('gps-position')

  const groupedData = useMemo(() => {
    if (!data) return

    return groupBySession(data as GpsSessionPositions[])
  }, [data])

  if (!groupedData) return

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-header">GPS Sessions</h1>
      <MapGrid groupedData={groupedData} />
    </div>
  )
}
