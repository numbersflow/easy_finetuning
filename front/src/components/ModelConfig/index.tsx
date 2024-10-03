'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { Progress } from "../ui/progress"

export default function ModelConfig() {
  const [chatMessages, setChatMessages] = useState([
    { role: 'user', content: 'Hello, how are you?' },
    { role: 'assistant', content: "I'm an AI, I don't have feelings." }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: newMessage }])
      setNewMessage('')
      // Here you would typically call an API to get the model's response
      // For now, we'll just simulate a response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'assistant', content: "I'm an AI assistant. How can I help you?" }])
      }, 1000)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle>Select Model from Hugging Face</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-2">
          <Input placeholder="Enter model name (e.g., gpt2, bert-base-uncased)" className="flex-grow" />
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Load Model</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2 bg-white shadow-md">
          <CardHeader>
            <CardTitle>Chat with Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] overflow-y-auto mb-4 p-4 border rounded-md bg-gray-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white">Send</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle>Inference Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>GPU:</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>FP16:</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Autocast:</span>
              <Switch />
            </div>
            <Input placeholder="Max Tokens" />
            <Input placeholder="Top K" />
            <Input placeholder="Top P" />
            <Input placeholder="Seed" />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle>Performance Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>GPU Usage: 65%</span>
              <span>Memory Usage: 8.2 GB</span>
            </div>
            <Progress value={65} className="h-2 bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Inference Time:</p>
              <p>0.25s</p>
            </div>
            <div>
              <p className="font-semibold">Tokens per Second:</p>
              <p>32</p>
            </div>
            <div>
              <p className="font-semibold">Total Params:</p>
              <p>124M</p>
            </div>
            <div>
              <p className="font-semibold">Model Size:</p>
              <p>496 MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle>Model Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <tbody>
              {[
                { label: "Architecture", value: "Transformer" },
                { label: "Hidden Size", value: "768" },
                { label: "Number of Layers", value: "12" },
                { label: "Number of Attention Heads", value: "12" },
                { label: "Vocabulary Size", value: "50,257" },
                { label: "Maximum Sequence Length", value: "1024" },
                { label: "Tokenizer", value: "GPT-2 Tokenizer" },
                { label: "Training Data", value: "WebText" },
                { label: "License", value: "MIT" }
              ].map((item, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-2 pr-4 font-semibold text-gray-700">{item.label}:</td>
                  <td className="py-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}