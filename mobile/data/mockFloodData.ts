// mobile/data/mockFloodData.ts
import { SensorReading, ChartDataPoint } from '@/types/flood'

export const MOCK_SENSORS: SensorReading[] = [
  {
    id: '1',
    street: 'Apple Street',
    area: 'Central, Taguig',
    waterLevelCm: 25,
    status: 'caution',
    rateOfRiseCmPerHr: 8,
    precipitationMmPerHr: 5.0,
    isCurrent: true,
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    street: 'Peach Street',
    area: 'Central, Taguig',
    waterLevelCm: 23,
    status: 'caution',
    rateOfRiseCmPerHr: 6,
    precipitationMmPerHr: 4.5,
    isCurrent: false,
    timestamp: new Date().toISOString(),
  },
  {
    id: '3',
    street: 'Lime Street',
    area: 'Central, Taguig',
    waterLevelCm: 30,
    status: 'danger',
    rateOfRiseCmPerHr: 10,
    precipitationMmPerHr: 6.0,
    isCurrent: false,
    timestamp: new Date().toISOString(),
  },
]

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { time: '12am', levelCm: 20 },
  { time: '2am',  levelCm: 25 },
  { time: '4am',  levelCm: 18 },
  { time: '6am',  levelCm: 28 },
  { time: '8am',  levelCm: 30 },
  { time: '10am', levelCm: 25 },
]