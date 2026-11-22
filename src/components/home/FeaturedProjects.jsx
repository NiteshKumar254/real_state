import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from '../common/ProjectCard';
import RevealOnScroll from '../common/RevealOnScroll';
import projects from '../../data/projects';

/**
 * FeaturedProjects
 * Section in Ice White (#F3F8FC)
 * - Project cards in Pure White (#FFFFFF)
 */
export default function FeaturedProjects() {
  const displayProjects = projects.slice(0, 2);

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-ice/90 backdrop-blur-md relative z-10 text-darkheading border-t border-ice-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            eyebrow="ARCHITECTURAL LANDMARKS"
            title="Spaces That Define Tomorrow."
            subtitle="Iconic residential compounds and flagship commercial developments setting new standards in South India."
            className="mb-0"
          />

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-teal transition-colors group flex-shrink-0"
          >
            <span>Explore All Projects</span>
            <ArrowUpRight className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-8">
          {displayProjects.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 120}>
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
