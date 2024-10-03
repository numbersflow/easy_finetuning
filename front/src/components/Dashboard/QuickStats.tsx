import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export const QuickStats: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total Training Time: 5h 23m</p>
        <p>Estimated Time Remaining: 2h 30m</p>
        <p>Best Perplexity: 15.23</p>
        <p>Last Checkpoint: 30 min ago</p>
      </CardContent>
    </Card>
  )
}