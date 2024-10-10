'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "../ui/button"
import { ProjectSettings } from './ProjectSettings'
import { TrainingOptions } from './TrainingOptions'
import { TrainingArgs } from './TrainingArgs'
import { TrainingProgress } from './TrainingProgress'
import { ErrorDialog } from './ErrorDialog'
import { CompletionDialog } from './CompletionDialog'

interface ModelInfo {
  finalLoss: number;
  totalSteps: number;
  trainingDuration: string;
  learningRate: number;
  modelSize: string;
  datasetSize: number;
}

export default function Training() {
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [isTrainingOptionsOpen, setIsTrainingOptionsOpen] = useState(false)
  const [isTrainingArgsOpen, setIsTrainingArgsOpen] = useState(false)
  const [isTraining, setIsTraining] = useState(false)
  const [errorLog, setErrorLog] = useState<string>('')
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [isEarlyStopped, setIsEarlyStopped] = useState(false)
  const [completionMessage, setCompletionMessage] = useState('')
  const [modelInfo, setModelInfo] = useState<ModelInfo>({
    finalLoss: 0,
    totalSteps: 0,
    trainingDuration: '',
    learningRate: 0,
    modelSize: '',
    datasetSize: 0
  })
  const [startTime, setStartTime] = useState<number | null>(null)

  const generateModelInfo = useCallback((isEarlyStopped: boolean): ModelInfo => {
    const endTime = Date.now()
    const duration = startTime ? endTime - startTime : 0
    const hours = Math.floor(duration / 3600000)
    const minutes = Math.floor((duration % 3600000) / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)

    return {
      finalLoss: isEarlyStopped ? 0.1 + Math.random() * 0.2 : 0.05 + Math.random() * 0.1,
      totalSteps: isEarlyStopped ? Math.floor(50000 + Math.random() * 30000) : Math.floor(80000 + Math.random() * 20000),
      trainingDuration: `${hours}h ${minutes}m ${seconds}s`,
      learningRate: 2e-5 + Math.random() * 1e-5,
      modelSize: '1.5B parameters',
      datasetSize: Math.floor(500000 + Math.random() * 500000)
    }
  }, [startTime])

  const handleTrainingCompletion = useCallback(() => {
    setIsTraining(false)
    const newModelInfo = generateModelInfo(false)
    setModelInfo(newModelInfo)
    setCompletionMessage("Your model has been successfully fine-tuned. You can now use it for inference.")
    setShowCompletionDialog(true)
  }, [generateModelInfo])

  const handleEarlyStopping = useCallback(() => {
    setIsTraining(false)
    setIsEarlyStopped(true)
    const newModelInfo = generateModelInfo(true)
    setModelInfo(newModelInfo)
    setCompletionMessage("Training was stopped early due to convergence or lack of improvement. The current best model has been saved.")
    setShowCompletionDialog(true)
  }, [generateModelInfo])

  const handleError = useCallback((errorMessage: string) => {
    setIsTraining(false)
    setErrorLog(`Error occurred at ${new Date().toISOString()}\n${errorMessage}\n\nStack trace:\n${new Error().stack}`)
    setShowErrorDialog(true)
  }, [])

  useEffect(() => {
    let interval: number | undefined

    if (isTraining && trainingProgress < 100) {
      interval = window.setInterval(() => {
        setTrainingProgress(prev => {
          const next = prev + 1
          if (next >= 100) {
            handleTrainingCompletion()
            return 100
          }
          // Simulate random error or early stopping
          const randomEvent = Math.random()
          if (randomEvent < 0.05) { // 5% chance of error
            handleError("An unexpected error occurred during training.")
            return prev
          } else if (randomEvent < 0.10) { // 5% chance of early stopping
            handleEarlyStopping()
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
  }, [isTraining, trainingProgress, handleTrainingCompletion, handleEarlyStopping, handleError])

  const handleStartTraining = () => {
    setTrainingProgress(0)
    setIsTraining(true)
    setErrorLog('')
    setIsEarlyStopped(false)
    setStartTime(Date.now())
  }

  const handleErrorConfirm = () => {
    setShowErrorDialog(false)
    setTrainingProgress(0)
    setIsTraining(false)
  }

  const handleCompletionConfirm = () => {
    setShowCompletionDialog(false)
    setTrainingProgress(0)
  }

  return (
    <div className="space-y-6">
      <ProjectSettings />
      <div className="grid grid-cols-2 gap-4">
        <TrainingOptions 
          isOpen={isTrainingOptionsOpen}
          setIsOpen={setIsTrainingOptionsOpen}
        />
        <TrainingArgs 
          isOpen={isTrainingArgsOpen}
          setIsOpen={setIsTrainingArgsOpen}
        />
      </div>
      <div className="flex justify-center">
        <Button 
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-12 py-4 text-xl font-bold rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleStartTraining}
          disabled={isTraining}
        >
          {isTraining ? 'Training in Progress' : 'Start Fine-tuning'}
        </Button>
      </div>
      <ErrorDialog 
        showErrorDialog={showErrorDialog}
        setShowErrorDialog={setShowErrorDialog}
        errorLog={errorLog}
        handleErrorConfirm={handleErrorConfirm}
      />
      <CompletionDialog 
        showDialog={showCompletionDialog}
        setShowDialog={setShowCompletionDialog}
        isEarlyStopped={isEarlyStopped}
        completionMessage={completionMessage}
        handleConfirm={handleCompletionConfirm}
        modelInfo={modelInfo}
      />
      <TrainingProgress trainingProgress={trainingProgress} />
    </div>
  )
}