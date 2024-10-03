import React, { useState, ChangeEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Switch } from "../ui/switch"
import { Slider } from "../ui/slider"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { InfoCircledIcon } from '@radix-ui/react-icons'

type InferenceSettingsType = {
  useGPU: boolean;
  useFP16: boolean;
  useAutocast: boolean;
  do_sample: boolean;
  maxTokens: number;
  topK: number;
  topP: number;
  temperature: number;
  repetition_penalty: number;
  length_penalty: number;
  num_beams: number;
  seed: number;
}

type BooleanSetting = 'useGPU' | 'useFP16' | 'useAutocast' | 'do_sample';
type NumberSetting = 'maxTokens' | 'topK' | 'topP' | 'temperature' | 'repetition_penalty' | 'length_penalty' | 'num_beams' | 'seed';

interface InferenceSettingsProps {
  disabled: boolean;
}

export function InferenceSettings({ disabled }: InferenceSettingsProps) {
  const [inferenceSettings, setInferenceSettings] = useState<InferenceSettingsType>({
    useGPU: true,
    useFP16: false,
    useAutocast: true,
    do_sample: true,
    maxTokens: 1350,
    topK: 50,
    topP: 0.2,
    temperature: 0.4,
    repetition_penalty: 1.0,
    length_penalty: 1.0,
    num_beams: 1,
    seed: 279289
  })

  const handleSettingChange = (setting: keyof InferenceSettingsType, value: boolean | number) => {
    setInferenceSettings(prev => ({ ...prev, [setting]: value }))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: NumberSetting, min: number, max: number) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value >= min && value <= max) {
      handleSettingChange(key, value)
    }
  }

  const tooltips: Record<keyof InferenceSettingsType,

 string> = {
    useGPU: "더 빠른 추론을 위해 GPU 사용",
    useFP16: "16비트 부동소수점 정밀도 사용",
    useAutocast: "적절한 데이터 타입으로 자동 캐스팅",
    do_sample: "샘플링 사용 여부; 사용하지 않으면 그리디 디코딩 사용",
    maxTokens: "생성할 최대 토큰 수",
    topK: "상위 K개의 확률이 높은 어휘 토큰을 유지하기 위한 top-k-필터링 값",
    topP: "핵 샘플링을 위해 유지할 누적 확률이 가장 높은 어휘 토큰의 비율",
    temperature: "볼츠만 분포의 무작위성 제어",
    repetition_penalty: "반복 패널티 파라미터. 1.0은 패널티 없음을 의미",
    length_penalty: "길이에 대한 지수 패널티. 1.0은 패널티 없음을 의미",
    num_beams: "빔 검색을 위한 빔의 수. 1은 빔 검색 없음을 의미",
    seed: "재현성을 위한 랜덤 시드"
  }

  const booleanSettings: BooleanSetting[] = ['useGPU', 'useFP16', 'useAutocast', 'do_sample'];
  const numberSettings: NumberSetting[] = ['maxTokens', 'topK', 'topP', 'temperature', 'repetition_penalty', 'length_penalty', 'num_beams', 'seed'];

  const getSettingProps = (key: NumberSetting) => {
    switch (key) {
      case 'maxTokens':
        return { min: 1, max: 2048, step: 1 };
      case 'topK':
        return { min: 1, max: 100, step: 1 };
      case 'topP':
        return { min: 0, max: 1, step: 0.1 };
      case 'temperature':
        return { min: 0, max: 2, step: 0.1 };
      case 'repetition_penalty':
        return { min: 1, max: 2, step: 0.1 };
      case 'length_penalty':
        return { min: 0, max: 2, step: 0.1 };
      case 'num_beams':
        return { min: 1, max: 10, step: 1 };
      case 'seed':
        return { min: 0, max: 1000000, step: 1 };
    }
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Inference Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {booleanSettings.map((key) => (
            <div key={key} className="flex flex-col items-center justify-center space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor={key} className="flex items-center cursor-help">
                      {key} <InfoCircledIcon className="ml-1 h-4 w-4 text-muted-foreground" />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-popover text-popover-foreground">
                    <p>{tooltips[key]}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Switch
                id={key}
                checked={inferenceSettings[key]}
                onCheckedChange={(checked) => handleSettingChange(key, checked)}
                className="data-[state=checked]:bg-primary"
                disabled={disabled}
              />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {numberSettings.map((key) => {
            const { min, max, step } = getSettingProps(key);
            const value = inferenceSettings[key];
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor={key} className="flex items-center cursor-help">
                          {key} <InfoCircledIcon className="ml-1 h-4 w-4 text-muted-foreground" />
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-popover text-popover-foreground">
                        <p>{tooltips[key]}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    id={`${key}-input`}
                    value={value.toString()}
                    onChange={(e) => handleInputChange(e, key, min, max)}
                    className="w-20 text-right"
                    step={step}
                    min={min}
                    max={max}
                    disabled={disabled}
                  />
                </div>
                <Slider
                  id={key}
                  min={min}
                  max={max}
                  step={step}
                  value={[value]}
                  onValueChange={([newValue]) => handleSettingChange(key, newValue)}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:focus:ring-primary"
                  disabled={disabled}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
}