import React, { useState } from 'react'
import { CurrentTraining } from './CurrentTraining'
import { GPUInfo } from './GPUInfo'
import { RecentActivities } from './RecentActivities'
import { TrainingProgress } from './TrainingProgress'
import { ResourceUsage } from './ResourceUsage'
import { PerformanceMetrics } from './PerformanceMetrics'
import ModelComparison from './ModelComparison'
import { LearningRateSchedule } from './LearningRateSchedule'
import { Alerts } from './Alerts'

export default function Dashboard() {
  const [isTraining] = useState(true)

  return (
    <div className="space-y-6">
      <CurrentTraining isTraining={isTraining} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GPUInfo />
        <LearningRateSchedule />
        <RecentActivities />
        <Alerts />
      </div>
      <TrainingProgress />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResourceUsage />
        <PerformanceMetrics />
      </div>
      <div className="mt-6">
        <ModelComparison />
      </div>
    </div>
  )
}