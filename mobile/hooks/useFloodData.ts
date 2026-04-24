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

// ── Derives status from raw cm — adjust thresholds to match your device
function getStatus(cm: number): FloodStatus {
  if (cm < 15) return 'safe'
  if (cm < 30) return 'caution'
  if (cm < 60) return 'danger'
  return 'critical'
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

// ── Main hook
export function useFloodData(currentSensorId = 'sensor_1') {
  const [sensors, setSensors] = useState<SensorReading[]>([])
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sensorsRef = ref(db, 'sensors')
    const chartRef = ref(db, `chartHistory/${currentSensorId}`)

    // Live listener — updates instantly when device writes new data
    onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) return

      const parsed: SensorReading[] = Object.entries(data).map(([id, raw]: any) => ({
        id,
        street: raw.street,
        area: raw.area,
        waterLevelCm: raw.waterLevelCm,
        status: getStatus(raw.waterLevelCm), // auto-derived — no need for device to send status
        rateOfRiseCmPerHr: raw.rateOfRiseCmPerHr,
        precipitationMmPerHr: raw.precipitationMmPerHr,
        isCurrent: raw.isCurrent ?? false,
        lastUpdated: raw.lastUpdated,
      }))

      setSensors(parsed)
      setIsLoading(false)
    }, (err) => {
      setError('Failed to load sensor data.')
      setIsLoading(false)
    })

    onValue(chartRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) return
      const parsed: ChartDataPoint[] = Object.values(data) as ChartDataPoint[]
      setChartData(parsed)
    })

    // Cleanup listeners on unmount
    return () => {
      off(sensorsRef)
      off(chartRef)
    }
  }, [currentSensorId])

  return {
    sensors,
    currentSensor: sensors.find(s => s.isCurrent) ?? null,
    nearbySensors: sensors.filter(s => !s.isCurrent),
    chartData,
    isLoading,
    error,
  }
}