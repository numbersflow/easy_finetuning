import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface ModelConfigurationProps {
  disabled: boolean;
}

export function ModelConfiguration({ disabled }: ModelConfigurationProps) {
  const modelConfig = [
    { label: "Architecture", value: "Transformer" },
    { label: "Hidden Size", value: "768" },
    { label: "Number of Layers", value: "12" },
    { label: "Number of Attention Heads", value: "12" },
    { label: "Vocabulary Size", value: "50,257" },
    { label: "Maximum Sequence Length", value: "1024" },
    { label: "Tokenizer", value: "GPT-2 Tokenizer" },
    { label: "Training Data", value: "WebText" },
    { label: "License", value: "MIT" }
  ]

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>Model Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <tbody>
            {modelConfig.map((item, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-2 pr-4 font-semibold text-gray-700">{item.label}:</td>
                <td className="py-2">
                  {disabled ? (
                    <span className="text-gray-400">Not available</span>
                  ) : (
                    item.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}