import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getUserPredictions, Prediction } from '@/lib/predictions'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

export function PredictionHistory() {
  const { user } = useAuth()
  const [predictions, setPredictions] = useState<Prediction[]>([])

  useEffect(() => {
    const fetchPredictions = async () => {
      if (user) {
        try {
          const userPredictions = await getUserPredictions(user)
          setPredictions(userPredictions)
        } catch (error) {
          console.error('Error fetching predictions:', error)
        }
      }
    }

    fetchPredictions()
  }, [user])

  const getModelLabel = (modelType: string) => {
    const labels = {
      breast_cancer: 'Breast Cancer Detection',
      bone_fracture: 'Bone Fracture Detection',
      brain_tumor: 'Brain Tumor Detection'
    }
    return labels[modelType as keyof typeof labels] || modelType
  }

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
      <h3 className="font-semibold mb-4">Prediction History</h3>
      {predictions.length > 0 ? (
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="bg-card rounded-lg p-4 space-y-2">
              <div className="relative h-32 w-full">
                <Image
                  src={prediction.imageUrl}
                  alt={`Scan for ${prediction.modelType}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <p className="font-medium">{getModelLabel(prediction.modelType)}</p>
              <p><strong>Result:</strong> {prediction.prediction}</p>
              <p><strong>Confidence:</strong> {(prediction.confidenceScore * 100).toFixed(2)}%</p>
              <p className="text-sm text-muted-foreground">
                {new Date(prediction.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No predictions yet.</p>
      )}
    </ScrollArea>
  )
}

