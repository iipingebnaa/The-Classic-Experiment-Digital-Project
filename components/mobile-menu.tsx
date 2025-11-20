"use client"

import { X, Home, Phone, Archive, LogIn, UserPlus } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  triggerUnderConstruction: () => void
}

export default function MobileMenu({ isOpen, onClose, triggerUnderConstruction }: MobileMenuProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      onClose()
    }
  }

  if (!isOpen) return null
  const isLoggedIn = !!localStorage.getItem("userToken")

  const handleNavigation = (path: string) => {
    if (path === "home" || path === "contact") {
      scrollToSection(path)
    } else {
      triggerUnderConstruction()
    }
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-50 backdrop-blur-sm" onClick={onClose} />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-64 sm:w-80 z-50 shadow-2xl bg-white px-0 mx-0 my-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-[#003262] text-base">Menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 text-gray-600 h-6" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          <button
            onClick={() => handleNavigation("home")}
            className="flex flex-row items-center text-left px-4 py-3 hover:bg-gray-100 rounded-lg text-gray-700 font-medium transition-colors text-sm"
          >
            <Home className="w-4 h-4 mr-2 flex-shrink-0" color="#003262" strokeWidth={3} />
            Home
          </button>

          <button
            onClick={() => handleNavigation("contact")}
            className="flex flex-row items-center text-left px-4 py-3 hover:bg-gray-100 rounded-lg text-gray-700 font-medium transition-colors text-sm"
          >
            <Phone className="w-4 h-4 mr-2 flex-shrink-0" color="#003262" strokeWidth={3} />
            Contact
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleNavigation("/my-orders")}
                className="flex flex-row items-center text-left px-4 py-3 hover:bg-gray-100 rounded-lg text-gray-700 font-medium transition-colors text-sm"
              >
                <Archive className="w-4 h-4 mr-2 flex-shrink-0" color="#003262" strokeWidth={3} />
                My Orders
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("userToken")
                  window.location.href = "/"
                }}
                className="self-start px-3 py-1 rounded font-semibold text-white bg-[#003262] hover:brightness-110 transition-colors text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/login")}
                className="flex flex-row items-center text-left px-4 py-3 hover:bg-gray-100 rounded-lg text-gray-700 font-medium transition-colors text-sm"
              >
                <LogIn className="w-4 h-4 mr-2 flex-shrink-0" color="#003262" strokeWidth={3} />
                Login
              </button>

              <button
                onClick={() => handleNavigation("/signup")}
                className="flex flex-row items-center text-left px-4 py-3 hover:bg-gray-100 rounded-lg text-gray-700 font-medium transition-colors text-sm"
              >
                <UserPlus className="w-4 h-4 mr-2 flex-shrink-0" color="#003262" strokeWidth={3} />
                Sign Up
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  )
}
