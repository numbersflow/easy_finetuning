import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ModelSelector, Model } from '../ui/ModelSelector'

interface ModelPerformance extends Model {
  inferenceTime: number;
  tokensPerSecond: number;
  totalParams: number;
  modelSize: number;
  vramUsage: number;
  cpuUsage: number;
  batchSize: number;
  throughput: number;
  powerConsumption: number;
}

const availableModels: ModelPerformance[] = [
  { id: '1', name: 'v1.0.3', inferenceTime: 0.25, tokensPerSecond: 32, totalParams: 124, modelSize: 496, vramUsage: 5.8, cpuUsage: 25, batchSize: 32, throughput: 256, powerConsumption: 150 },
  { id: '2', name: 'v1.0.2', inferenceTime: 0.28, tokensPerSecond: 30, totalParams: 120, modelSize: 480, vramUsage: 5.5, cpuUsage: 23, batchSize: 32, throughput: 240, powerConsumption: 145 },
  { id: '3', name: 'v1.0.1', inferenceTime: 0.30, tokensPerSecond: 28, totalParams: 118, modelSize: 472, vramUsage: 5.3, cpuUsage: 22, batchSize: 32, throughput: 224, powerConsumption: 140 },
  { id: '4', name: 'v1.0.0', inferenceTime: 0.32, tokensPerSecond: 26, totalParams: 115, modelSize: 460, vramUsage: 5.0, cpuUsage: 20, batchSize: 32, throughput: 208, powerConsumption: 135 },
  { id: '5', name: 'v0.9.9', inferenceTime: 0.35, tokensPerSecond: 24, totalParams: 110, modelSize: 440, vramUsage: 4.8, cpuUsage: 19, batchSize: 32, throughput: 192, powerConsumption: 130 },
]

const metrics = [
  { key: 'inferenceTime', label: 'Inference Time (s)' },
  { key: 'tokensPerSecond', label: 'Tokens per Second' },
  { key: 'totalParams', label: 'Total Params (M)' },
  { key: 'modelSize', label: 'Model Size (MB)' },
  { key: 'vramUsage', label: 'VRAM Usage (GB)' },
  { key: 'cpuUsage', label: 'CPU Usage (%)' },
  { key: 'batchSize', label: 'Batch Size' },
  { key: 'throughput', label: 'Throughput (samples/sec)' },
  { key: 'powerConsumption', label: 'Power Consumption (W)' },
]

export function ModelPerformanceComparison() {
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([])
  const [selectedMetric, setSelectedMetric] = useState<string>('inferenceTime')

  const handleModelSelectionChange = (selectedIds: string[]) => {
    setSelectedModelIds(selectedIds)
  }

  const filteredData = availableModels.filter(model => selectedModelIds.includes(model.id))

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>AI Model Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ModelSelector
          models={availableModels}
          selectedModels={selectedModelIds}
          onSelectionChange={handleModelSelectionChange}
          title="Select Models to Compare"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Metric to Compare</h3>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a metric" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem key={metric.key} value={metric.key}>
                  {metric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedModelIds.length > 0 ? (
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={selectedMetric} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p>Please select at least one model for comparison.</p>
        )}
      </CardContent>
    </Card>
  )
}