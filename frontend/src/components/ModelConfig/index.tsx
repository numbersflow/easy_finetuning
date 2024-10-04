'use client'

import React, { useState } from 'react'
import { ModelSelector } from './ModelSelector'
import { ChatInterface } from './ChatInterface'
import { InferenceSettings } from './InferenceSettings'
import { PerformanceMonitoring } from './PerformanceMonitoring'
import { ModelConfiguration } from './ModelConfiguration'
import { ModelPerformanceComparison } from './ModelPerformanceComparison'

export default function ModelConfig() {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleModelLoad = async (modelName: string) => {
    setIsLoading(true)
    // Here you would typically have your actual model loading logic
    // For now, we'll simulate it with a timeout
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsModelLoaded(true)
    setIsLoading(false)
  }

  return (
    <div className="space-y-4">
      <ModelSelector onModelLoad={handleModelLoad} />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ChatInterface disabled={!isModelLoaded || isLoading} />
        </div>
        <InferenceSettings disabled={!isModelLoaded || isLoading} />
      </div>
      <PerformanceMonitoring disabled={!isModelLoaded || isLoading} />
      <ModelConfiguration disabled={!isModelLoaded || isLoading} />
      <ModelPerformanceComparison />
    </div>
  )
}