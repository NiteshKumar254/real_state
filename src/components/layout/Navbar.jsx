import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import siteConfig from '../../data/siteConfig';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Properties', path: '/properties' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'How We Work', path: '/how-we-work' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Detect scroll immediately
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle body scroll and Escape key
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Navbar appearance
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      {/* ================= MAIN NAVBAR ================= */}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-100 ease-out ${isTransparent
          ? 'bg-transparent max-md:bg-gradient-to-b max-md:from-black/45 max-md:via-black/20 max-md:to-transparent border-b border-white/10 shadow-none text-white'
          : 'bg-white border-b border-gray-200 shadow-md text-darkheading'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 max-md:px-4 flex items-center justify-between py-4 max-md:py-3.5">

          {/* BRAND LOGO & COMPANY NAME */}

          <Link to="/" className="flex items-center gap-3">

            {/* Compass Logo */}

            <div
              className="w-10 h-10 max-md:w-9 max-md:h-9 max-md:rounded-lg rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: isTransparent ? '#00AFA5' : '#153B65'
              }}
            >
              <Compass
                className="w-5 h-5 max-md:w-4.5 max-md:h-4.5"
                color="#FFFFFF"
                strokeWidth={2}
              />
            </div>

            {/* Company Name & Tagline */}

            <div>

              <span
                className="block text-xl max-md:text-[17px] font-serif font-bold tracking-wider uppercase transition-colors duration-100"
                style={{
                  color: isTransparent ? '#FFFFFF' : '#153B65'
                }}
              >
                {siteConfig.name}
              </span>

              <span
                className="block text-[10px] tracking-[0.25em] max-md:tracking-[0.14em] max-[359px]:hidden uppercase font-medium transition-colors duration-100"
                style={{
                  color: isTransparent ? '#DBEAFE' : '#64748B'
                }}
              >
                {siteConfig.tagline}
              </span>

            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-100 group ${isActive
                    ? 'text-teal'
                    : isTransparent
                      ? 'text-darkheading hover:text-royal'
                      : 'text-darkheading hover:text-royal'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>

                    {/* Active Underline */}

                    <span
                      className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-teal rounded-full transition-all duration-200 origin-left ${isActive
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75'
                        }`}
                    />
                  </>
                )}
              </NavLink>
            ))}

          </nav>

          {/* ================= DESKTOP ENQUIRE BUTTON ================= */}

          <div className="hidden lg:flex items-center gap-4">

            <Link
              to="/enquire"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal text-white font-semibold text-xs tracking-wider uppercase hover:bg-teal-hover transition-colors duration-200 shadow-md"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 max-md:p-2.5 max-md:min-w-[44px] max-md:min-h-[44px] flex items-center justify-center transition-colors duration-100 focus:outline-none ${isTransparent
              ? 'text-white hover:text-teal'
              : 'text-darkheading hover:text-teal'
              }`}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-teal" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-royal-deep/75 backdrop-blur-md lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}

      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-xs max-md:w-[min(88vw,380px)] max-md:max-w-none max-md:h-[100dvh] max-md:overscroll-contain overflow-y-auto bg-royal-deep border-l border-white/10 p-6 max-md:p-5 flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden ${mobileMenuOpen
          ? 'translate-x-0'
          : 'translate-x-full'
          }`}
      >

        <div>

          {/* Drawer Header */}

          <div className="flex items-center justify-between pb-6 border-b border-white/10">

            <span className="font-serif text-lg max-md:text-[18px] font-bold text-white tracking-wider">
              {siteConfig.name}
            </span>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 max-md:min-w-[44px] max-md:min-h-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-teal" />
            </button>

          </div>

          {/* Mobile Navigation */}

          <nav className="py-6 flex flex-col space-y-1">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-3 max-md:py-3.5 max-md:min-h-[52px] flex items-center max-md:text-[17px] rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors ${isActive
                    ? 'bg-teal/20 text-teal'
                    : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

          </nav>

        </div>

        {/* Mobile CTA */}

        <div className="pt-6 max-md:pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] border-t border-white/10 space-y-3">

          <Link
            to="/enquire"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 max-md:min-h-[48px] rounded-full bg-teal text-white font-semibold text-xs max-md:text-sm tracking-wider uppercase hover:bg-teal-hover transition-colors"
          >
            <span>Enquire Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <p className="text-[11px] max-md:text-[13px] text-center text-blue-100/70">
            Concierge: {siteConfig.contact.phoneDisplay}
          </p>

        </div>

      </div>
    </>
  );
}
