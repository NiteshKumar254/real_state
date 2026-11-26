import React, { useState } from 'react';
import PageHero from '../components/common/PageHero';
import ProjectCard from '../components/common/ProjectCard';
import SectionHeading from '../components/common/SectionHeading';
import FinalEnquiryCTA from '../components/home/FinalEnquiryCTA';
import projects from '../data/projects';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.status === activeFilter;
  });

  return (
    <div>
      <PageHero
        eyebrow="Landmark Developments"
        title="Spaces That Define Tomorrow."
        subtitle="Explore our ongoing, completed, and upcoming architectural landmarks across South India."
        breadcrumbItems={[{ label: "Projects" }]}
        image="/assets/images/projects/monolith.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 max-md:py-8 bg-ice">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 max-md:px-4">
          
          {/* Status Filter Tabs */}
          <div className="flex flex-nowrap max-md:overflow-x-auto max-md:snap-x max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden max-md:pb-2 flex-wrap items-center justify-center gap-2.5 mb-10 sm:mb-12 max-md:mb-8">
            {['All', 'Completed', 'Ongoing', 'Upcoming'].map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-6 py-2.5 max-md:shrink-0 max-md:snap-start max-md:min-h-[44px] rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === status
                    ? 'bg-royal text-white shadow-md'
                    : 'bg-white text-muted hover:bg-ice border border-ice-border'
                }`}
              >
                {status} Projects
              </button>
            ))}
          </div>

          {/* Project List */}
          <div className="space-y-8 sm:space-y-10">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

        </div>
      </section>

      <FinalEnquiryCTA />
    </div>
  );
}
