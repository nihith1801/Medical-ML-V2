import { ModelType } from "./modelTypes";

export interface PredictionResponse {
  prediction: string;
  confidence_score: number;
}

export async function getPrediction(file: File, modelType: ModelType): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append('file', file);

  console.log(`[API] Starting prediction request for ${modelType}`);
  console.log(`[API] File details:`, {
    name: file.name,
    type: file.type,
    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
  });

  try {
    console.log(`[API] Sending request to: https://mlmodelbackend.onrender.com/predict?model_type=${modelType}`);
    
    const startTime = Date.now();
    const response = await fetch(
      `https://mlmodelbackend.onrender.com/predict?model_type=${modelType}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const endTime = Date.now();

    console.log(`[API] Response received in ${endTime - startTime}ms`);
    console.log(`[API] Response status:`, response.status, response.statusText);
    console.log(`[API] Response headers:`, Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        console.error('[API] Bad request error:', errorData);
        throw new Error(errorData.error || 'Bad Request');
      }
      console.error(`[API] HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[API] Prediction data received:', data);
    return data;
  } catch (error) {
    console.error('[API] Error during prediction request:', error);
    throw error;
  }
}

