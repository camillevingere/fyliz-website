"use client";
import { headerMenuItems } from "@/data/menu";
import { siteConfig } from "@/lib/config";
import { closeMobileMenu } from "@/utlis/toggleMobileMenu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function MobileMenu() {
  const pathname = usePathname();
  const elementRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current && // Check if click is inside #mobileMenu
        containerRef.current.contains(event.target) &&
        elementRef.current && // Check if click is outside .gt-menu-area
        !elementRef.current.contains(event.target)
      ) {
        closeMobileMenu();
        // Add your custom logic here
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  const isMenuActive = (href) => {
    return pathname.split("/")[1] === href?.split("/")[1];
  };
  return (
    <div
      ref={containerRef}
      id="uc-menu-panel"
      data-uc-offcanvas="overlay: true;"
      className="uc-offcanvas mobile-menu"
      style={{ display: "block" }}
      tabIndex={-1}
    >
      <div
        ref={elementRef}
        className="uc-offcanvas-bar bg-white text-dark dark:bg-gray-900 dark:text-white uc-offcanvas-bar-animation uc-offcanvas-slide "
        role="dialog"
        aria-modal="true"
        style={{ maxWidth: 876 }}
      >
        <header className="uc-offcanvas-header hstack justify-between items-center pb-2 bg-white dark:bg-gray-900">
          <div className="uc-logo">
            <Link href={`/`} className="panel text-none" style={{ width: 140 }}>
              <Image
                className="text-tertiary dark:text-primary"
                alt="Fyliz"
                src="/assets/images/logo.webp"
                width={60}
                height={60}
              />
            </Link>
          </div>
          <button
            className="uc-offcanvas-close rtl:end-auto rtl:start-0 m-1 mt-2 icon-3 btn border-0 dark:text-white dark:text-opacity-50 hover:text-primary hover:rotate-90 duration-150 transition-all"
            type="button"
            onClick={closeMobileMenu}
          >
            <i className="unicon-close" />
          </button>
        </header>
        <div className="panel">
          <ul className="nav-y gap-narrow fw-medium fs-6 uc-nav" data-uc-nav="">
            {headerMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  className={isMenuActive(item.href) ? "menuActive" : ""}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="hr opacity-10 my-1" />
            <li>
              <a
                href={siteConfig.cta.buttonLink}
                className="hero-cta-btn btn btn-md xl:btn-lg btn-primary border border-dark dark:border-white dark:border-opacity-15 rounded-pill w-100 justify-center"
              >
                <span className="hero-cta-text">
                  {siteConfig.cta.buttonText}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
