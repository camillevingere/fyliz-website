import { features11 } from "@/data/features";
import Image from "next/image";
import Link from "next/link";

export default function Solutions() {
  return (
    <div
      id="key_features"
      className="key-features section panel overflow-hidden"
    >
      <div className="section-outer panel py-6 md:py-8 xl:py-10">
        <div className="container sm:max-w-lg">
          <div className="section-inner panel vstack items-center gap-4 lg:gap-6 xl:gap-8">
            <div
              className="panel vstack items-center gap-2 xl:gap-3 sm:max-w-600px lg:max-w-700px mx-auto text-center"
              data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
            >
              <span
                className="fs-7 fw-medium py-narrow px-2 text-white rounded-pill"
                style={{ backgroundColor: "#ffd7b8" }}
              >
                🎯 Notre expertise complète
              </span>
              <h2 className="h3 lg:h1 m-0">
                <strong style={{ color: "#ff781a" }}>Automatisations IA</strong>{" "}
                sur-mesure
              </h2>
              <p className="fs-6 xl:fs-5 xl:px-8">
                Fyliz accompagne +50 entreprises avec une approche 100%
                personnalisée. De l&apos;audit initial au déploiement, nous
                automatisons vos processus pour libérer jusqu&apos;à 40h/mois
                par employé.
              </p>
            </div>
            <div
              className="features-items row child-cols-12 sm:child-cols-6 g-2 col-match"
              data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 400});"
            >
              {features11.map((feature, index) => (
                <div key={index} className={feature.order}>
                  <div className="features-item hstack items-start gap-2 lg:gap-4 p-2 lg:p-4 py-4 lg:py-6 bg-white dark:bg-gradient-45 from-tertiary to-transparent border border-dark dark:border-white dark:border-opacity-15 rounded-1-5 hover:shadow-lg transition-shadow duration-300">
                    <div className="icon-box cstack rounded w-1/3">
                      <Image
                        className="min-w-40px max-w-40px"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(47%) sepia(95%) saturate(2456%) hue-rotate(360deg) brightness(102%) contrast(103%)",
                        }}
                        alt={feature.alt}
                        src={feature.src}
                        width={24}
                        height={24}
                        data-uc-svg=""
                      />
                    </div>
                    <div className="panel">
                      <div className="vstack gap-1">
                        <h3
                          className="title h6 lg:h5 m-0"
                          style={{ color: "#ff781a" }}
                        >
                          {feature.title}
                        </h3>
                        <p className="desc fs-6 text-gray-700 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-2 lg:mb-3">
              <Link
                href="/solutions-automatisation-ia"
                className="btn btn-md xl:btn-lg btn-primary border border-dark dark:border-white dark:border-opacity-15 px-3 lg:px-5 w-auto rounded-pill"
                data-anime="onview: -100; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: 500;"
              >
                <span>Découvrir toutes nos solutions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
