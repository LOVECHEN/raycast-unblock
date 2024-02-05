const OPENAI_SERVICE_PROVIDERS = [
  {
    id: 'openai-gpt-3.5-turbo',
    model: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    provider_name: 'OpenAI',
    requires_better_ai: true,
    features: ['chat', 'quick_ai', 'commands', 'api'],
  },
  {
    id: 'openai-gpt-4-1106-preview',
    model: 'gpt-4-1106-preview',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    provider_name: 'OpenAI',
    requires_better_ai: true,
    features: ['chat', 'quick_ai', 'commands', 'api'],
  },
]

const GEMINI_SERVICE_PROVIDERS = [
  {
    id: 'gemini-pro',
    model: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'google',
    provider_name: 'Google',
    requires_better_ai: true,
    features: ['chat', 'quick_ai', 'commands', 'api'],
  },
]

const GITHUB_COPILOT_SERVICE_PROVIDERS = [
  {
    id: 'github-copilot',
    model: 'github-copilot',
    name: 'GitHub Copilot',
    provider: 'microsoft',
    provider_name: 'Microsoft',
    requires_better_ai: true,
    features: ['chat', 'quick_ai', 'commands', 'api'],
  },
]

export const RAYCAST_AI_SERVICE_PROVIDERS = [
  ...OPENAI_SERVICE_PROVIDERS,
  ...GEMINI_SERVICE_PROVIDERS,
  ...GITHUB_COPILOT_SERVICE_PROVIDERS,
]

export const RAYCAST_DEFAULT_MODELS = {
  chat: 'openai-gpt-3.5-turbo',
  quick_ai: 'openai-gpt-3.5-turbo',
  commands: 'openai-gpt-3.5-turbo',
  api: 'openai-gpt-3.5-turbo',
}

export const RAYCAST_GEMINI_PRO_ONLY_MODELS = {
  chat: 'gemini-pro',
  quick_ai: 'gemini-pro',
  commands: 'gemini-pro',
  api: 'gemini-pros',
}

export const RAYCAST_COPILOT_MODELS = {
  chat: 'github-copilot',
  quick_ai: 'github-copilot',
  commands: 'github-coilot',
  api: 'github-copilot',
}

export const OPENAI_OFFICIAL_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
export const GEMINI_OFFICIAL_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
