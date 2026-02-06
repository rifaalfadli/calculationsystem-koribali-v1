import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Calculator,
  BarChart2,
  ChevronLeft,
  Menu,
  User,
  Bell,
  X,
  LogOut,
  Settings,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Pole Calculation", icon: Calculator, path: "/calculation" },
  { name: "Data Reports", icon: BarChart2, path: "/report" },
];

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({ name: "User", email: "" });

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const currentTitle =
    menuItems.find((item) => item.path === location.pathname)?.name ||
    "Project";

  // Load User Session
  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      setUserData(JSON.parse(session));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">
      {/* --- LOGOUT MODAL --- */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl max-w-sm w-full border border-slate-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
                  <AlertCircle size={28} />
                </div>
                <h2
                  className="
                    text-center font-semibold
                    text-sm sm:text-base
                    text-gray-900
                    mb-1 sm:mb-2
                  "
                >
                  Confirm Logout
                </h2>
                <p
                  className="
                    text-center text-gray-600
                    text-xs sm:text-sm
                    mb-4 sm:mb-6
                    leading-relaxed
                  "
                >
                  Are you sure you want to end your current session?
                </p>
                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="
                      flex-1
                      py-2 sm:py-3 px-4 font-bold
                      text-xs sm:text-sm
                      text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors
                      rounded-md sm:rounded-lg
                    "
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1
                      py-2 sm:py-3 px-4 font-bold
                      text-xs sm:text-sm
                      text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-200
                      rounded-md sm:rounded-lg
                    "
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SIDEBAR MOBILE --- */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={springTransition}
              className="fixed top-0 left-0 bottom-0 w-[260px] bg-[#0d3b66] text-white z-[101] flex flex-col shadow-2xl"
            >
              <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center p-1">
                    <img
                      src="/images/logo-koribali.png"
                      alt="Logo"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-black tracking-tight uppercase text-base">
                    KORI BALI
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 text-white/70 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1 mt-4 relative">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`relative flex items-center justify-between px-3 h-11 rounded-lg transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavMobile"
                          className="absolute inset-0 bg-white/20 rounded-lg z-0"
                          transition={springTransition}
                        />
                      )}
                      <div className="flex items-center gap-3 relative z-10">
                        <item.icon size={20} />
                        <span className="font-semibold text-[14px]">
                          {item.name}
                        </span>
                      </div>
                      {isActive && (
                        <div className="relative flex items-center justify-center w-3 h-3 z-10">
                          <motion.div
                            animate={{
                              scale: [1, 1.8, 1],
                              opacity: [0.4, 0, 0.4],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0 bg-white rounded-full"
                          />
                          <motion.div
                            layoutId="activeDotMobile"
                            className="w-1.5 h-1.5 bg-white rounded-full relative z-10 shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                            transition={springTransition}
                          />
                        </div>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- SIDEBAR DESKTOP (Sticky Mode) --- */}
      {!isMobile && (
        <motion.div
          animate={{ width: isCollapsed ? 72 : 240 }}
          transition={springTransition}
          className="sticky top-0 h-screen bg-[#0d3b66] text-white flex flex-col shadow-xl z-50 shrink-0"
        >
          <div
            className={`flex items-center border-b border-white/10 h-20 ${isCollapsed ? "justify-center px-0" : "px-5 gap-3"}`}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 p-1">
              <img
                src="/images/logo-koribali.png"
                alt="Logo"
                className="object-contain"
              />
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-black tracking-tight uppercase text-lg whitespace-nowrap"
              >
                KORI BALI
              </motion.span>
            )}
          </div>
          <nav className="flex-1 p-3 space-y-2 mt-4 relative">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center rounded-lg h-11 transition-colors duration-300 ${
                    isCollapsed ? "justify-center px-0" : "justify-between px-3"
                  } ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDesktop"
                      className="absolute inset-0 bg-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-lg z-0"
                      transition={springTransition}
                    />
                  )}
                  <div
                    className={`flex items-center relative z-10 ${isCollapsed ? "" : "gap-3"}`}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-semibold text-[14px] whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </div>
                  {isActive && !isCollapsed && (
                    <div className="relative flex items-center justify-center w-3 h-3 z-10">
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-white rounded-full"
                      />
                      <motion.div
                        layoutId="activeDotDesktop"
                        className="w-1.5 h-1.5 bg-white rounded-full relative z-10 shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                        transition={springTransition}
                      />
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center h-12 border-t border-white/10 hover:bg-white/5 text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft
              size={18}
              className={`transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </motion.div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-4 lg:px-8 justify-between">
          <div className="flex items-center gap-2">
            {isMobile && (
              <button
                onClick={() => setIsMobileOpen(true)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Menu size={20} />
              </button>
            )}
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentTitle}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-[14px] tracking-wide font-bold text-slate-800 uppercase md:text-base md:tracking-wider"
              >
                {currentTitle}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-[#0d3b66] transition-all">
              <Bell size={18} />
            </button>
            <div className="h-4 w-px bg-slate-200 mx-1" />

            {/* PROFILE SECTION */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <p className="text-[12px] font-semibold text-slate-800 hidden sm:block">
                  {userData.name}
                </p>
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all border ${isProfileOpen ? "bg-[#0d3b66] text-white border-[#0d3b66]" : "bg-slate-100 text-[#0d3b66] border-slate-200 group-hover:bg-[#0d3b66] group-hover:text-white"}`}
                >
                  <User size={16} />
                </div>
              </div>

              {/* PROFILE DROPDOWN */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="
                      absolute right-0 mt-3 w-64
                      hp:w-56 hp:mt-2
                      bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)]
                      border border-slate-100
                      py-4 px-2 hp:py-3 hp:px-1.5
                      z-50 overflow-hidden
                    "
                  >
                    {/* HEADER */}
                    <div className="px-4 pb-4 mb-2 border-b border-slate-50 hp:px-3 hp:pb-3">
                      <div className="flex items-center gap-3 hp:gap-2">
                        <div className="relative group">
                          <div
                            className="
                              w-11 h-11 hp:w-9 hp:h-9
                              rounded-xl bg-gradient-to-br from-[#0d3b66] to-[#1a5a92]
                              flex items-center justify-center
                              text-white font-black text-base hp:text-sm
                              shadow-lg shadow-blue-900/20
                            "
                          >
                            {userData.name.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 hp:w-3 hp:h-3 bg-green-500 border-2 border-white rounded-full" />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <p className="text-sm hp:text-[13px] font-semibold text-slate-800 leading-none truncate">
                            {userData.name}
                          </p>
                          <p className="text-[10px] hp:text-[9px] text-slate-400 font-bold mt-1.5 hp:mt-1 truncate">
                            {userData.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MENU */}
                    <div className="space-y-1 hp:space-y-2 hp:px-2">
                      <button
                        className="
                          w-full flex items-center gap-3 hp:gap-2
                          px-3 py-2.5 hp:px-2.5 hp:py-1.5
                          text-slate-600 bg-blue-50 hover:bg-blue-100
                          rounded-xl hp:rounded-lg transition-all group
                        "
                      >
                        <div
                          className="
                            w-8 h-8 hp:w-7 hp:h-7
                            rounded-lg bg-slate-50
                            flex items-center justify-center
                            text-slate-400
                            group-hover:text-[#0d3b66]
                            group-hover:bg-white
                            border border-transparent
                            group-hover:border-slate-100
                            transition-all
                          "
                        >
                          <Settings size={14} />
                        </div>
                        <span className="text-[12px] hp:text-[11px] font-semibold tracking-wide truncate">
                          Account Settings
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          setShowLogoutModal(true);
                        }}
                        className="
                          w-full flex items-center gap-3 hp:gap-2
                          px-3 py-2.5 hp:px-2.5 hp:py-1.5
                          text-red-500 bg-red-50 hover:bg-red-100
                          rounded-xl hp:rounded-lg transition-all group
                        "
                      >
                        <div
                          className="
                            w-8 h-8 hp:w-7 hp:h-7
                            rounded-lg bg-slate-50
                            flex items-center justify-center
                            text-red-400
                            group-hover:text-red-500
                            group-hover:bg-white
                            border border-transparent
                            group-hover:border-red-100
                            transition-all
                          "
                        >
                          <LogOut size={14} />
                        </div>
                        <span className="text-[12px] hp:text-[11px] font-semibold tracking-wide truncate">
                          Logout Session
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>

        <footer className="py-4 px-6 lg:px-8 border-t border-slate-200 text-center lg:text-left text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} KORI BALI &bull; Pole Structure
          Calculation System
        </footer>
      </div>
    </div>
  );
}
