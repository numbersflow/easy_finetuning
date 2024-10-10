import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"

interface PerformanceMonitoringProps {
  disabled: boolean;
}

export function PerformanceMonitoring({ disabled }: PerformanceMonitoringProps) {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>Performance Monitoring</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>GPU Usage: {disabled ? 'N/A' : '65%'}</span>
            <span>Memory Usage: {disabled ? 'N/A' : '8.2 GB / 16 GB'}</span>
          </div>
          <Progress value={disabled ? 0 : 65} className="h-2 bg-gray-200" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Inference Time:</p>
            <p>{disabled ? 'N/A' : '0.25s'}</p>
          </div>
          <div>
            <p className="font-semibold">Tokens per Second:</p>
            <p>{disabled ? 'N/A' : '32'}</p>
          </div>
          <div>
            <p className="font-semibold">Total Params:</p>
            <p>{disabled ? 'N/A' : '124M'}</p>
          </div>
          <div>
            <p className="font-semibold">Model Size:</p>
            <p>{disabled ? 'N/A' : '496 MB'}</p>
          </div>
          <div>
            <p className="font-semibold">VRAM Usage:</p>
            <p>{disabled ? 'N/A' : '5.8 GB'}</p>
          </div>
          <div>
            <p className="font-semibold">CPU Usage:</p>
            <p>{disabled ? 'N/A' : '25%'}</p>
          </div>
          <div>
            <p className="font-semibold">Batch Size:</p>
            <p>{disabled ? 'N/A' : '32'}</p>
          </div>
          <div>
            <p className="font-semibold">Throughput:</p>
            <p>{disabled ? 'N/A' : '256 samples/sec'}</p>
          </div>
          <div>
            <p className="font-semibold">Power Consumption:</p>
            <p>{disabled ? 'N/A' : '150W'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}