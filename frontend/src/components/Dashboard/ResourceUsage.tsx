import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export const ResourceUsage: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Resource Usage</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="space-y-4 flex-grow">
          <div>
            <div className="flex justify-between mb-1">
              <span>GPU: 80%</span>
              <span>28.2 GB / 32 GB</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Memory: 88%</span>
              <span>28.2 GB / 32 GB</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>CPU: 45%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}