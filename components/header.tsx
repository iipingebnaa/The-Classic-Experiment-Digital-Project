"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, Phone, Archive, LogIn, UserPlus, LogOut } from "lucide-react"
import UnderConstructionOverlay from "./UnderConstructionOverlay"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [underConstruction, setUnderConstruction] = useState(false)
  const triggerUnderConstruction = () => setUnderConstruction(true)
  const closeUnderConstruction = () => setUnderConstruction(false)

  function getCookie(name: string) {
    if (typeof document === "undefined") return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
    return null
  }

  function deleteCookie(name: string) {
    if (typeof document === "undefined") return
    document.cookie = `${name}=; Max-Age=0; path=/;`
  }

  // Update login state
  const updateLoginState = () => setIsLoggedIn(!!getCookie("userToken"))

  useEffect(() => {
    // Initial login check
    updateLoginState()

    // Listen for login/logout events
    const handler = () => updateLoginState()
    window.addEventListener("loginStateChanged", handler)

    return () => window.removeEventListener("loginStateChanged", handler)
  }, [])

  // For general navigation
  const navigate = (path: string) => {
    window.location.href = path
    setMenuOpen(false)
  }

  // For Home/Contact links
const handleScrollOrNavigate = (sectionId?: string) => {
  const currentPath = window.location.pathname
  if (currentPath !== "/") {
    // Not on home → navigate first
    window.location.href = sectionId ? `/#${sectionId}` : "/"
  } else if (sectionId) {
    // Already on home → scroll to section
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }
  setMenuOpen(false)
}

  return (
    <>

    <UnderConstructionOverlay
      open={underConstruction}
      onClose={closeUnderConstruction}
    />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 px-6 md:px-12 flex items-center justify-between shadow-sm h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center h-full">
          <img
            src="/assets/ccl.logo.png"
            alt="Classic Clean Laundry Logo"
            className="object-contain w-20 h-20 md:w-24 md:h-24"
          />
        </div>

        {/* Title */}
        {/* Desktop title (md and up) */}
        <h1 className="hidden md:block absolute w-full text-center left-1/2 transform -translate-x-1/2 z-10 text-[#003262] font-semibold tracking-[0.25em] text-sm sm:text-base md:text-lg pointer-events-none">
          CLASSIC CLEAN LAUNDRY
        </h1>

        {/* Mobile title (below md) */}
        <h1 className="block md:hidden absolute w-full text-center left-1/2 transform -translate-x-1/2 z-10 text-[#003262] font-semibold tracking-[0.25em] text-sm sm:text-base md:text-lg lg:text-xl pointer-events-none">
          <span className="block sm:inline">CLASSIC CLEAN</span>
          <span className="block sm:inline"> LAUNDRY</span>
        </h1>
        

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center pr-4">
          <a
            onClick={() => handleScrollOrNavigate()}
            className="text-[#003262] font-medium hover:underline cursor-pointer"
          >
             Home
          </a>

          <a
            onClick={() => handleScrollOrNavigate("contact")}
            className="text-[#003262] font-medium hover:underline cursor-pointer"
          >
            Contact
          </a>


          {!isLoggedIn && (
            <>
             {/*
             <a onClick={() => navigate("/login")} className="text-[#003262] font-medium hover:underline cursor-pointer">
                Login
              </a>
              <a
                onClick={() => navigate("/signup")}
                className="bg-[#003262] text-white px-4 py-2 rounded-full font-medium shadow-md hover:brightness-110 cursor-pointer"
              >
                Sign Up
              </a>
              */}

              <a
                onClick={triggerUnderConstruction}
                className="text-[#003262] font-medium hover:underline cursor-pointer"
              >
                Login
              </a>
              <a
                onClick={triggerUnderConstruction}
                className="bg-[#003262] text-white px-4 py-2 rounded-full font-medium shadow-md hover:brightness-110 cursor-pointer"
              >
      Sign Up
    </a>
            
            </>
          )}

          {isLoggedIn && (
            <>
              <a
                onClick={() => navigate("/my-orders")}
                className="text-[#003262] font-medium hover:underline cursor-pointer"
              >
                My Orders
              </a>
              <button
                onClick={() => {
                  deleteCookie("userToken")
                  window.dispatchEvent(new Event("loginStateChanged"))
                  navigate("/")
                }}
                className="px-3 py-1 rounded-full bg-[#003262] text-white font-medium hover:brightness-110"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="p-2 flex-shrink-0 md:hidden" onClick={() => setMenuOpen(true)}>
          <Menu className="w-7 h-7 text-gray-900" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setMenuOpen(false)} />

          <div className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl z-50 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-[#003262]">Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <nav className="flex flex-col space-y-3">
              <button
  onClick={() => handleScrollOrNavigate()}
  className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
>
  <Home className="w-4" />
  Home
</button>

<button
  onClick={() => handleScrollOrNavigate("contact")}
  className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
>
  <Phone className="w-4" />
  Contact
</button>


              {!isLoggedIn && (
                <>
                {/*
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <LogIn className="w-4" />
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <UserPlus className="w-4" />
                    Sign Up
                  </button>
                  */}

                  <button
  onClick={() => {
    triggerUnderConstruction()
    setMenuOpen(false)
  }}
  className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
>
  <LogIn className="w-4" />
  Login
</button>

<button
  onClick={() => {
    triggerUnderConstruction()
    setMenuOpen(false)
  }}
  className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
>
  <UserPlus className="w-4" />
  Sign Up
</button>


                </>
              )}

              {isLoggedIn && (
                <>
                  <button
                    onClick={() => navigate("/my-orders")}
                    className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <Archive className="w-4" />
                    My Orders
                  </button>

                  <button
                    onClick={() => {
                      deleteCookie("userToken")
                      window.dispatchEvent(new Event("loginStateChanged"))
                      navigate("/")
                    }}
                    className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <LogOut className="w-4" />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
