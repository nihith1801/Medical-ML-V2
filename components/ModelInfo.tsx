import React from 'react'
import { Brain, ImagePlus, Microscope } from 'lucide-react'

interface ModelInfoProps {
  modelType: string
}

const modelData = {
  default: {
    title: 'Our AI Models',
    description: 'Our advanced AI models use state-of-the-art machine learning techniques to analyze medical images with high accuracy. Select a specific model to learn more.',
    icon: Brain,
  },
  brain_mri: {
    title: 'Brain MRI Analysis',
    description: 'Our Brain MRI Analysis model uses convolutional neural networks to detect and classify abnormalities in brain MRI scans. It can identify tumors, lesions, and other neurological conditions with high precision.',
    icon: Brain,
  },
  xray: {
    title: 'X-Ray Classification',
    description: 'The X-Ray Classification model employs deep learning algorithms to analyze chest X-rays and detect various pulmonary diseases, including pneumonia, tuberculosis, and COVID-19. It provides rapid and accurate diagnoses to support medical professionals.',
    icon: ImagePlus,
  },
  pathology: {
    title: 'Pathology Slides Analysis',
    description: 'Our Pathology Slides Analysis model utilizes advanced image segmentation and classification techniques to examine histopathological images. It can identify cancerous cells, tissue abnormalities, and assist in the diagnosis of various diseases at the cellular level.',
    icon: Microscope,
  },
}

export function ModelInfo({ modelType }: ModelInfoProps) {
  const { title, description, icon: Icon } = modelData[modelType as keyof typeof modelData] || modelData.default

  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

