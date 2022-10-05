export function getEntityById<T extends { id?: string }>(
  id: string,
  entities: Array<T> | null,
) {
  if (!entities || !Array.isArray(entities) || entities.length === 0)
    return null
  const data = entities?.find((entity) => entity?.id === id)
  if (data) {
    return data
  }
}

export function generateUniqueId() {
  // proper solution would be to use a package like uuid or lodash
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  )
}

export function parseOptionValue<T extends { value: number; label: string }>(
  value: number,
  options: Array<T>,
) {
  if (!options || !Array.isArray(options) || options.length === 0) return null
  const data = options.find((option) => option.value === value)
  return data?.label
}
