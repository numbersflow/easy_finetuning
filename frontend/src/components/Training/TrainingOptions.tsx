'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Settings, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface TrainingOptionsProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface OptionConfig {
  id: string
  label: string
  fields: { id: string; label: string; placeholder: string }[]
}

const optionConfigs: OptionConfig[] = [
  {
    id: 'peft',
    label: 'PEFT',
    fields: [
      { id: 'peft_method', label: 'Method', placeholder: 'e.g., LoRA, Prefix Tuning' },
      { id: 'peft_rank', label: 'Rank', placeholder: 'e.g., 8, 16, 32' },
    ],
  },
  {
    id: 'deepspeed',
    label: 'DeepSpeed',
    fields: [
      { id: 'ds_stage', label: 'ZeRO Stage', placeholder: 'e.g., 1, 2, 3' },
      { id: 'ds_offload', label: 'Offload Level', placeholder: 'e.g., cpu, nvme' },
    ],
  },
  {
    id: 'quantization',
    label: 'Quantization',
    fields: [
      { id: 'quant_bits', label: 'Bits', placeholder: 'e.g., 8, 4' },
      { id: 'quant_method', label: 'Method', placeholder: 'e.g., dynamic, static' },
    ],
  },
  {
    id: 'wandb',
    label: 'W&B',
    fields: [
      { id: 'wandb_project', label: 'Project', placeholder: 'Enter project name' },
      { id: 'wandb_entity', label: 'Entity', placeholder: 'Enter entity name' },
    ],
  },
  {
    id: 'huggingface',
    label: 'Hugging Face',
    fields: [
      { id: 'hf_model', label: 'Model', placeholder: 'Enter model name' },
      { id: 'hf_token', label: 'Token', placeholder: 'Enter your HF token' },
    ],
  },
]

export function TrainingOptions({ isOpen, setIsOpen }: TrainingOptionsProps) {
  const [activeOption, setActiveOption] = useState<string | null>(null)
  const [optionValues, setOptionValues] = useState<Record<string, Record<string, string>>>({})

  const handleSwitchChange = (optionId: string) => {
    setActiveOption(prevOption => prevOption === optionId ? null : optionId)
  }

  const handleInputChange = (optionId: string, fieldId: string, value: string) => {
    setOptionValues(prev => ({
      ...prev,
      [optionId]: { ...prev[optionId], [fieldId]: value },
    }))
  }

  const handleSave = () => {
    console.log('Saving options:', optionValues)
    setIsOpen(false)
  }

  return (
    <>
      <Card 
        className="cursor-pointer hover:bg-blue-50 transition-all duration-300 border-2 border-blue-200 hover:border-blue-500 shadow-md hover:shadow-xl transform hover:-translate-y-1" 
        onClick={() => setIsOpen(true)}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Training Options</DialogTitle>
          </DialogHeader>
          <div className="flex">
            <div className="w-1/2 border-r p-6 space-y-4">
              {optionConfigs.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <Label htmlFor={option.id} className="text-sm font-medium">
                    {option.label}
                  </Label>
                  <Switch
                    id={option.id}
                    checked={activeOption === option.id}
                    onCheckedChange={() => handleSwitchChange(option.id)}
                  />
                </div>
              ))}
            </div>
            <div className="w-1/2 p-6">
              {activeOption && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {optionConfigs.find(opt => opt.id === activeOption)?.label} Settings
                  </h3>
                  {optionConfigs
                    .find(opt => opt.id === activeOption)
                    ?.fields.map((field) => (
                      <div key={field.id}>
                        <Label htmlFor={`${activeOption}-${field.id}`} className="text-xs text-gray-500 mb-1 block">
                          {field.label}
                        </Label>
                        <Input
                          id={`${activeOption}-${field.id}`}
                          placeholder={field.placeholder}
                          value={optionValues[activeOption]?.[field.id] || ''}
                          onChange={(e) => handleInputChange(activeOption, field.id, e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end p-6 pt-0">
            <Button onClick={handleSave}>Save Options</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}