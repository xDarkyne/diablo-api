/**
 * Base interface for most item related endpoints
 */
export interface Base {
  id: string,
  name: string,
  path: string,
  icon?: string,
  slug?: string,
  url?: string
}