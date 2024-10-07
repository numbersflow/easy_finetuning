import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Modal } from "../ui/modal"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Settings, Code, ChevronRight, AlertCircle, XCircle } from 'lucide-react'
import { CustomLoadingBar } from '../ui/CustomLoadingBar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog"

const trainingLossData = [
  { name: '1', value: 0.5 },
  { name: '2', value: 0.7 },
  { name: '3', value: 0.6 },
  { name: '4', value: 0.65 },
  { name: '5', value: 0.9 },
]

const gpuUtilizationData = [
  { name: '1', value: 20 },
  { name: '2', value: 50 },
  { name: '3', value: 40 },
  { name: '4', value: 70 },
  { name: '5', value: 90 },
]

interface FieldType {
  id: string;
  label: string;
  placeholder: string;
}

export default function Training() {
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [isTrainingOptionsOpen, setIsTrainingOptionsOpen] = useState(false)
  const [isTrainingArgsOpen, setIsTrainingArgsOpen] = useState(false)
  const [isTraining, setIsTraining] = useState(false)
  const [errorLog, setErrorLog] = useState<string>('')
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  useEffect(() => {
    let interval: number | undefined

    if (isTraining && trainingProgress < 100) {
      interval = window.setInterval(() => {
        setTrainingProgress(prev => {
          const next = prev + 1
          if (next >= 100) {
            setIsTraining(false)
            return 100
          }
          // Simulate random error
          if (Math.random() < 0.05) { // 5% chance of error
            handleError("An unexpected error occurred during training.")
            return prev
          }
          return next
        })
      }, 100)
    }

    return () => {
      if (interval !== undefined) {
        window.clearInterval(interval)
      }
    }
  }, [isTraining, trainingProgress])

  const handleStartTraining = () => {
    setTrainingProgress(0)
    setIsTraining(true)
    setErrorLog('')
  }

  const handleError = (errorMessage: string) => {
    setIsTraining(false)
    setErrorLog(`Error occurred at ${new Date().toISOString()}\n${errorMessage}\n\nStack trace:\n${new Error().stack}`)
    setShowErrorDialog(true)
  }

  const handleErrorConfirm = () => {
    setShowErrorDialog(false)
    setTrainingProgress(0)
    setIsTraining(false)
  }

  const trainingOptionsFields: FieldType[] = [
    { id: 'option1', label: 'Option 1', placeholder: 'Enter option 1' },
    { id: 'option2', label: 'Option 2', placeholder: 'Enter option 2' },
  ]

  const trainingArgsFields: FieldType[] = [
    { id: 'arg1', label: 'Argument 1', placeholder: 'Enter argument 1' },
    { id: 'arg2', label: 'Argument 2', placeholder: 'Enter argument 2' },
  ]

  return (
    <div className="space-y-6">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Project Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="main-project" className="text-sm font-medium text-gray-700">Main Project:</Label>
              <Input id="main-project" placeholder="Enter main project" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <Label htmlFor="sub-project" className="text-sm font-medium text-gray-700">Sub Project:</Label>
              <Input id="sub-project" placeholder="Enter sub project" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <Label htmlFor="model-alias" className="text-sm font-medium text-gray-700">Model Alias:</Label>
              <Input id="model-alias" placeholder="Enter model alias" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="model-size" className="text-sm font-medium text-gray-700">Model Size:</Label>
              <Input id="model-size" placeholder="Enter model size" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <Label htmlFor="task-type" className="text-sm font-medium text-gray-700">Task Type:</Label>
              <Input id="task-type" placeholder="Enter task type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <Label htmlFor="initial-model-name" className="text-sm font-medium text-gray-700">Initial Model Name:</Label>
              <Input id="initial-model-name" placeholder="Enter initial model name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="cursor-pointer hover:bg-blue-50 transition-all duration-300 border-2 border-blue-200 hover:border-blue-500 shadow-md hover:shadow-xl transform hover:-translate-y-1" 
          onClick={() => setIsTrainingOptionsOpen(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
              <Settings className="mr-2 text-blue-500" />
              Training Options
            </CardTitle>
            <ChevronRight className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Click to configure training options</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-blue-50 transition-all duration-300 border-2 border-blue-200 hover:border-blue-500 shadow-md hover:shadow-xl transform hover:-translate-y-1" 
          onClick={() => setIsTrainingArgsOpen(true)}
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
      </div>

      <Modal
        isOpen={isTrainingOptionsOpen}
        onOpenChange={setIsTrainingOptionsOpen}
        title="Training Options"
        fields={trainingOptionsFields}
      />
      <Modal
        isOpen={isTrainingArgsOpen}
        onOpenChange={setIsTrainingArgsOpen}
        title="Training Arguments"
        fields={trainingArgsFields}
      />

      <div className="flex justify-center">
        <Button 
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-12 py-4 text-xl font-bold rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleStartTraining}
          disabled={isTraining}
        >
          {isTraining ? 'Training in Progress' : 'Start Fine-tuning'}
        </Button>
      </div>

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

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Training Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-gray-700">Progress:</Label>
            <span className="text-lg font-semibold text-blue-600">{trainingProgress}%</span>
          </div>
          <CustomLoadingBar progress={trainingProgress} />

          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Training Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trainingLossData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" stroke="#718096" />
                    <YAxis stroke="#718096" />
                    <Tooltip contentStyle={{ backgroundColor: '#f7fafc', border: '1px solid #e2e8f0' }} />
                    <Line type="monotone" dataKey="value" stroke="#4299e1" strokeWidth={2} dot={{ fill: '#4299e1', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">GPU Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={gpuUtilizationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" stroke="#718096" />
                    <YAxis stroke="#718096" />
                    <Tooltip contentStyle={{ backgroundColor: '#f7fafc', border: '1px solid #e2e8f0' }} />
                    <Line type="monotone" dataKey="value" stroke="#48bb78" strokeWidth={2} dot={{ fill: '#48bb78', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}