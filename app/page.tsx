"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

import Header from "@/components/header"
import ContactSection from "@/components/contact-section"
import WhatsAppButton from "@/components/whatsapp-button"
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister"
import UnderConstructionOverlay from "@/components/UnderConstructionOverlay"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { selectIsAuthenticated } from "./redux/auth/authSlice"
import { usePWAInstall } from "@/hooks/usePWAInstall"
import HeroBubbles from "@/components/HeroBubbles"
import { INTENTS } from "@/constants/intents"
import { setIntent } from "./redux/intent/intentSlice"
import { AppDispatch } from "./redux/store"
import PricingSection from "@/components/PricingSection"

export default function Home() {
  const router = useRouter()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch<AppDispatch>();

  
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [underConstruction, setUnderConstruction] = useState(false)
  const [showUpdateButton, setShowUpdateButton] = useState(false)

  const { showInstallButton, installApp } = usePWAInstall()
  
  const triggerUnderConstruction = () => setUnderConstruction(true)
  const closeUnderConstruction = () => setUnderConstruction(false)


  const handleOrderNow = () => {
    if (!isAuthenticated) {
      const orderIntent = { action: INTENTS.GO_TO_ORDER};
      
      dispatch(setIntent(orderIntent));

      router.push("/login") 
      return
    }
    router.push("/order") 
  }



  const handleInstallApp = async () => {
    const installed = await installApp()
    if (!installed) {
      triggerUnderConstruction()
    }
  }

  const handleUpdateApp = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" })
      window.location.reload()
    }
  }

  
  return (
    <>
      <div className="min-h-screen bg-[#9ECAE1]" id="home">
        
        {/* Service Worker */}
        <ServiceWorkerRegister onUpdateFound={() => setShowUpdateButton(true)} />

        <Header />

        <WhatsAppButton /> 

        <UnderConstructionOverlay
          open={underConstruction}
          onClose={closeUnderConstruction}
        />

        {/* Hero Section */}
        <div className="pt-16">
          <div className="relative h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] overflow-hidden">
            <img
              src="/assets/images/hero-section-background-45.jpg"
              alt="Laundry service"
              className="w-full h-full object-cover opacity-50"
            />

            {/* Bubbles */}
            <HeroBubbles />


            {/* Process Flow */}
            <div className="absolute top-8 sm:top-12 md:top-16 left-2 right-2 sm:left-4 sm:right-4 md:left-16 md:right-16 lg:left-32 lg:right-32 bg-white/70 backdrop-blur-sm leading-7 border-none opacity-85 py-2 sm:py-3 px-2 sm:px-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mx-auto text-[10px] sm:text-xs">
                {/* Pickup */}
    <div className="flex flex-col items-center w-12 sm:w-16">
      <img src="/assets/icons/Pickup-unscreen.gif" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" alt="Pickup" />
      <span className="font-semibold ">Pickup</span>
    </div>

    {/* Arrow */}
    <div className="flex items-center justify-center">
      <span className="text-sm sm:text-lg">→</span>
    </div>

    {/* Wash */}
    <div className="flex flex-col items-center w-12 sm:w-16">
      <img src="/assets/icons/Wash-unscreen.gif" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" alt="Wash" />
      <span className="font-semibold ">Wash</span>
    </div>

    {/* Arrow */}
    <div className="flex items-center justify-center">
      <span className="text-sm sm:text-lg">→</span>
    </div>

    {/* Iron */}
    <div className="flex flex-col items-center w-12 sm:w-16">
      <img src="/assets/icons/Iron-unscreen.gif" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" alt="Iron" />
      <span className="font-semibold ">Iron</span>
    </div>

    {/* Arrow */}
    <div className="flex items-center justify-center">
      <span className="text-sm sm:text-lg">→</span>
    </div>

    {/* Pack */}
    <div className="flex flex-col items-center w-12 sm:w-16">
      <img src="/assets/icons/Pack-unscreen.gif" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" alt="Pack" />
      <span className="font-semibold ">Pack</span>
    </div>

    {/* Arrow */}
    <div className="flex items-center justify-center">
      <span className="text-sm sm:text-lg">→</span>
    </div>

    {/* Delivery */}
    <div className="flex flex-col items-center w-14 sm:w-20">
      <img src="/assets/icons/Delivery-unscreen.gif" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" alt="Delivery" />
      <span className="font-semibold ">Delivery</span>
    </div>
              </div>
            </div>

            {/* Order Now */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2">
              <Button
                onClick={handleOrderNow}
                className="bg-[#003262] hover:bg-[#003262] text-white px-6 sm:px-8 py-2 rounded-full font-semibold shadow-lg text-md md:text-base"
              >
                Order Now
              </Button>
            </div>

            {/* Pricing & Services Title */}
            <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center">
              <h2 className="relative text-white text-xl sm:text-2xl md:text-4xl font-bold py-5 inline-block">
                Pricing & Services
              </h2>
            </div>
          </div>
        </div>

        <PricingSection />

        {/* Note */}
        <div className="text-center px-4 pb-6 sm:pb-6">
          <p className="text-gray-900 text-sm sm:text-base">
            NB: Laundry basket priced by weight scale
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 pb-8 opacity-100">
          <Button
            onClick={handleOrderNow}
            className="bg-[#003262] text-white hover:bg-[#003262] hover:brightness-110 active:brightness-110 transition-all duration-300 px-6 sm:px-8 py-2 rounded-full font-semibold text-sm sm:text-base"
          >
            Order Now
          </Button>

          {!showUpdateButton && showInstallButton && (
            <Button
              onClick={handleInstallApp}
              className="bg-[#003262] text-white hover:bg-[#003262] hover:brightness-110 active:brightness-110 transition-all duration-300 px-6 sm:px-8 py-2 rounded-full font-semibold text-sm sm:text-base"
            >
              Download App
            </Button>
          )}

          {showUpdateButton && (
            <Button
              onClick={handleUpdateApp}
              className="bg-[#003262] text-white hover:bg-[#003262] hover:brightness-110 active:brightness-110 transition-all duration-300 px-6 sm:px-8 py-2 rounded-full font-semibold text-sm sm:text-base"
            >
              Update App
            </Button>
          )}
        </div>

        <ContactSection />
        
      </div>
    </>
  )
}
