import React, { useState, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { trainingData } from './dashboardData'

export const TrainingProgress: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(trainingData.length - 1)
  const chartRef = useRef<HTMLDivElement>(null)

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault()
    const zoomIntensity = 0.1
    const zoomDirection = event.deltaY > 0 ? 1 : -1
    const dataLength = trainingData.length
    const currentRange = endIndex - startIndex
    const zoomAmount = Math.max(1, Math.round(currentRange * zoomIntensity))

    let newStartIndex = Math.max(0, startIndex + zoomDirection * zoomAmount)
    let newEndIndex = Math.min(dataLength - 1, endIndex - zoomDirection * zoomAmount)

    if (newEndIndex - newStartIndex < 2) {
      newStartIndex = Math.max(0, Math.round((newStartIndex + newEndIndex) / 2) - 1)
      newEndIndex = Math.min(dataLength - 1, newStartIndex + 2)
    }

    setStartIndex(newStartIndex)
    setEndIndex(newEndIndex)
  }, [startIndex, endIndex])

  React.useEffect(() => {
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

  const visibleData = trainingData.slice(startIndex, endIndex + 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Progress</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] relative">
        <div className="absolute top-2 right-2 text-xs text-gray-500">
          Use mouse wheel to zoom
        </div>
        <div ref={chartRef} className="absolute inset-0 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visibleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="loss" stroke="#8884d8" name="Loss" />
              <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#82ca9d" name="Accuracy" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}