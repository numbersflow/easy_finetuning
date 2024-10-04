import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from '../components/ui/button';
import { User } from 'lucide-react';
import Dashboard from '../components/Dashboard';
import ModelConfig from '../components/ModelConfig';
import Dataset from '../components/Dataset';
import Training from '../components/Training';
import Evaluation from '../components/Evaluation';

interface MainProps {
  onLogout: () => void;
  user: {
    name: string;
    email: string;
  };
}

const Main: React.FC<MainProps> = ({ onLogout, user }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Welcome to Easy Finetuning</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm">
            <User size={24} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{user.name}</span>
          </div>
          <Button onClick={onLogout} variant="outline" className="hover:bg-destructive hover:text-destructive-foreground transition-colors">
            Logout
          </Button>
        </div>
      </header>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="mb-4">
          {["dashboard", "model-config", "dataset", "training", "evaluation"].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize">
              {tab.replace('-', ' ')}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="bg-white rounded-lg p-6 shadow-lg transition-all duration-300 ease-in-out">
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="model-config">
            <ModelConfig />
          </TabsContent>
          <TabsContent value="dataset">
            <Dataset />
          </TabsContent>
          <TabsContent value="training">
            <Training />
          </TabsContent>
          <TabsContent value="evaluation">
            <Evaluation />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Main;