"use client"

import { useEffect } from "react"

interface Props {
  onUpdateFound?: () => void
}

export default function ServiceWorkerRegister({ onUpdateFound }: Props) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration)

          // Listen for updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("New Service Worker found!")
                  if (onUpdateFound) onUpdateFound()
                }
              }
            }
          }
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
        })
    }
  }, [onUpdateFound])

  return null
}
