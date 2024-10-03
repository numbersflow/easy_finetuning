import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { epoch: 0, rate: 0.001 },
  { epoch: 1, rate: 0.002 },
  { epoch: 2, rate: 0.003 },
  { epoch: 3, rate: 0.0025 },
  { epoch: 4, rate: 0.002 },
  { epoch: 5, rate: 0.0015 },
  { epoch: 6, rate: 0.001 },
  { epoch: 7, rate: 0.0015 },
  { epoch: 8, rate: 0.002 },
  { epoch: 9, rate: 0.0025 },
]

export const LearningRateSchedule: React.FC = () => {
  const [zoomState, setZoomState] = useState({ scale: 1, offsetX: 0, offsetY: 0 })
  const chartRef = useRef<HTMLDivElement>(null)

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault()
    const { deltaY, clientX, clientY } = event
    const chart = chartRef.current
    if (!chart) return

    const { left, top, width, height } = chart.getBoundingClientRect()
    const x = (clientX - left) / width
    const y = (clientY - top) / height

    setZoomState(prev => {
      const newScale = deltaY > 0 ? prev.scale * 0.9 : prev.scale * 1.1
      const newOffsetX = x - (x - prev.offsetX) * (newScale / prev.scale)
      const newOffsetY = y - (y - prev.offsetY) * (newScale / prev.scale)
      return { scale: newScale, offsetX: newOffsetX, offsetY: newOffsetY }
    })
  }, [])

  useEffect(() => {
    const chartElement = chartRef.current
    if (chartElement) {
      chartElement.addEventListener('wheel', handleWheel, { passive: false })
    }
    return () => {
      if (chartElement) {
        chartElement.removeEventListener('wheel', handleWheel)
      }
    }
  }, [handleWheel])

  const xDomain = [
    Math.max(0, -zoomState.offsetX / zoomState.scale * 9),
    Math.min(9, (1 - zoomState.offsetX) / zoomState.scale * 9 + 9)
  ]

  const yDomain = [
    Math.max(0, (zoomState.offsetY - 1) / zoomState.scale * 0.003),
    Math.min(0.003, zoomState.offsetY / zoomState.scale * 0.003 + 0.003)
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Rate Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="epoch" 
                domain={xDomain as [number, number]}
                type="number"
                allowDataOverflow
              />
              <YAxis 
                domain={yDomain as [number, number]}
                type="number"
                allowDataOverflow
              />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}