// app/dashboard/availability/availability-form.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

const DAYS: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

interface TimeSlot {
  enabled: boolean
  start: string
  end: string
}

type AvailabilityState = Record<Day, TimeSlot>

const HOURS = Array.from({ length: 24 }, (_, i) => 
  i.toString().padStart(2, '0') + ':00'
)

const defaultAvailability = Object.fromEntries(
  DAYS.map(day => [
    day,
    {
      enabled: false,
      start: '09:00',
      end: '17:00'
    }
  ])
) as AvailabilityState

export default function AvailabilityForm({ providerId }: { providerId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [availability, setAvailability] = useState<AvailabilityState>(defaultAvailability)
  const { toast } = useToast()

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch('/api/availability')
        if (!response.ok) throw new Error('Failed to fetch availability')
        
        const data = await response.json()
        
        if (data.length > 0) {
          const formattedData = Object.fromEntries(
            DAYS.map(day => {
              const dayData = data.find((item: any) => item.dayOfWeek === day)
              return [
                day,
                dayData ? {
                  enabled: dayData.enabled,
                  start: dayData.startTime,
                  end: dayData.endTime
                } : defaultAvailability[day]
              ]
            })
          ) as AvailabilityState
          
          setAvailability(formattedData)
        }
      } catch (error) {
        console.error('Error fetching availability:', error)
        toast({
          title: 'Error',
          description: 'Failed to load availability settings',
          variant: 'destructive'
        })
      }
    }

    fetchAvailability()
  }, [])

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          availability
        }),
      })

      if (!response.ok) throw new Error('Failed to update availability')
      
      toast({
        title: 'Success',
        description: 'Availability settings updated',
      })
    } catch (error) {
      console.error('Error updating availability:', error)
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
              <CardTitle className="flex items-center space-x-2">
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
              </CardTitle>
              <CardDescription>Set your working hours for {day}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor={`${day}-start`}>Start Time</Label>
                  <Select
                    disabled={!availability[day].enabled}
                    value={availability[day].start}
                    onValueChange={(value) =>
                      setAvailability({
                        ...availability,
                        [day]: {
                          ...availability[day],
                          start: value
                        }
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor={`${day}-end`}>End Time</Label>
                  <Select
                    disabled={!availability[day].enabled}
                    value={availability[day].end}
                    onValueChange={(value) =>
                      setAvailability({
                        ...availability,
                        [day]: {
                          ...availability[day],
                          end: value
                        }
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button type="submit" disabled={isLoading} className="mt-6">
        {isLoading ? 'Saving...' : 'Save Availability'}
      </Button>
    </form>
  )
}