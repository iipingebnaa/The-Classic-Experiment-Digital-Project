"use client";

import { useState } from "react";
import { Menu, X, Home, Phone } from "lucide-react";
import UnderConstructionOverlay from "./UnderConstructionOverlay";
import { useSelector, useDispatch } from "react-redux";
import { selectCustomer, logout } from "../app/redux/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [underConstruction, setUnderConstruction] = useState(false);

  const customer = useSelector(selectCustomer);
  const dispatch = useDispatch();
  const router = useRouter();

  const triggerUnderConstruction = () => setUnderConstruction(true);
  const closeUnderConstruction = () => setUnderConstruction(false);

  const navigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/"); 
  };

  const handleScrollOrNavigate = (sectionId?: string) => {
    const currentPath = window.location.pathname;

    if (currentPath !== "/") {
      window.location.href = sectionId ? `/#${sectionId}` : "/";
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    setMenuOpen(false);
  };

  return (
    <>
      <UnderConstructionOverlay open={underConstruction} onClose={closeUnderConstruction} />

      <header className="fixed top-0 left-0 right-0 bg-white/40 backdrop-blur-sm z-50 px-1 md:px-12 flex items-center justify-between shadow-sm h-18 md:h-20">
        {/* Logo */}
        <div className="flex items-center h-full">
          <img
            src="/assets/ccl.logo.png"
            alt="Classic Clean Laundry Logo"
            className="object-contain w-20 h-20 md:w-24 md:h-24 scale-110"
          />
        </div>

        {/* Title */}
        <h1 className="hidden md:block absolute w-full text-center left-1/2 transform -translate-x-1/2 z-10 text-[#003262] font-semibold tracking-[0.25em] text-md sm:text-lg md:text-lg pointer-events-none">
          CLASSIC CLEAN LAUNDRY
        </h1>

        <h1 className="block md:hidden absolute w-full text-center left-1/2 transform -translate-x-1/2 z-10 text-[#003262] font-semibold tracking-[0.25em] text-sm pointer-events-none">
          <span className="block">CLASSIC CLEAN</span>
          <span className="block">LAUNDRY</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center pr-4">
          <a
            onClick={() => handleScrollOrNavigate()}
            className="text-[#003262] font-medium hover:underline cursor-pointer text-lg"
          >
            Home
          </a>

          <a
            onClick={() => handleScrollOrNavigate("contact")}
            className="text-[#003262] font-medium hover:underline cursor-pointer text-lg"
          >
            Contact
          </a>

          {/* Conditional Button */}
          {customer ? (
            <button
              onClick={handleLogout}
              className="bg-[#003262] text-white px-4 py-2 rounded-full font-medium shadow-md hover:brightness-110 transition text-md"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/order")}
              className="bg-[#003262] text-white px-4 py-2 rounded-full font-medium shadow-md hover:brightness-110 transition text-md"
            >
              Start Order
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="p-2 flex-shrink-0 md:hidden" onClick={() => setMenuOpen(true)}>
          <Menu className="w-7 h-7 text-gray-900" />
        </button>
      </header>

      {/* Mobile Menu */}
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

              {/* Conditional Mobile Button */}
              {customer ? (
                <button
                  onClick={handleLogout}
                  className="mt-2 bg-[#003262] text-white px-4 py-2 rounded-full font-medium shadow hover:brightness-110"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/order")}
                  className="mt-2 bg-[#003262] text-white px-4 py-2 rounded-full font-medium shadow hover:brightness-110"
                >
                  Start Order
                </button>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
