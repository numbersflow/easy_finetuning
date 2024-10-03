import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Warning",
    description: "GPU memory usage above 90%",
    datetime: "2023-10-02 15:30:00"
  },
  {
    id: 2,
    type: "info",
    title: "Info",
    description: "New dataset version available",
    datetime: "2023-10-02 14:45:00"
  },
  {
    id: 3,
    type: "error",
    title: "Error",
    description: "Training process interrupted",
    datetime: "2023-10-02 13:15:00"
  }
]

export const Alerts: React.FC = () => {
  return (
    <Card className="h-[300px] flex flex-col">
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Alert key={alert.id} variant={alert.type as "default" | "destructive" | "warning" | "info"}>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>
                <div>{alert.description}</div>
                <div className="text-xs text-gray-500 mt-1">{alert.datetime}</div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}