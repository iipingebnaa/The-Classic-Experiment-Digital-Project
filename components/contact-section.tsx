"use client"


import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CornerDownRightIcon, MapPin, Phone, Mail, Clock } from "lucide-react"


export default function ContactSection() {
  const openGoogleMaps = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=-22.565256,17.069986", "_blank")
  }


  return (
    <section id="contact" className="bg-white py-6 sm:py-8 lg:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#003262] mb-4 sm:mb-6 lg:mb-8">
          Contact Us
        </h2>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Map Section */}
          <div className="flex flex-col">
            <div className="w-full h-48 sm:h-64 lg:h-96 rounded-lg overflow-hidden shadow-lg mb-3 sm:mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.094976767925!2d17.069986!3d-22.565256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMzJzU0LjkiUyAxN8KwMDQnMTEuOSJF!5e0!3m2!1sen!2sna!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <Button
             onClick={openGoogleMaps}
               className="bg-[#003262] hover:bg-[#004b94] hover:backdrop-blur-md hover:shadow-lg active:bg-[#004b94] active:backdrop-blur-md active:shadow-lg transition-all duration-300 text-white py-2 rounded-full font-semibold text-sm sm:text-base sm:w-auto inline-flex items-center mx-0 px-6"
               >
              <CornerDownRightIcon className="w-3 h-3 mr-2 sm:h-4 sm:w-4" />
               Get Directions
            </Button>


          </div>


          {/* Contact Info Card */}
          <div className="flex flex-col">
            <Card className="p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-[#003262] mb-4 sm:mb-6">Contact Information</h3>


              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#408ac8] p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Phone</h4>
                    <p className="text-gray-600 sm:text-sm text-sm">+264 81 338 8933</p>
                  </div>
                </div>


                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#408ac8] p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Email</h4>
                    <p className="text-gray-600 break-words text-sm">info@scc-laundry.com</p>
                  </div>
                </div>


                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#408ac8] p-2 sm:p-3 rounded-full flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Address</h4>
                    <p className="text-gray-600 sm:text-sm text-sm">1861 John Meinert Street</p>
                    <p className="text-gray-600 sm:text-sm text-sm">Windhoek, Namibia</p>
                  </div>
                </div>


                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#408ac8] p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Working Hours</h4>
                    <p className="text-gray-600 sm:text-sm lg:text-base text-sm">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 sm:text-sm lg:text-base text-sm">Saturday & Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </Card>


          <Button
             asChild
             className="bg-[#003262] hover:bg-[#004b94] hover:backdrop-blur-md hover:shadow-lg active:bg-[#004b94] active:backdrop-blur-md active:shadow-lg transition-all duration-300 text-white rounded-full font-semibold text-sm sm:text-base sm:w-auto inline-flex items-center mt-3 py-2 sm:mt-6 px-6"
             >
             <a href="tel:+264813388933">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
             Call Now
            </a>
          </Button>


          </div>
        </div>
      </div>
    </section>
  )
}
