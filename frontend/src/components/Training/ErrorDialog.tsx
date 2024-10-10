import React from 'react'
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { AlertCircle } from 'lucide-react'

interface ErrorDialogProps {
  showErrorDialog: boolean
  setShowErrorDialog: (show: boolean) => void
  errorLog: string
  handleErrorConfirm: () => void
}

export function ErrorDialog({
  showErrorDialog,
  setShowErrorDialog,
  errorLog,
  handleErrorConfirm
}: ErrorDialogProps) {
  return (
    <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertCircle className="w-6 h-6 mr-2" />
            Training Error
          </DialogTitle>
          <DialogDescription>
            An error occurred during the training process. Here is the error log:
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 bg-red-50 p-4 rounded-md max-h-[400px] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-red-700 text-sm font-mono">{errorLog}</pre>
        </div>
        <DialogFooter>
          <Button onClick={handleErrorConfirm}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}