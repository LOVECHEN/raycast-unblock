import { getAIConfig } from '../../utils/env.util'
import { RAYCAST_AI_SERVICE_PROVIDERS, RAYCAST_COPILOT_MODELS, RAYCAST_DEFAULT_MODELS, RAYCAST_GEMINI_PRO_ONLY_MODELS } from './constants'

export function AIModels() {
  const config = getAIConfig()
  let default_models
  switch (config.type) {
    case 'gemini':
      default_models = RAYCAST_GEMINI_PRO_ONLY_MODELS
      break
    case 'copilot':
      default_models = RAYCAST_COPILOT_MODELS
      break
    default:
      default_models = RAYCAST_DEFAULT_MODELS
      break
  }
  return {
    default_models,
    models: RAYCAST_AI_SERVICE_PROVIDERS,
  }
}
