'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from "@/hooks/use-toast"

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => 
  `${i.toString().padStart(2, '0')}:00`
)

interface AvailabilityState {
  [key: string]: {
    enabled: boolean
    startTime: string
    endTime: string
  }
}

export default function AvailabilityForm({ providerId }: { providerId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [availability, setAvailability] = useState<AvailabilityState>(() => {
    const initial: AvailabilityState = {}
    DAYS.forEach(day => {
      initial[day] = {
        enabled: false,
        startTime: '09:00',
        endTime: '17:00'
      }
    })
    return initial
  })

  // Load existing settings
  useEffect(() => {
    async function loadAvailability() {
      try {
        console.log('Loading availability for provider:', providerId)
        const response = await fetch(`/api/availability/${providerId}`)
        const data = await response.json()
        console.log('Loaded availability:', data)
        
        if (Array.isArray(data) && data.length > 0) {
          const newAvailability: AvailabilityState = { ...availability }
          
          data.forEach((setting) => {
            newAvailability[setting.dayOfWeek] = {
              enabled: true,
              startTime: setting.startTime,
              endTime: setting.endTime
            }
          })
          
          setAvailability(newAvailability)
          console.log('Updated form state:', newAvailability)
        }
      } catch (error) {
        console.error('Error loading availability:', error)
        toast({
          title: 'Error',
          description: 'Failed to load availability settings',
          variant: 'destructive'
        })
      }
    }

    loadAvailability()
  }, [providerId])

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      console.log('Saving availability:', availability)
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId,
          availabilityData: Object.entries(availability)
            .filter(([_, value]) => value.enabled)
            .map(([day, value]) => ({
              dayOfWeek: day,
              startTime: value.startTime,
              endTime: value.endTime,
              isAvailable: true
            }))
        })
      })

      if (!response.ok) throw new Error('Failed to update availability')
      
      const savedData = await response.json()
      console.log('Saved successfully:', savedData)
      
      toast({
        title: 'Success',
        description: 'Availability settings updated',
      })
    } catch (error) {
      console.error('Error saving availability:', error)
      toast({
        title: 'Error',
        description: 'Failed to update availability settings',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }}>
      <div className="space-y-4">
        {DAYS.map((day) => (
          <Card key={day}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${day}-enabled`}
                  checked={availability[day].enabled}
                  onCheckedChange={(checked) =>
                    setAvailability({
                      ...availability,
                      [day]: {
                        ...availability[day],
                        enabled: checked as boolean
                      }
                    })
                  }
                />
                <Label htmlFor={`${day}-enabled`}>{day}</Label>
              </div>
              {availability[day].enabled && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Start Time</Label>
                    <Select
                      value={availability[day].startTime}
                      onValueChange={(value) =>
                        setAvailability({
                          ...availability,
                          [day]: {
                            ...availability[day],
                            startTime: value
                          }
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Select
                      value={availability[day].endTime}
                      onValueChange={(value) =>
                        setAvailability({
                          ...availability,
                          [day]: {
                            ...availability[day],
                            endTime: value
                          }
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
      <Button className="mt-4" type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Availability'}
      </Button>
    </form>
  )
}
