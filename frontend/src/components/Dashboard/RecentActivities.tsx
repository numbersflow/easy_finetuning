import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const activities = [
  { id: 1, description: "Checkpoint saved", time: "30 min ago" },
  { id: 2, description: "Learning rate adjusted", time: "1h ago" },
  { id: 3, description: "Dataset updated", time: "5h ago" },
  { id: 4, description: "Model evaluation completed", time: "1d ago" },
  { id: 5, description: "New training run started", time: "2d ago" },
  { id: 6, description: "Hyperparameters optimized", time: "3d ago" },
  { id: 7, description: "Data preprocessing completed", time: "4d ago" },
  { id: 8, description: "Model architecture updated", time: "5d ago" },
]

export const RecentActivities: React.FC = () => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 3
  const totalPages = Math.ceil(activities.length / itemsPerPage)

  const paginatedActivities = activities.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <Card className="h-[300px] flex flex-col">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <ul className="space-y-2">
          {paginatedActivities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center">
              <span>{activity.description}</span>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="flex justify-between items-center px-4 py-2 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}