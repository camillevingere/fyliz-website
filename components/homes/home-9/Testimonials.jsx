"use client";
import { testimonials5 } from "@/data/testimonials";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const [isViewAll, setIsViewAll] = useState(false);
  const isotopContainer = useRef();
  const isotope = useRef();
  const initIsotop = async () => {
    const Isotope = (await import("isotope-layout")).default;
    const imagesloaded = (await import("imagesloaded")).default;

    // Initialize Isotope in the mounted hook
    isotope.current = new Isotope(isotopContainer.current, {
      itemSelector: ".isotop-element",
      layoutMode: "masonry", // or 'fitRows', depending on your layout needs
    });
    imagesloaded(isotopContainer.current).on("progress", function () {
      // Trigger Isotope layout
      isotope.current.layout();
    });
  };

  useEffect(() => {
    /////////////////////////////////////////////////////
    // Magnate Animation

    initIsotop();
  }, []);
  return (
    <div
      id="avis_clients"
      className="clients-feedbacks section panel overflow-hidden"
    >
      <div
        className="section-outer panel py-6 md:py-8 xl:py-10 mx-2 border rounded-1-5 lg:rounded-2"
        style={{
          backgroundColor: "#fff5ed",
          borderColor: "#ffddcc",
        }}
      >
        <div className="container">
          <div className="section-inner panel">
            <div
              className="panel vstack gap-4"
              data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 450; delay: anime.stagger(100, {start: 200});"
            >
              <div className="section-header vstack items-center gap-2 lg:gap-3">
                <span
                  className="fs-7 fw-medium py-narrow px-2 text-white rounded-pill"
                  style={{ backgroundColor: "#ffd7b8" }}
                >
                  Nos avis
                </span>
                <h2 className="h4 sm:h3 lg:h1 m-0 text-center max-w-650px mx-auto text-dark">
                  Ce que nos{" "}
                  <span style={{ color: "#ff781a" }}>+50 clients actifs</span>{" "}
                  disent de leur transformation !
                </h2>
              </div>
              <div
                id="clients_feedback_area"
                className={
                  !isViewAll
                    ? "panel w-100 max-w-lg mx-auto h-700px overflow-hidden"
                    : "panel w-100 max-w-lg mx-auto overflow-hidden uc-active h-auto"
                }
              >
                <div
                  className="row child-cols-4 md-child-cols-6 sm-child-cols-12 gx-4 gy-0"
                  data-uc-grid="masonry: true;"
                  ref={isotopContainer}
                >
                  {testimonials5.map(
                    ({ text, name, imgSrc, company }, index) => (
                      <div key={index} className={`isotop-element mt-4`}>
                        <div
                          className="px-3 sm:px-4 py-4 panel vstack justify-between gap-3 border rounded-1-5 lg:rounded-2 shadow-sm hover:shadow-md transition-shadow"
                          style={{
                            backgroundColor: "#ffffff",
                            borderColor: "#e5e7eb",
                          }}
                        >
                          <div className="panel vstack items-start gap-2">
                            <p className="fs-6 lg:fs-5 text-gray-900">{text}</p>
                          </div>
                          <div className="panel hstack items-start gap-2 mt-2">
                            <Image
                              className="w-40px rounded-circle !self-start"
                              alt={name}
                              src={imgSrc}
                              width={150}
                              height={150}
                            />
                            <div className="panel vstack justify-center gap-narrow">
                              <ul className="nav-x gap-0">
                                {[...Array(5)].map((_, starIndex) => (
                                  <li key={starIndex}>
                                    <i
                                      className="icon icon-narrow unicon-star-filled p-narrow"
                                      style={{
                                        color: siteConfig.brand.primary,
                                      }}
                                    />
                                  </li>
                                ))}
                              </ul>
                              <span className="fw-bold text-gray-900 m-0">
                                {name}
                              </span>
                              <span className="text-gray-500">{company}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div
                  id="clients-feedback-toggle-area"
                  onClick={() => setIsViewAll((pre) => !pre)}
                  className={
                    !isViewAll
                      ? "position-absolute bottom-0 start-0 end-0 h-300px vstack items-center justify-end z-1"
                      : "bottom-0 start-0 end-0 vstack items-center justify-end z-1 mt-8"
                  }
                  style={{
                    background: !isViewAll
                      ? "linear-gradient(to top, #fff5ed, transparent)"
                      : "transparent",
                  }}
                >
                  <a
                    className="btn border rounded-pill px-3 hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: !isViewAll ? "#ff781a" : "#ffffff",
                      borderColor: !isViewAll ? "#ff781a" : "#e5e7eb",
                      color: !isViewAll ? "#ffffff" : "#111827",
                    }}
                    data-uc-toggle="target: #clients_feedback_area; cls: uc-active"
                  >
                    {isViewAll
                      ? "Masquer les témoignages"
                      : " Voir tous les témoignages"}
                  </a>
                </div>
              </div>
              {/* <div className="panel max-w-700px mx-auto">
                <div
                  className="panel vstack gap-3 sm:gap-4 text-center"
                  data-anime="onview: -200; translateY: [-16, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: 350;"
                >
                  <p className="fs-6 m-0 text-gray-900">
                    Rejoignez +50 entreprises qui ont déjà transformé leur
                    productivité
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
