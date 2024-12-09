import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ModelType, PredictionResponse } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from "@/lib/utils"

interface ImagePreviewProps {
  src: string
  alt: string
  prediction: PredictionResponse | null
  modelType: ModelType
  isLoading: boolean
}

const modelLabels: Record<ModelType, string> = {
  breast_cancer: 'Breast Cancer Detection',
  bone_fracture: 'Bone Fracture Detection',
  brain_tumor: 'Brain Tumor Detection'
}

export function ImagePreview({ src, alt, prediction, modelType, isLoading }: ImagePreviewProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4 bg-secondary">
          <h3 className="text-lg font-semibold mb-2">{modelLabels[modelType]}</h3>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : prediction ? (
            <>
              <p className="text-lg"><strong>Result:</strong> {prediction.prediction}</p>
              <p><strong>Confidence:</strong> {(prediction.confidence_score * 100).toFixed(2)}%</p>
            </>
          ) : (
            <p>No prediction available</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

