// mobile/hooks/useFloodData.ts
import { useEffect, useState } from 'react'
import { ref, onValue, off } from 'firebase/database'
import { db } from '@/config/firebase'

export type FloodStatus = 'safe' | 'caution' | 'danger' | 'critical'

export interface SensorReading {
  id: string
  street: string
  area: string
  waterLevelCm: number
  status: FloodStatus
  rateOfRiseCmPerHr: number
  precipitationMmPerHr: number
  isCurrent: boolean
  lastUpdated: string
}

export interface ChartDataPoint {
  time: string
  levelCm: number
}

export const THRESHOLD_CM = 35

export const STATUS_COLOR: Record<FloodStatus, string> = {
  safe:     '#639922',
  caution:  '#F5920A',
  danger:   '#E53E3E',
  critical: '#A32D2D',
}

export const STATUS_DESCRIPTION: Record<FloodStatus, string> = {
  safe:     'Water levels are normal. No immediate flood threat.',
  caution:  'Water level is approaching the caution threshold. Monitor the situation and stay updated.',
  danger:   'Dangerous water levels. Avoid flooded areas and prepare to evacuate.',
  critical: 'Life-threatening flood conditions. Evacuate immediately.',
}

export function getThresholdPercent(cm: number): number {
  return Math.min(Math.round((cm / THRESHOLD_CM) * 100), 100)
}

// Distance sensor measures FROM sensor DOWN to water surface
// So higher Distance_cm = lower water level
// Adjust MAX_SENSOR_DISTANCE to match your hardware setup
const MAX_SENSOR_DISTANCE = 850

function distanceToWaterLevel(distanceCm: number): number {
  const level = MAX_SENSOR_DISTANCE - distanceCm
  return Math.max(0, Math.round(level))
}

function getStatus(cm: number): FloodStatus {
  if (cm < 15) return 'safe'
  if (cm < 30) return 'caution'
  if (cm < 60) return 'danger'
  return 'critical'
}

export function useFloodData() {
  const [waterLevelCm, setWaterLevelCm] = useState<number>(0)
  const [rainValue, setRainValue] = useState<number>(0)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sensorRef = ref(db, 'Sensordata1')

    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) {
        setError('No sensor data found.')
        setIsLoading(false)
        return
      }

      const level = distanceToWaterLevel(data.Distance_cm)
      setWaterLevelCm(level)
      setRainValue(data.Rain_Value ?? 0)
      setLastUpdated(data.Last_Updated ?? '')
      setIsLoading(false)
    }, (err) => {
      setError('Failed to load sensor data.')
      setIsLoading(false)
    })

    return () => off(sensorRef)
  }, [])

  const status = getStatus(waterLevelCm)

  const currentSensor: SensorReading = {
    id: 'Sensordata1',
    street: 'Apple Street',       // hardcode for now — not in Firebase yet
    area: 'Central, Taguig',      // hardcode for now — not in Firebase yet
    waterLevelCm,
    status,
    rateOfRiseCmPerHr: 0,         // not in Firebase yet
    precipitationMmPerHr: rainValue,
    isCurrent: true,
    lastUpdated,
  }

  return {
    currentSensor,
    nearbySensors: [] as SensorReading[],  // only 1 sensor for now
    chartData: [] as ChartDataPoint[],      // no chart history in Firebase yet
    isLoading,
    error,
  }
}