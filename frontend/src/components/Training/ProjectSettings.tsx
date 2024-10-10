import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function ProjectSettings() {
  return (
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
  )
}