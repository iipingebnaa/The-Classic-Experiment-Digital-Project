"use client"

import { useEffect, useState } from "react"

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return false

    deferredPrompt.prompt()
    const result = await deferredPrompt.userChoice

    setDeferredPrompt(null)
    setShowInstallButton(false)

    return result.outcome === "accepted"
  }

  return {
    showInstallButton,
    installApp,
  }
}
