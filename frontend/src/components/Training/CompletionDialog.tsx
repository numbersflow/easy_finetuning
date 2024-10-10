import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import { CheckCircle, AlertTriangle } from 'lucide-react'

interface ModelInfo {
  finalLoss: number;
  totalSteps: number;
  trainingDuration: string;
  learningRate: number;
  modelSize: string;
  datasetSize: number;
}

interface CompletionDialogProps {
  showDialog: boolean
  setShowDialog: (show: boolean) => void
  isEarlyStopped: boolean
  completionMessage: string
  handleConfirm: () => void
  modelInfo: ModelInfo
}

export function CompletionDialog({
  showDialog,
  setShowDialog,
  isEarlyStopped,
  completionMessage,
  handleConfirm,
  modelInfo
}: CompletionDialogProps) {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            {isEarlyStopped ? (
              <AlertTriangle className="w-8 h-8 mr-2 text-yellow-500" />
            ) : (
              <CheckCircle className="w-8 h-8 mr-2 text-green-500" />
            )}
            {isEarlyStopped ? 'Training Early Stopped' : 'Training Completed'}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {isEarlyStopped
              ? 'The training process was stopped early.'
              : 'The fine-tuning process has been completed successfully.'}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p className="text-sm text-gray-700">{completionMessage}</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Model Information:</h3>
            <ul className="space-y-2">
              <li><strong>Final Loss:</strong> {modelInfo.finalLoss.toFixed(4)}</li>
              <li><strong>Total Steps:</strong> {modelInfo.totalSteps.toLocaleString()}</li>
              <li><strong>Training Duration:</strong> {modelInfo.trainingDuration}</li>
              <li><strong>Learning Rate:</strong> {modelInfo.learningRate.toExponential(2)}</li>
              <li><strong>Model Size:</strong> {modelInfo.modelSize}</li>
              <li><strong>Dataset Size:</strong> {modelInfo.datasetSize.toLocaleString()} samples</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}