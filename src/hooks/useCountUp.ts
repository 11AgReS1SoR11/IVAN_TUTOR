import { useState, useEffect, useRef } from 'react'

interface UseCountUpProps {
  start: number
  end: number
  duration: number
  delay?: number
  trigger: boolean
}

export const useCountUp = ({
  start,
  end,
  duration,
  delay = 0,
  trigger,
}: UseCountUpProps): number => {
  const [count, setCount] = useState(start)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (!trigger || hasStartedRef.current) return

    const timer = setTimeout(() => {
      hasStartedRef.current = true
      startTimeRef.current = null

      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp
        }

        const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        const currentValue = start + (end - start) * easedProgress

        setCount(Math.round(currentValue))

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [trigger, start, end, duration, delay])

  return count
}
