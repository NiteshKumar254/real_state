import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingEnquiry from '../common/FloatingEnquiry';
import BackToTop from '../common/BackToTop';
import ScrollToTop from './ScrollToTop';

export default function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-offwhite selection:bg-luxury-gold selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingEnquiry />
      <BackToTop />
    </div>
  );
}
