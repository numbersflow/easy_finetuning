import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CircleIcon, CpuIcon, MemoryStickIcon } from 'lucide-react'

export const GPUInfo: React.FC = () => {
  // In a real application, you would fetch this data from your server
  const gpuInfo = {
    model: "NVIDIA A100",
    totalMemory: "80 GB",
    usedMemory: "32 GB",
    temperature: "65°C",
    utilizationRate: "75%"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CpuIcon className="h-6 w-6" />
          <span>GPU Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="flex items-center">
            <CircleIcon className="h-4 w-4 mr-2 text-green-500" />
            <span className="font-semibold">Model:</span> {gpuInfo.model}
          </p>
          <p className="flex items-center">
            <MemoryStickIcon className="h-4 w-4 mr-2" />
            <span className="font-semibold">Total Memory:</span> {gpuInfo.totalMemory}
          </p>
          <p className="flex items-center">
            <MemoryStickIcon className="h-4 w-4 mr-2" />
            <span className="font-semibold">Used Memory:</span> {gpuInfo.usedMemory}
          </p>
          <p className="flex items-center">
            <CircleIcon className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="font-semibold">Temperature:</span> {gpuInfo.temperature}
          </p>
          <p className="flex items-center">
            <CircleIcon className="h-4 w-4 mr-2 text-blue-500" />
            <span className="font-semibold">Utilization Rate:</span> {gpuInfo.utilizationRate}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}