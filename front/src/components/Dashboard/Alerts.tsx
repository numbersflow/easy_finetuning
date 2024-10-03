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

const alertStyles = {
  info: "bg-green-100 border-green-300 text-green-800",
  warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
  error: "bg-red-100 border-red-300 text-red-800",
  default: "bg-gray-100 border-gray-300 text-gray-800"
}

export const Alerts: React.FC = () => {
  return (
    <Card className="h-[300px] flex flex-col">
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Alert 
              key={alert.id} 
              variant="default"
              className={`${alertStyles[alert.type as keyof typeof alertStyles] || alertStyles.default} border`}
            >
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