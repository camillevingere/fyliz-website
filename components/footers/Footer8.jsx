"use client";
import { footerLinks6 } from "@/data/footer";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export default function Footer8() {
  return (
    <footer id="uc-footer" className="uc-footer panel overflow-hidden">
      <div className="footer-outer py-6 lg:py-8 xl:py-9 lg:m-2 lg:rounded-2 bg-secondary dark:bg-tertiary-700 border border-secondary dark:border-white dark:border-opacity-15">
        <div className="uc-footer-content">
          <div className="container xl:max-w-xl">
            <div className="uc-footer-inner vstack gap-4 lg:gap-6 xl:gap-8">
              <div className="uc-footer-widgets panel">
                <div className="row child-cols-6 md:child-cols col-match g-4">
                  <div className="col-12">
                    <div className="panel vstack items-center gap-1 max-w-400px lg:max-w-750px mx-auto text-center mb-6 xl:mb-8">
                      <div className="mb-2 lg:mb-3">
                        <a
                          href="#"
                          className="btn btn-md xl:btn-lg btn-primary border border-dark dark:border-white dark:border-opacity-15 px-3 lg:px-5 w-auto rounded-pill"
                          onClick={() => {
                            posthog.capture("cta_clicked", {
                              cta_name: "Consultation stratégique (offerte)",
                              page: window.location.pathname,
                            });
                          }}
                        >
                          <span>{siteConfig.cta.buttonText}</span>
                        </a>
                      </div>
                      <div className="vstack sm:hstack justify-center gap-1 fs-6 text-gray-900 dark:text-white flex-row md-flex-column">
                        <div className="hstack justify-center gap-2">
                          <b>Super</b>
                          <div className="rating panel">
                            <div className="hstack justify-center gap-narrow">
                              <i
                                className="icon unicon-star-filled text-white p-narrow"
                                style={{
                                  backgroundColor: siteConfig.brand.primary,
                                }}
                              />
                              <i
                                className="icon unicon-star-filled text-white p-narrow"
                                style={{
                                  backgroundColor: siteConfig.brand.primary,
                                }}
                              />
                              <i
                                className="icon unicon-star-filled text-white p-narrow"
                                style={{
                                  backgroundColor: siteConfig.brand.primary,
                                }}
                              />
                              <i
                                className="icon unicon-star-filled text-white p-narrow"
                                style={{
                                  backgroundColor: siteConfig.brand.primary,
                                }}
                              />
                              <i
                                className="icon unicon-star-filled text-white p-narrow"
                                style={{
                                  backgroundColor: siteConfig.brand.primary,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="hstack justify-center gap-narrow">
                          <span className="desc rtl:order-first">
                            +50 entreprises satisfaites
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 lg:col-6">
                    <div className="panel vstack items-start gap-3 xl:gap-4 lg:max-w-1/2">
                      <div>
                        <Link
                          className="panel text-none"
                          href={`/`}
                          style={{ width: 140 }}
                        >
                          <Image
                            className="text-tertiary dark:text-primary"
                            alt="Fyliz"
                            src="/assets/images/logo.webp"
                            width={60}
                            height={60}
                          />
                        </Link>
                        <p className="mt-2">
                          Automatisez vos tâches répétitives avec l&apos;IA et
                          libérez 40h/mois par employé.
                        </p>
                      </div>
                    </div>
                  </div>
                  {footerLinks6.map((section, index) => (
                    <div key={index} className={section.className || ""}>
                      <ul className="nav-y gap-2 fw-medium dark:text-white">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            {link.isLink ? (
                              <Link href={link.href}>{link.text}</Link>
                            ) : (
                              <a href={link.href}>{link.text}</a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="uc-footer-bottom panel vstack lg:hstack gap-4 justify-between text-center pt-4 lg:pt-6 mt-6 border-top">
                <p>Fyliz © {new Date().getFullYear()}, Tous droits réservés.</p>
                <ul className="nav-x justify-center gap-2">
                  {siteConfig.footer
                    .find((section) => section.title === "Social")
                    ?.links.map((link, index) => {
                      const iconMap = {
                        Youtube: "unicon-logo-youtube",
                        LinkedIn: "unicon-logo-linkedin",
                        Twitter: "unicon-logo-x-filled",
                        Facebook: "unicon-logo-facebook",
                        Instagram: "unicon-logo-instagram",
                      };
                      return (
                        <li key={index}>
                          <a
                            className="duration-150 hover:text-primary"
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.text}
                          >
                            <i
                              className={`icon icon-2 ${iconMap[link.text]}`}
                            />
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
