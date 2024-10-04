import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader2 } from 'lucide-react'
import { CustomLoadingBar } from '../ui/CustomLoadingBar'

interface ModelSelectorProps {
  onModelLoad: (modelName: string) => Promise<void>;
}

export function ModelSelector({ onModelLoad }: ModelSelectorProps) {
  const [modelName, setModelName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [remainingTime, setRemainingTime] = useState('')
  const [downloadSpeed, setDownloadSpeed] = useState('')

  useEffect(() => {
    let interval: number | undefined
    if (isLoading) {
      let startTime = Date.now()
      interval = window.setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000 // in seconds
        const newProgress = Math.min(progress + 1, 100)
        setProgress(newProgress)
        
        // Estimate remaining time
        const remainingProgress = 100 - newProgress
        const estimatedTotalTime = (elapsedTime * 100) / newProgress
        const estimatedRemainingTime = estimatedTotalTime - elapsedTime
        setRemainingTime(formatTime(estimatedRemainingTime))

        // Simulate download speed (replace with actual calculation in real implementation)
        const speed = (newProgress * 1024 * 1024) / elapsedTime // bytes per second
        setDownloadSpeed(formatSpeed(speed))

        if (newProgress === 100) {
          clearInterval(interval)
          setIsLoading(false)
        }
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLoading, progress])

  const handleLoadModel = async () => {
    if (modelName.trim()) {
      setIsLoading(true)
      setProgress(0)
      try {
        await onModelLoad(modelName)
      } catch (error) {
        console.error('Failed to load model:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}m ${remainingSeconds}s`
  }

  const formatSpeed = (bytesPerSecond: number): string => {
    if (bytesPerSecond < 1024) return `${bytesPerSecond.toFixed(2)} B/s`
    if (bytesPerSecond < 1024 * 1024) return `${(bytesPerSecond / 1024).toFixed(2)} KB/s`
    return `${(bytesPerSecond / (1024 * 1024)).toFixed(2)} MB/s`
  }

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>Select Model from Hugging Face</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input 
            placeholder="허깅페이스에 모델명을 입력해주세요." 
            className="flex-grow" 
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white whitespace-nowrap"
            onClick={handleLoadModel}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load Model'
            )}
          </Button>
        </div>
        {isLoading && (
          <div className="space-y-2">
            <CustomLoadingBar progress={progress} />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{progress.toFixed(1)}% Complete</span>
              <span>Estimated time remaining: {remainingTime}</span>
            </div>
            <div className="text-sm text-gray-500">
              Download speed: {downloadSpeed}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}