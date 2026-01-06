"use client"

import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onClose: () => void
}

export default function UnderConstructionOverlay({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-center items-center p-4">
      <p className="text-[#003262] text-2xl sm:text-3xl font-bold text-center">
        This feature is under construction
      </p>

      <Button
        onClick={onClose}
        className="mt-6 bg-[#003262] text-white px-6 py-2 rounded-full font-semibold text-sm sm:text-base"
      >
        Close
      </Button>
    </div>
  )
}
