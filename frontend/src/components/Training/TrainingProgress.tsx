import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CustomLoadingBar } from '../ui/CustomLoadingBar'

interface TrainingProgressProps {
  trainingProgress: number
}

export function TrainingProgress({ trainingProgress }: TrainingProgressProps) {
  const trainingLossData = [
    { name: '1', value: 0.5 },
    { name: '2', value: 0.7 },
    { name: '3', value: 0.6 },
    { name: '4', value: 0.65 },
    { name: '5', value: 0.9 },
  ]

  const gpuUtilizationData = [
    { name: '1', value: 20 },
    { name: '2', value: 50 },
    { name: '3', value: 40 },
    { name: '4', value: 70 },
    { name: '5', value: 90 },
  ]

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Training Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium text-gray-700">Progress:</Label>
          <span className="text-lg font-semibold text-blue-600">{trainingProgress}%</span>
        </div>
        <CustomLoadingBar progress={trainingProgress} />

        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Training Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trainingLossData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#718096" />
                  <YAxis stroke="#718096" />
                  <Tooltip contentStyle={{ backgroundColor: '#f7fafc', border: '1px solid #e2e8f0' }} />
                  <Line type="monotone" dataKey="value" stroke="#4299e1" strokeWidth={2} dot={{ fill: '#4299e1', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">GPU Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={gpuUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#718096" />
                  <YAxis stroke="#718096" />
                  <Tooltip contentStyle={{ backgroundColor: '#f7fafc', border: '1px solid #e2e8f0' }} />
                  <Line type="monotone" dataKey="value" stroke="#48bb78" strokeWidth={2} dot={{ fill: '#48bb78', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}