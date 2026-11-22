import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Home,
  LayoutGrid,
  Store,
} from "lucide-react";

import PropertyCard from "../common/PropertyCard";
import properties from "../../data/properties";

/*
  FEATURED PROPERTIES — PREMIUM CAROUSEL

  Features:
  - Royal Blue + Teal design
  - Automatic sliding every 3.5 seconds
  - Pause on hover and keyboard focus
  - Category filters
  - Previous / Next navigation
  - Touch swipe support
  - Responsive property cards
  - Reduced-motion accessibility support
  - Existing property data and routes preserved
*/

const categories = [
  {
    label: "All Properties",
    icon: LayoutGrid,
    test: () => true,
  },
  {
    label: "Residential",
    icon: Home,
    test: (property) =>
      property.type !== "Commercial Space",
  },
  {
    label: "Villas",
    icon: Home,
    test: (property) =>
      /villa/i.test(property.type),
  },
  {
    label: "Apartments",
    icon: Building2,
    test: (property) =>
      /apartment|penthouse/i.test(property.type),
  },
  {
    label: "Commercial",
    icon: Store,
    test: (property) =>
      /commercial/i.test(property.type),
  },
];

export default function FeaturedProperties() {
  const [category, setCategory] = useState(
    "All Properties"
  );

  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  /*
    Filter properties according to selected category.
  */
  const filtered = useMemo(() => {
    const selected = categories.find(
      (item) => item.label === category
    );

    return properties.filter(selected.test);
  }, [category]);

  /*
    Update carousel navigation state.
  */
  const updateArrows = useCallback(() => {
    const element = trackRef.current;

    if (!element) return;

    setCanPrev(element.scrollLeft > 5);

    setCanNext(
      element.scrollLeft + element.clientWidth <
      element.scrollWidth - 5
    );
  }, []);

  /*
    Move carousel by one card.

    Automatically returns to the first card
    when the carousel reaches its end.
  */
  const slide = useCallback((direction = 1) => {
    const element = trackRef.current;

    if (!element || element.children.length === 0) {
      return;
    }

    const firstCard = element.children[0];

    const gap =
      parseFloat(
        getComputedStyle(element).columnGap
      ) || 24;

    const step =
      firstCard.getBoundingClientRect().width + gap;

    const end =
      element.scrollWidth - element.clientWidth;

    if (
      direction > 0 &&
      element.scrollLeft >= end - 8
    ) {
      element.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else if (
      direction < 0 &&
      element.scrollLeft <= 8
    ) {
      element.scrollTo({
        left: end,
        behavior: "smooth",
      });
    } else {
      element.scrollBy({
        left: step * direction,
        behavior: "smooth",
      });
    }
  }, []);

  /*
    Start automatic sliding only when
    the section is visible on screen.
  */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /*
    Reset carousel position when category changes.
  */
  useEffect(() => {
    const element = trackRef.current;

    element?.scrollTo({
      left: 0,
      behavior: "instant",
    });

    updateArrows();
  }, [category, updateArrows]);

  /*
    Auto-slide every 3.5 seconds.

    Pause when:
    - Mouse is hovering
    - Keyboard focus is inside carousel
    - Section is not visible
    - Reduced motion is preferred
  */
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      paused ||
      !visible ||
      reduceMotion ||
      filtered.length < 2
    ) {
      return;
    }

    timerRef.current = window.setInterval(() => {
      slide(1);
    }, 3500);

    return () => {
      window.clearInterval(timerRef.current);
    };
  }, [
    paused,
    visible,
    filtered.length,
    slide,
  ]);

  /*
    Update navigation buttons on resize.
  */
  useEffect(() => {
    const handleResize = () => {
      updateArrows();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [updateArrows]);

  return (
    <section
      ref={sectionRef}
      id="featured-properties-section"
      className="
        relative z-10 overflow-hidden
        rounded-t-[2.5rem]
        border-t border-[#D6E3EC]
        bg-[#F3F8FC]/95
        text-[#142D46]
        shadow-[0_-25px_60px_-15px_rgba(18,59,104,0.15)]
        backdrop-blur-xl
        rounded-t-[2.5rem] md:rounded-t-[3.5rem]
        py-14 sm:py-16 md:py-20
      "
    >
      {/* Decorative teal glow */}
      <div
        className="
          pointer-events-none
          absolute -right-36 top-0
          h-96 w-96
          rounded-full
          bg-[#00A6A0]/[0.07]
          blur-3xl
        "
      />

      <div
        className="
          relative mx-auto
          max-w-[1600px]
          px-5 sm:px-8 lg:px-12
        "
      >
        {/* SECTION HEADING */}
        <div
          className="
            mb-8 flex flex-col
            justify-between gap-5
            lg:flex-row lg:items-end
          "
        >
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span
                className="
                  text-xs font-bold uppercase
                  tracking-[0.22em]
                  text-[#008B86]
                "
              >
                Featured Properties
              </span>

              <span
                className="
                  h-px w-14
                  bg-[#00A6A0]
                "
              />
            </div>

            <h2
              className="
                font-serif
                text-3xl font-bold
                leading-tight
                text-[#123B68]
                sm:text-4xl lg:text-5xl
              "
            >
              Explore Our Premium Properties
            </h2>

            <p
              className="
                mt-3 text-sm leading-relaxed
                text-[#526579]
                sm:text-base
              "
            >
              Handpicked spaces that blend modern
              living with long-term value.
            </p>
          </div>

          <Link
            to="/properties"
            className="
              inline-flex w-fit shrink-0
              items-center gap-2
              rounded-full
              border border-[#123B68]
              px-5 py-3
              text-sm font-semibold
              text-[#123B68]
              transition-all duration-300
              hover:border-[#00A6A0]
              hover:bg-[#123B68]
              hover:text-white
            "
          >
            View All Properties

            <ArrowUpRight
              size={17}
              className="text-[#00A6A0]"
            />
          </Link>
        </div>

        {/* CATEGORY FILTERS */}
        <div
          className="
            mb-8 flex flex-wrap
            items-center gap-2.5
          "
          role="group"
          aria-label="Filter featured properties"
        >
          {categories.map((item) => {
            const Icon = item.icon;

            const active =
              category === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  setCategory(item.label)
                }
                aria-pressed={active}
                className={`
                  inline-flex items-center gap-2
                  rounded-full border
                  px-4 py-2.5
                  text-xs font-semibold
                  transition-all duration-300
                  sm:text-sm
                  ${active
                    ? `
                        border-[#123B68]
                        bg-[#123B68]
                        text-white
                        shadow-md
                      `
                    : `
                        border-[#D6E3EC]
                        bg-white
                        text-[#123B68]
                        hover:border-[#00A6A0]
                        hover:text-[#008B86]
                        hover:shadow-sm
                      `
                  }
                `}
              >
                <Icon size={16} />

                {item.label}
              </button>
            );
          })}
        </div>

        {/* CAROUSEL WRAPPER */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget
              )
            ) {
              setPaused(false);
            }
          }}
        >
          {/* SLIDING PROPERTY CARDS */}
          <div
            ref={trackRef}
            onScroll={updateArrows}
            aria-label="Property carousel"
            className="
              flex snap-x snap-mandatory
              gap-5
              overflow-x-auto
              px-1 pb-10 pt-3
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              sm:gap-6
            "
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {filtered.map((property) => (
              <div
                key={property.id}
                className="
                  w-[88%]
                  shrink-0 snap-start
                  sm:w-[calc((100%-24px)/2)]
                  lg:w-[calc((100%-48px)/3)]
                  xl:w-[calc((100%-72px)/4)]
                "
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* CAROUSEL CONTROLS */}
          <div
            className="
              mt-1 flex items-center
              justify-between gap-4
            "
          >
            <p className="text-xs text-[#657B91]">
              Swipe or use arrows to explore{" "}
              {filtered.length} properties
            </p>

            <div className="flex items-center gap-2">
              {/* PREVIOUS */}
              <button
                type="button"
                onClick={() => slide(-1)}
                disabled={
                  filtered.length < 2 || !canPrev
                }
                aria-label="Previous properties"
                className="
                  grid h-11 w-11
                  place-items-center
                  rounded-full
                  border border-[#D6E3EC]
                  bg-white
                  text-[#123B68]
                  transition-all duration-300
                  hover:border-[#00A6A0]
                  hover:bg-[#123B68]
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <ArrowLeft size={18} />
              </button>

              {/* NEXT */}
              <button
                type="button"
                onClick={() => slide(1)}
                disabled={
                  filtered.length < 2 || !canNext
                }
                aria-label="Next properties"
                className="
                  grid h-11 w-11
                  place-items-center
                  rounded-full
                  bg-[#123B68]
                  text-white
                  transition-all duration-300
                  hover:bg-[#00A6A0]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
