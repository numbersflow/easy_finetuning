import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

const modelComparisonData = [
  { model: 'v1.0.3', accuracy: 0.85, loss: 0.15, perplexity: 1.2 },
  { model: 'v1.0.2', accuracy: 0.82, loss: 0.18, perplexity: 1.3 },
  { model: 'v1.0.1', accuracy: 0.79, loss: 0.21, perplexity: 1.4 },
  { model: 'v1.0.0', accuracy: 0.75, loss: 0.25, perplexity: 1.5 },
  { model: 'v0.9.9', accuracy: 0.72, loss: 0.28, perplexity: 1.6 },
  { model: 'v0.9.8', accuracy: 0.70, loss: 0.30, perplexity: 1.7 },
  { model: 'v0.9.7', accuracy: 0.68, loss: 0.32, perplexity: 1.8 },
  { model: 'v0.9.6', accuracy: 0.65, loss: 0.35, perplexity: 1.9 },
  { model: 'v0.9.5', accuracy: 0.63, loss: 0.37, perplexity: 2.0 },
  { model: 'v0.9.4', accuracy: 0.60, loss: 0.40, perplexity: 2.1 },
]

const metrics = ['accuracy', 'loss', 'perplexity']
const colors = ['#8884d8', '#82ca9d', '#ffc658']

export default function ModelComparison() {
  const [selectedModels, setSelectedModels] = useState<string[]>(modelComparisonData.slice(0, 5).map(d => d.model))
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['accuracy'])
  const [zoomDomain, setZoomDomain] = useState<{ x: [number, number], y: [number, number] }>({ x: [0, 1], y: [0, 1] })
  const chartRef = useRef<HTMLDivElement>(null)

  const handleModelToggle = (model: string) => {
    setSelectedModels(prev => 
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    )
  }

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric]
    )
  }

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault()
    const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9
    setZoomDomain(prev => ({
      x: [prev.x[0] * zoomFactor, Math.min(1, prev.x[1] / zoomFactor)],
      y: [prev.y[0] * zoomFactor, Math.min(1, prev.y[1] / zoomFactor)]
    }))
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

  const filteredData = modelComparisonData.filter(d => selectedModels.includes(d.model))

  const renderModelCheckboxList = () => {
    return (
      <div className="space-y-2 h-[150px] overflow-y-auto pr-2">
        {modelComparisonData.map((model, index) => (
          <div key={model.model} className="flex items-center space-x-2">
            <Checkbox 
              id={`model-${index}`} 
              checked={selectedModels.includes(model.model)}
              onCheckedChange={() => handleModelToggle(model.model)}
            />
            <Label htmlFor={`model-${index}`}>{model.model}</Label>
          </div>
        ))}
      </div>
    )
  }

  const renderMetricCheckboxList = () => {
    return (
      <div className="space-y-2">
        {metrics.map((metric, index) => (
          <div key={metric} className="flex items-center space-x-2">
            <Checkbox 
              id={`metric-${index}`} 
              checked={selectedMetrics.includes(metric)}
              onCheckedChange={() => handleMetricToggle(metric)}
            />
            <Label htmlFor={`metric-${index}`}>{metric}</Label>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Model Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <div className="w-1/4">
            <h3 className="font-semibold mb-2">Select Models to Compare</h3>
            {renderModelCheckboxList()}
            <h3 className="font-semibold mb-2 mt-4">Select Performance Metrics</h3>
            {renderMetricCheckboxList()}
          </div>
          <div className="w-3/4" ref={chartRef}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" />
                <YAxis domain={[zoomDomain.y[0], zoomDomain.y[1]]} />
                <Tooltip />
                <Legend />
                {selectedMetrics.map((metric, index) => (
                  <Bar key={metric} dataKey={metric} fill={colors[index % colors.length]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}