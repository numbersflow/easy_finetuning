import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export const PerformanceMetrics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Perplexity</h3>
            <p className="text-3xl">15.23</p>
          </div>
          <div>
            <h3 className="font-semibold">BLEU Score</h3>
            <p className="text-3xl">32.5</p>
          </div>
          <div>
            <h3 className="font-semibold">Token Accuracy</h3>
            <p className="text-3xl">0.62</p>
          </div>
          <div>
            <h3 className="font-semibold">Response Time</h3>
            <p className="text-3xl">0.25s</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}