"use client"

import { useEffect, useState } from "react"

type Bubble = {
  size: number
  left: number
  delay: number
  duration: number
  opacity: number
}

export default function HeroBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 18 }).map(() => ({
      size: Math.random() * 20 + 15,
      left: Math.random() * 100,
      delay: Math.random(),
      duration: Math.random() * 10 + 10,
      opacity: Math.random() * 0.6 + 0.3,
    }))

    setBubbles(generated)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/50 border border-white/30"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            bottom: `-${b.size}px`,
            animation: `floatUp ${b.duration}s linear ${b.delay}s infinite`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  )
}
