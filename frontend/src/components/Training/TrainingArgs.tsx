import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Code, ChevronRight } from 'lucide-react'
import { Modal } from "../ui/modal"

interface TrainingArgsProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function TrainingArgs({ isOpen, setIsOpen }: TrainingArgsProps) {
  const trainingArgsFields = [
    { id: 'arg1', label: 'Argument 1', placeholder: 'Enter argument 1' },
    { id: 'arg2', label: 'Argument 2', placeholder: 'Enter argument 2' },
  ]

  return (
    <>
      <Card 
        className="cursor-pointer hover:bg-blue-50 transition-all duration-300 border-2 border-blue-200 hover:border-blue-500 shadow-md hover:shadow-xl transform hover:-translate-y-1" 
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
            <Code className="mr-2 text-blue-500" />
            Training Args
          </CardTitle>
          <ChevronRight className="text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Click to configure training arguments</p>
        </CardContent>
      </Card>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Training Arguments"
        fields={trainingArgsFields}
      />
    </>
  )
}