"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import ContactSection from "@/components/contact-section"
import WhatsAppButton from "@/components/whatsapp-button"
import { useRouter } from "next/navigation"
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister"
import UnderConstructionOverlay from "@/components/UnderConstructionOverlay"

export default function Home() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [underConstruction, setUnderConstruction] = useState(false)

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [showUpdateButton, setShowUpdateButton] = useState(false)

  const triggerUnderConstruction = () => setUnderConstruction(true)
  const closeUnderConstruction = () => setUnderConstruction(false)

  const handleOrderNow = () => {
    
    router.push("/order") 
  }

  /*const handleOrderNow = () => {
  triggerUnderConstruction()
}*/


  // Detect if app is installed
  const isAppInstalled = () => {
    if (window.matchMedia("(display-mode: standalone)").matches) return true
    if ((window.navigator as any).standalone) return true
    return false
  }

  // PWA Install button logic
  useEffect(() => {
    // Show install button if app is not installed
    if (!isAppInstalled()) setShowInstallButton(true)

    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    const appInstalledHandler = () => {
      setShowInstallButton(false)
    }

    window.addEventListener("beforeinstallprompt", handler)
    window.addEventListener("appinstalled", appInstalledHandler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
      window.removeEventListener("appinstalled", appInstalledHandler)
    }
  }, [])

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log("User choice:", outcome)
      setDeferredPrompt(null)
      setShowInstallButton(false)
    } else {
      triggerUnderConstruction()
    }
  }

  const handleUpdateApp = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" })
      window.location.reload()
    }
  }

  const pricingData = [
    {
      title: "Baskets",
      image: "/assets/images/white-laundry-basket-with-clean-clothes.png",
      items: [
        { name: "1kg - 3kg Small Basket", price: "N$180" },
        { name: "4kg - 7kg Medium Basket", price: "N$300" },
        { name: "8kg - 10kg Large/big Basket", price: "N$425" },
      ],
    },
    {
      title: "Basket Iron Only",
      image: "/assets/images/steam-iron-pressing-clothes-in-laundry-basket.png",
      items: [
        { name: "Small", price: "N$130" },
        { name: "Medium", price: "N$275" },
        { name: "Large", price: "N$330" },
      ],
    },
    {
      title: "Ladies' wear",
      image: "/assets/images/women-s-clothing-laundry-items-hanging-neatly.jpg",
      items: [
        { name: "Shirt short sleeve", price: "N$17" },
        { name: "Shirt long sleeve", price: "N$20" },
        { name: "T-shirt", price: "N$15" },
        { name: "Top", price: "N$15" },
        { name: "Trouser/jeans", price: "N$25" },
        { name: "Jersey", price: "N$25" },
        { name: "Jacket", price: "N$40" },
        { name: "Pullover/sweater", price: "N$20" },
        { name: "Skirt", price: "N$15" },
        { name: "Shorts", price: "N$15" },
        { name: "Pyjamas (2pcs)", price: "N$25" },
        { name: "Socks (per pair)", price: "N$10" },
        { name: "Swimsuit", price: "N$20" },
        { name: "Dress", price: "N$20" },
      ],
    },
    {
      title: "Men's wear",
      image: "/assets/images/men-s-clothing-shirts-and-pants-neatly-folded.jpg",
      items: [
        { name: "Shirt short sleeve", price: "N$17" },
        { name: "Shirt long sleeve", price: "N$20" },
        { name: "T-shirt", price: "N$15" },
        { name: "Trouser/jean", price: "N$25" },
        { name: "Shorts", price: "N$15" },
        { name: "Vests/under pants", price: "N$15" },
        { name: "Socks (pair)", price: "N$10" },
        { name: "Pyjamas (2pcs)", price: "N$25" },
        { name: "Jersey", price: "N$25" },
        { name: "Jacket", price: "N$40" },
        { name: "Sweater/pullover", price: "N$20" },
      ],
    },
    {
      title: "Blankets/Duvet inners",
      image: "/assets/images/cozy-blankets-and-duvet-inners-folded-on-shelf.webp",
      items: [
        { name: "Single", price: "N$60" },
        { name: "Double", price: "N$100" },
        { name: "Queen Comforters / king", price: "N$145" },
        { name: "Winter Blanket", price: "N$220" },
        { name: "Hand towel", price: "N$15" },
        { name: "Bath towel", price: "N$20" },
      ],
    },
    {
      title: "Beddings",
      image: "/assets/images/clean-bed-sheets-and-pillowcases-neatly-stacked.png",
      items: [
        { name: "Throw (Medium)", price: "N$50" },
        { name: "Heavy Throw", price: "N$75" },
        { name: "Flat sheet / Fitted sheet", price: "N$35" },
        { name: "Duvet cover", price: "N$35" },
        { name: "Pillowcase", price: "N$15" },
        { name: "Continental Pillow inner", price: "N$45" },
        { name: "Standard Pillow inner", price: "N$35" },
      ],
    },
    {
      title: "Others",
      image: "/assets/images/formal-suit-and-coat-hanging-on-rack.webp",
      items: [
        { name: "Suit", price: "N$120" },
        { name: "Winter Coat (Short)", price: "N$60" },
        { name: "Winter Coat (Long)", price: "N$75" },
        { name: "Blazer", price: "N$60" },
        { name: "Graduation Gown", price: "N$120" },
        { name: "Official Pants", price: "N$25" },
      ],
    },
    {
      title: "Curtains",
      image: "/assets/images/clean-curtains-hanging-elegantly.jpg",
      items: [
        { name: "Normal length", price: "N$35" },
        { name: "Extra length", price: "N$60" },
      ],
    },
  ]

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
            <div className="absolute inset-0 pointer-events-none">
  {[...Array(18)].map((_, i) => {
    const size = Math.random() * 20 + 15; // size in px
    const delay = Math.random() * 1; // delay in seconds
    const duration = Math.random() * 10 + 10; // duration in seconds
    const left = Math.random() * 100; // horizontal position
    return (
      <div
        key={i}
        className="absolute rounded-full bg-white/50 border border-white/30"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          bottom: `-${size}px`, // start just below the hero section
          animation: `floatUp ${duration}s linear ${delay}s infinite`,
          opacity: Math.random() * 0.6 + 0.3,
        }}
      />
    )
  })}
