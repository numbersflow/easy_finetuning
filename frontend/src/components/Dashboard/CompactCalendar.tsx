import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { eachDayOfInterval, format, startOfMonth, endOfMonth, subMonths, addMonths } from 'date-fns'

interface TrainingData {
  date: string
  success: number
  warnings: number
  failures: number
}

const data: TrainingData[] = [
  { date: '2024-08-01', success: 8, warnings: 2, failures: 1 },
  { date: '2024-08-15', success: 10, warnings: 0, failures: 0 },
  { date: '2024-09-05', success: 7, warnings: 1, failures: 0 },
  { date: '2024-09-20', success: 6, warnings: 3, failures: 2 },
  { date: '2024-10-10', success: 9, warnings: 1, failures: 0 },
  { date: '2024-10-25', success: 12, warnings: 0, failures: 1 },
]

const getColor = (success: number, warnings: number, failures: number) => {
  if (failures > 0) return 'bg-red-400 hover:bg-red-400 transition-colors duration-200'
  if (warnings > 0) return 'bg-yellow-400 hover:bg-yellow-400 transition-colors duration-200'
  if (success > 0) return 'bg-green-400 hover:bg-green-400 transition-colors duration-200'
  return 'bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
}

export function CompactCalendar() {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))
  const [mostRecentMonth, setMostRecentMonth] = useState(startOfMonth(new Date()))
  const totalMonths = 3

  const getDaysForMonth = (month: Date) => {
    const start = startOfMonth(month)
    const end = endOfMonth(month)
    return eachDayOfInterval({ start, end })
  }

  const days = getDaysForMonth(currentMonth)

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const nextMonth = addMonths(prevMonth, 1)
      return nextMonth <= mostRecentMonth ? nextMonth : prevMonth
    })
  }

  const currentPage = totalMonths - Math.floor((new Date().getTime() - currentMonth.getTime()) / (30 * 24 * 60 * 60 * 1000))

  return (
    <Card className="h-[300px] flex flex-col">
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto p-2">
        <div className="flex h-full">
          <div className="w-4 mr-2 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500 rounded-full">
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex-grow grid grid-cols-7 gap-[1px] p-[1px]">
              {days.map((day, index) => {
                const dataPoint = data.find(d => d.date === format(day, 'yyyy-MM-dd'))
                return (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-full h-full flex items-center justify-center text-[0.6rem] border border-black ${
                            dataPoint
                              ? getColor(dataPoint.success, dataPoint.warnings, dataPoint.failures)
                              : 'bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
                          } hover:scale-110 transition-all duration-200`}
                        >
                          {format(day, 'd')}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{format(day, 'MMMM d, yyyy')}</p>
                        {dataPoint && (
                          <>
                            <p>Success: {dataPoint.success}</p>
                            <p>Warnings: {dataPoint.warnings}</p>
                            <p>Failures: {dataPoint.failures}</p>
                          </>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
      <div className="flex justify-between items-center px-4 py-2 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousMonth}
          disabled={!data.some(d => new Date(d.date) < currentMonth)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-500">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextMonth}
          disabled={currentMonth >= mostRecentMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}