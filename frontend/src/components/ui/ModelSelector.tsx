import React from 'react'
import { Checkbox } from "./checkbox"
import { Label } from "./label"

export interface Model {
  id: string;
  name: string;
  [key: string]: any;
}

interface ModelSelectorProps {
  models: Model[];
  selectedModels: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  title?: string;
}

export function ModelSelector({ models, selectedModels, onSelectionChange, title = "Select Models" }: ModelSelectorProps) {
  const handleModelToggle = (modelId: string) => {
    const updatedSelection = selectedModels.includes(modelId)
      ? selectedModels.filter(id => id !== modelId)
      : [...selectedModels, modelId];
    onSelectionChange(updatedSelection);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {models.map((model) => (
          <div key={model.id} className="flex items-center space-x-2">
            <Checkbox
              id={`model-${model.id}`}
              checked={selectedModels.includes(model.id)}
              onCheckedChange={() => handleModelToggle(model.id)}
            />
            <Label htmlFor={`model-${model.id}`}>{model.name}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}