</div>  

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
                className="bg-[#003262] hover:bg-[#003262] text-white px-6 sm:px-8 py-2 rounded-full font-semibold shadow-lg text-sm sm:text-base"
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

        {/* Pricing Cards */}
        <div className="px-4 pb-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 md:gap-6">
            {pricingData.map((category, index) => {
              const isExpanded = expandedCard === index
              const displayItems = isExpanded ? category.items : category.items.slice(0, 3)

              return (
                <Card
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-300 p-0 flex flex-col h-full gap-px"
                >
                  <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full object-cover rounded-b-lg h-full "
                    />
                  </div>

                  <div className="p-1.5 sm:p-2 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 mt-0 mb-1.5 text-sm sm:text-base">
                      {category.title}
                    </h3>

                    <div className="flex-1 flex flex-col gap-2">
                      {displayItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center gap-2">
                          <span className="flex-1 text-left text-gray-900 text-xs sm:text-sm truncate">
                            {item.name}
                          </span>
                          <span className="font-semibold text-[#003269] text-xs sm:text-sm flex-shrink-0">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    {category.items.length > 5 && !isExpanded && (
                      <button
                        onClick={() => setExpandedCard(index)}
                        className="mt-2 text-[#003262] font-semibold text-sm underline hover:brightness-110 transition self-start bg-transparent px-0 py-0"
                      >
                        More
                      </button>
                    )}

                    {isExpanded && (
                      <button
                        onClick={() => setExpandedCard(null)}
                        className="mt-2 text-[#003262] font-semibold text-sm underline hover:brightness-110 transition self-start bg-transparent px-0 py-0"
                      >
                        Show Less
                      </button>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Fast Service Banner */}
        <div className="text-center py-3 sm:py-4">
          <p className="text-[#003262] font-bold text-lg sm:text-xl">Fast Service: N$60</p>
        </div>

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
