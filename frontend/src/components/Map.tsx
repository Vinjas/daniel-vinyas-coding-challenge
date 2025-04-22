import React, { useCallback } from 'react'
import { Map as Mapgl, Source, Layer } from 'react-map-gl'
import { GpsSessionPositions } from '../services/gps-session'
import {
  defaultInitialViewState,
  MAP_ACCESS_TOKEN,
  MAP_STYLE,
} from '../constants'
import { convertToGeoJSON } from '../util/convertToGeoJSON'

type MapProps = {
  gpsPositions: GpsSessionPositions[]
  sessionId: string
}

export function Map({ gpsPositions, sessionId }: MapProps) {
  const getBounds = useCallback((): [[number, number], [number, number]] => {
    const lons = gpsPositions.map((p) => p.longitude)
    const lats = gpsPositions.map((p) => p.latitude)
    const minLon = Math.min(...lons)
    const maxLon = Math.max(...lons)
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    return [
      [minLon, minLat],
      [maxLon, maxLat],
    ]
  }, [gpsPositions])

  const handleMapLoad = useCallback(
    (event: mapboxgl.MapboxEvent) => {
      const map = event.target
      if (gpsPositions.length > 0) {
        const bounds = getBounds()
        map.fitBounds(bounds, { padding: 60, duration: 1000 })
      }
    },
    [getBounds, gpsPositions],
  )

  return (
    <Mapgl
      initialViewState={defaultInitialViewState}
      style={{ width: '100%', height: 300 }}
      mapStyle={MAP_STYLE}
      mapboxAccessToken={MAP_ACCESS_TOKEN}
      onLoad={handleMapLoad}
    >
      <Source
        id={`session-${sessionId}`}
        type="geojson"
        data={convertToGeoJSON(gpsPositions)}
      >
        {/* Shadow Layer */}
        <Layer
          id={`route-shadow-${sessionId}`}
          type="line"
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': '#ff0000',
            'line-width': 4,
            'line-opacity': 0.6,
          }}
        />
      </Source>
    </Mapgl>
  )
}
