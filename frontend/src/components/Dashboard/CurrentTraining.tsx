import React from 'react'
import { Card, CardContent } from "../ui/card"
import { Loader2 } from 'lucide-react'

interface CurrentTrainingProps {
  isTraining: boolean
}

export const CurrentTraining: React.FC<CurrentTrainingProps> = ({ isTraining }) => {
  return (
    <Card className={`${isTraining ? "bg-green-100" : "bg-gray-100"} mt-6`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <h2 className="text-2xl font-semibold">
            {isTraining ? "Currently Training" : "Training Inactive"}
          </h2>
          {isTraining && (
            <Loader2 className="h-6 w-6 animate-spin text-green-600" />
          )}
        </div>
        {isTraining ? (
          <div className="flex items-center space-x-4 text-sm">
            <p><span className="font-semibold">Model:</span> GPT-2 (Fine-tuned)</p>
            <p><span className="font-semibold">Epoch:</span> 3/10</p>
            <p><span className="font-semibold">Batch:</span> 1500/5000</p>
            <p><span className="font-semibold">Current Loss:</span> 2.34</p>
            <p><span className="font-semibold">Time Elapsed:</span> 5h 23m</p>
          </div>
        ) : (
          <p className="text-gray-600">No active training session. Start a new training session from the Training tab.</p>
        )}
      </CardContent>
    </Card>
  )
}