'use client'

import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'

interface MapProps {
  address: string
  lat: number
  lng: number
}

export default function Map({ lat, lng }: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <span className="text-gray-400">Loading map...</span>
      </div>
    )
  }

  const center = {
    lat: lat || 51.5074,
    lng: lng || -0.1278
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%',
        borderRadius: '0.75rem'
      }}
      center={center}
      zoom={15}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  )
} 
