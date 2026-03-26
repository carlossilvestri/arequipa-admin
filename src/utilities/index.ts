import dayjs from 'dayjs'

export const classicFormatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format: string = 'YYYY-MM-DD',
): string => {
  return dayjs(date).format(format)
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

export const truncateText = ({
  text,
  maxLength,
  symbol,
}: {
  text: string
  maxLength: number
  symbol?: string
}): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + symbol
}

export const truncateTextWithEllipsis = (text: string, maxLength: number): string => {
  return truncateText({ text, maxLength, symbol: '...' })
}

// Handle scroll to section
export const handleScrollToSection = (value: string) => {
  const element = document.querySelector(value)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
