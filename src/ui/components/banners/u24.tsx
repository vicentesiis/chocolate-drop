"use client";

import type React from "react";

import { animate } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface United24BannerProps {
  animateGradient?: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const United24Banner: React.FC<United24BannerProps> = ({
  animateGradient = true,
  onClose,
  showCloseButton = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<ReturnType<typeof animate>[]>([]);

  const handleClose = () => {
    if (bannerRef.current) {
      // Stop any existing animations
      for (const animation of animationsRef.current) {
        animation.pause();
      }

      // Create close animation
      const animation = animate(bannerRef.current, {
        duration: 500,
        ease: "outQuad",
        height: 0,
        onComplete: () => {
          setIsVisible(false);
          if (onClose) {
            onClose();
          }
        },
        opacity: 0,
        paddingBottom: 0,
        paddingTop: 0,
      });

      // Store the animation reference
      animationsRef.current = [animation];
    }
  };

  useEffect(() => {
    if (!isVisible || !bannerRef.current) return;

    // Clear previous animations
    for (const animation of animationsRef.current) {
      animation.pause();
    }

    // Initialize new animations
    const animations: ReturnType<typeof animate>[] = [];
    const banner = bannerRef.current;

    // Get elements within the banner
    const contentElements = banner.querySelectorAll(".banner-content");
    const logoElements = banner.querySelectorAll(".banner-logo");
    const buttonElements = banner.querySelectorAll(".banner-button");

    // Entrance animation for content
    const contentAnimation = animate(contentElements, {
      delay: (_, i) => i * 100, // Stagger effect
      duration: 800,
      ease: "outExpo",
      opacity: [0, 1],
      translateY: [20, 0],
    });
    animations.push(contentAnimation);

    // Logo animation
    const logoAnimation = animate(logoElements, {
      duration: 1000,
      ease: "outElastic(1, 0.5)",
      opacity: [0, 1],
      rotate: ["-15deg", "0deg"],
      scale: [0.8, 1],
    });
    animations.push(logoAnimation);

    // Button animation
    const buttonAnimation = animate(buttonElements, {
      delay: 100,
      duration: 200,
      ease: "outExpo",
      opacity: [0, 0.9],
    });
    animations.push(buttonAnimation);

    // Ukrainian flag color gradient animation
    if (animateGradient) {
      const gradientAnimation = animate(banner, {
        backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
        duration: 45000,
        ease: "linear",
        loop: true,
      });
      animations.push(gradientAnimation);
    }

    // Store animations for cleanup
    animationsRef.current = animations;

    return () => {
      // Clean up all animations when component unmounts
      for (const anim of animations) {
        anim.pause();
      }
    };
  }, [isVisible, animateGradient]);

  if (!isVisible) return null;

  // Generate background classes or styles based on gradient animation and theme
  const bannerClasses = `w-full border-b border-black/10 dark:border-white/10 relative z-50 overflow-hidden banner-gradient-bg rounded-none md:rounded-xl ${
    !animateGradient ? "bg-[#ffd700] dark:bg-[#0057b7]" : ""
  }`;

  // Determine the background style based on animateGradient prop
  const backgroundStyle = animateGradient
    ? {
        background:
          "linear-gradient(90deg, #0057b7 0%, #0057b7 40%, #ffd700 60%, #ffd700 100%)",
        backgroundSize: "200% 100%",
      }
    : {};

  // Dynamic button class based on gradient animation state
  const buttonClasses = animateGradient
    ? "banner-button bg-[#0057b7] text-[#ffd700] font-bold py-2 px-7 rounded-lg hover:bg-white hover:text-[#0057b7] uppercase opacity-95 hover:opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/70 focus:ring-offset-2"
    : "banner-button bg-[#0057b7] dark:bg-[#ffd700] hover:bg-white dark:hover:bg-white text-[#ffd700] dark:text-blue-800 hover:text-[#0057b7] font-bold py-2 px-7 rounded-lg uppercase opacity-95 hover:opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/70 focus:ring-offset-2";

  // Text color classes based on theme and gradient state
  const textColorClasses = animateGradient
    ? "text-white drop-shadow-sm"
    : "text-blue-800 dark:text-white drop-shadow-sm";

  return (
    <div
      aria-label="Support Ukraine banner"
      className={bannerClasses}
      ref={bannerRef}
      role="banner"
      style={backgroundStyle}
    >
      <div
        className={`
          container mx-auto flex flex-col items-center justify-between gap-4
          px-4 py-4
          md:flex-row md:gap-0
        `}
      >
        <div
          className={`
            banner-content mb-4 flex flex-col items-center gap-3
            md:mb-0 md:flex-row md:gap-5
          `}
        >
          <div
            className={`
              banner-logo relative mb-3 flex-shrink-0
              md:mr-5 md:mb-0
            `}
          >
            {/* Use Image component with different sources based on theme */}
            <Image
              alt="United24 Logo"
              className={`
                block h-auto w-24 rounded-lg shadow
                dark:hidden
              `}
              height={48}
              priority
              src="/u24.svg"
              width={96}
            />
            <Image
              alt="United24 Logo"
              className={`
                hidden h-auto w-24 rounded-lg shadow
                dark:block
              `}
              height={48}
              priority
              src="/u24_white.svg"
              width={96}
            />
          </div>
          <p
            className={`
              banner-content text-center text-base font-semibold
              md:text-left
              ${textColorClasses}
            `}
          >
            Stand with Ukraine. Help fund drones, medkits, and victory. Every
            dollar helps stop{" "}
            <Link
              className={`
                underline underline-offset-4 transition-colors duration-200
                hover:text-[#0057b7]
                dark:hover:text-[#ffd700]
              `}
              href="https://war.ukraine.ua/russia-war-crimes"
              rel="noopener noreferrer"
              target="_blank"
            >
              russia's war crimes
            </Link>{" "}
            and saves lives. Donate now, it matters.
          </p>
        </div>

        <div
          className={`
            banner-content flex items-center gap-2
            md:gap-4
          `}
        >
          <Link
            aria-label="Donate to support Ukraine"
            className={buttonClasses}
            href="https://u24.gov.ua"
            rel="noopener noreferrer"
            target="_blank"
          >
            Donate
          </Link>

          {showCloseButton && (
            <button
              aria-label="Close Ukraine support banner"
              className={`
                banner-content ml-2 rounded-full p-2 opacity-80
                transition-opacity duration-200
                focus:ring-opacity-50 focus:ring-2 focus:ring-current
                focus:outline-none
                hover:opacity-100
                md:ml-4
                ${textColorClasses}
              `}
              onClick={handleClose}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Close</title>
                <path
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default United24Banner;
