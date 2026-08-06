export const modelConfig = {
  endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  defaultModel: 'llama-3.3-70b-versatile',
  timeoutMs: 10_000,
  maxCompletionTokens: 500,
  temperature: 0.2,
  allowedModels: ['llama-3.3-70b-versatile'],
} as const;
