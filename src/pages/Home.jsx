import React from 'react';
import CinematicBackground from '../components/home/CinematicBackground';
import HeroIntro from '../components/home/HeroIntro';
import AboutPreview from '../components/home/AboutPreview';
import StatsSection from '../components/home/StatsSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FeaturedProperties from '../components/home/FeaturedProperties';
import ServicesPreview from '../components/home/ServicesPreview';
import HowWeWorkPreview from '../components/home/HowWeWorkPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import HomeFAQ from '../components/home/HomeFAQ';
import FinalEnquiryCTA from '../components/home/FinalEnquiryCTA';

/**
 * HOMEPAGE WITH ROYAL BLUE + TEAL + ICE WHITE VISUAL THEME:
 * 1. Fixed Background (z-0): Full-screen Canvas advancing 235 construction frames
 *    smoothly as the user scrolls, locked at completed building at Featured Properties.
 * 2. Cinematic Foreground (z-10): Royal Blue glass panels over active construction.
 * 3. Clean Content Surface: Starting at Featured Properties, an opaque Ice White (#F3F8FC)
 *    architectural surface with subtle top shadow naturally layers over the background,
 *    creating a polished, bright, and cohesive lower homepage.
 */
export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-royal-deep text-white overflow-x-hidden">
      {/* 1. FULL-SCREEN FIXED CONSTRUCTION CANVAS BACKGROUND (z-0) */}
      <CinematicBackground />

      {/* 2. CINEMATIC OVERLAY REGION: Royal Blue glass cards over active construction */}
      <div className="relative z-10 w-full">
        {/* Viewport 1: Hero Intro (Empty land in background) */}
        <HeroIntro />

        {/* Viewport 2: About Preview (Left-aligned Royal Blue glass card) */}
        <AboutPreview />

        {/* Viewport 3: Statistics Section (Translucent glass counters) */}
        <StatsSection />

        {/* Viewport 4: Why Choose Us (Right-aligned feature cards; building near completion) */}
        <WhyChooseUs />
      </div>

      {/* 3. LOWER HOMEPAGE SECTIONS: Translucent atmospheric surfaces over the completed building */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Section 5: Featured Properties (Marks 100% completion of animation!) */}
        <FeaturedProperties />

        {/* Section 6: Services Preview (Frosted White) */}
        <ServicesPreview />

        {/* Section 7: How We Work Process Timeline (Frosted Soft Blue) */}
        <HowWeWorkPreview />

        {/* Section 8: Featured Landmark Projects (Frosted Ice White) */}
        <FeaturedProjects />

        {/* Section 9: Client Testimonials (Frosted Soft Blue) */}
        <Testimonials />

        {/* Section 10: Lifestyle CTA (Frosted Royal Blue) */}
        <CTASection />

        {/* Section 11: Home FAQ Accordion (Frosted White) */}
        <HomeFAQ />

        {/* Section 12: Final Direct Concierge CTA (Frosted Royal Blue Deep) */}
        <FinalEnquiryCTA />
      </div>
    </div>
  );
}
