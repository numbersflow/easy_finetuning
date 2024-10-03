import React, { useState, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { trainingData, modelComparisonData } from './dashboardData'

const generateColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

export const TrainingProgress: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(trainingData.length - 1)
  const [selectedModels, setSelectedModels] = useState<string[]>([])
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
  const visibleComparisonData = modelComparisonData.slice(startIndex, endIndex + 1)

  const combinedData = visibleData.map((item, index) => {
    const comparisonItem = visibleComparisonData[index]
    const additionalData = selectedModels.reduce((acc, model) => {
      if (comparisonItem) {
        acc[`${model}_loss`] = comparisonItem[`${model}_loss`]
        acc[`${model}_eval_loss`] = comparisonItem[`${model}_eval_loss`]
      }
      return acc
    }, {} as Record<string, number>)
    return { ...item, ...additionalData }
  })

  const handleModelToggle = (model: string) => {
    setSelectedModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:pr-4">
          <h3 className="text-lg font-semibold mb-2">Compare Models</h3>
          {Object.keys(modelComparisonData[0])
            .filter(key => key !== 'epoch')
            .map(key => key.split('_')[0])
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((model) => (
            <div key={model} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`model-${model}`}
                checked={selectedModels.includes(model)}
                onCheckedChange={() => handleModelToggle(model)}
              />
              <Label
                htmlFor={`model-${model}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Model {model.toUpperCase()}
              </Label>
            </div>
          ))}
        </div>
        <div className="w-full md:w-3/4 h-[300px] relative">
          <div className="absolute top-2 right-2 text-xs text-gray-500">
            Use mouse wheel to zoom
          </div>
          <div ref={chartRef} className="absolute inset-0 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="loss" stroke="#8884d8" name="Current Loss" />
                <Line type="monotone" dataKey="eval_loss" stroke="#82ca9d" name="Current Eval Loss" />
                {selectedModels.flatMap((model) => [
                  <Line
                    key={`${model}_loss`}
                    type="monotone"
                    dataKey={`${model}_loss`}
                    stroke={generateColor(`${model}_loss`)}
                    name={`${model.toUpperCase()} Loss`}
                  />,
                  <Line
                    key={`${model}_eval_loss`}
                    type="monotone"
                    dataKey={`${model}_eval_loss`}
                    stroke={generateColor(`${model}_eval_loss`)}
                    name={`${model.toUpperCase()} Eval Loss`}
                  />
                ])}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
