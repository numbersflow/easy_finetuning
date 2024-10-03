import React from 'react'
import { Card, CardContent } from "../ui/card"

interface CurrentTrainingProps {
  isTraining: boolean
}

export const CurrentTraining: React.FC<CurrentTrainingProps> = ({ isTraining }) => {
  return (
    <Card className={isTraining ? "bg-green-100" : "bg-gray-100"}>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold">
          {isTraining ? "Currently Training" : "Training Inactive"}
        </h2>
        {isTraining ? (
          <p>Model: GPT-2 (Fine-tuned) | Epoch: 3/10 | Batch: 1500/5000 | Current Loss: 2.34 | Time Elapsed: 5h 23m</p>
        ) : (
          <p>No active training session. Start a new training session from the Training tab.</p>
        )}
      </CardContent>
    </Card>
  )
}