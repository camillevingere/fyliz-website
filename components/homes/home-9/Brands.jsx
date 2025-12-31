import { brands6 } from "@/data/brands";
import Image from "next/image";

export default function Brands() {
  return (
    <div
      id="chiffres_cles"
      className="companies-sponsores section panel overflow-hidden"
    >
      <div className="section-outer panel py-6 lg:py-8 xl:py-9">
        <div className="container sm:max-w-lg">
          <div className="section-inner panel">
            {/* Section Logos Partenaires */}
            <div
              className="brands panel vstack gap-3 sm:gap-4 text-center"
              data-anime="onview: -200; translateY: [-16, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: 400;"
            >
              <p className="fs-6 m-0 opacity-70">
                Des secteurs variés nous font confiance pour leur transformation
                avec l&apos;IA
              </p>
              <div className="panel">
                <div className="row child-cols items-center text-center mt-4">
                  {brands6.map((brand, index) => (
                    <div key={index}>
                      <div className="panel">
                        <Image
                          className="max-w-90px lg:max-w-120px transition-all"
                          alt={brand.alt}
                          src={brand.src}
                          width={brand.width}
                          height={brand.height}
                          data-uc-svg=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
