import dayjs from 'dayjs'

export const classicFormatDate = (date: string): string => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const toDateString = (v: string | Date | null): string => {
  if (!v) return ''
  if (typeof v === 'string') return v
  return dayjs(v).format('YYYY-MM-DD')
}

export const increaseOneDay = (date: string): string => {
  return dayjs(date).add(1, 'day').format('YYYY-MM-DD')
}

export const decreaseOneDay = (date: string): string => {
  return dayjs(date).subtract(1, 'day').format('YYYY-MM-DD')
}
