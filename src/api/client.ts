import { API_BASE_URL } from '../utils/constants'
import { getCached, setCache } from '../utils/format'

interface RequestConfig {
  method?: string
  headers?: Record<string, string>
  body?: unknown
  params?: Record<string, string | number | boolean>
  cache?: boolean
}

async function apiClient<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, params, cache = true } = config

  let url = `${API_BASE_URL}${endpoint}`
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value))
    })
    url += `?${searchParams.toString()}`
  }

  const cacheKey = `${method}:${url}`
  if (cache && method === 'GET') {
    const cached = getCached<T>(cacheKey)
    if (cached) return cached
  }

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) throw new Error(`${response.status}`)

  const data = await response.json()

  if (cache && method === 'GET') {
    setCache(cacheKey, data)
  }

  return data as T
}

export default apiClient

export function buildImageUrl(path?: string): string {
  if (!path) return ''
  if (path.startsWith('data:')) return path
  if (path.startsWith('http')) return path
  if (path.startsWith('//')) return `https:${path}`
  return `https://dkstatics-public.digikala.com${path.startsWith('/') ? '' : '/'}${path}`
}
