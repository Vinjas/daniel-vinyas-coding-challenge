export const API_BASE_URL = 'http://localhost:3000/api' // Base URL of your backend API
export const MAP_ACCESS_TOKEN =
  'pk.eyJ1IjoiYnVjaGVyY29ubmVjdCIsImEiOiJjbTIzY3pxMjcwNTIyMnFzNnZncDB2emQ5In0.TFvwR0HJTf5yhrlzDZw9IA' as const
export const MAP_STYLE = 'mapbox://styles/mapbox/light-v11' // Default Mapbox style URL

export const defaultInitialViewState = {
  longitude: 13.404954,
  latitude: 52.520008,
  zoom: 11,
}
