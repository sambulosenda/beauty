'use client'

import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { useState, useEffect } from 'react'

interface MapProps {
  address: string
}

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"]

export default function Map({ address }: MapProps) {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries
  })

  useEffect(() => {
    async function geocodeAddress() {
      if (!isLoaded || !address) return

      // Log the API key (first few characters)
      console.log('API Key available:', !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
      console.log('API Key prefix:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.substring(0, 5) + '...')

      try {
        console.log('Attempting to geocode:', address)
        const geocoder = new google.maps.Geocoder()
        
        const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            console.log('Geocoding status:', status)
            if (status === 'OK' && results) {
              resolve(results)
            } else {
              reject(new Error(`Geocoding failed: ${status}`))
            }
          })
        })

        if (!results?.[0]?.geometry?.location) {
          throw new Error('No location found for this address')
        }

        const location = results[0].geometry.location
        const newCoordinates = {
          lat: location.lat(),
          lng: location.lng()
        }
        
        console.log('Successfully geocoded:', newCoordinates)
        setCoordinates(newCoordinates)
        setError(null)
      } catch (err) {
        console.error('Detailed geocoding error:', err)
        setError(err instanceof Error ? err.message : 'Failed to geocode address')
        setCoordinates(null)
      }
    }

    geocodeAddress()
  }, [isLoaded, address])

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl flex flex-col items-center justify-center">
        <span className="text-gray-400 mb-2">Loading Google Maps...</span>
        <span className="text-gray-400 text-sm">Please wait</span>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="w-full h-full bg-red-50 rounded-xl flex flex-col items-center justify-center p-4 text-center">
        <span className="text-red-500 mb-2">Failed to load Google Maps</span>
        <span className="text-red-400 text-sm">{loadError.message}</span>
        <span className="text-red-400 text-xs mt-2">Please check your API key configuration</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full bg-yellow-50 rounded-xl flex flex-col items-center justify-center p-4 text-center">
        <span className="text-yellow-600 mb-2">Unable to show location</span>
        <span className="text-yellow-500 text-sm">{error}</span>
        <span className="text-yellow-500 text-xs mt-2">Address: {address}</span>
      </div>
    )
  }

  if (!coordinates) {
    return (
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl flex flex-col items-center justify-center">
        <span className="text-gray-400 mb-2">Finding location...</span>
        <span className="text-gray-400 text-sm">{address}</span>
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%',
        borderRadius: '0.75rem'
      }}
      center={coordinates}
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
      <Marker position={coordinates} title={address} />
    </GoogleMap>
  )
} 
