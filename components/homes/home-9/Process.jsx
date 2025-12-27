import { cards } from "@/data/process";
import Image from "next/image";

export default function Process() {
  return (
    <div id="how_it_works" className="how-it-works section panel">
      <div className="section-outer panel">
        <div className="container lg:max-w-lg">
          <div className="section-inner panel">
            <div
              className="row child-cols-6 lg:child-cols g-2 col-match"
              data-anime="targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 500});"
            >
              {cards.map((card, index) => (
                <div key={index}>
                  <div
                    className="vstack items-start justify-between gap-2 lg:gap-4 p-2 xl:p-3 min-h-200px border border-dark text-dark rounded-1-5 shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      background:
                        "linear-gradient(45deg, rgba(255, 120, 26, 0.15) 0%, rgba(255, 255, 255, 0) 100%)",
                    }}
                  >
                    <span className="icon mb-narrow w-48px h-48px cstack bg-primary border border-dark rounded-default">
                      <Image
                        className="w-30px text-white"
                        alt={card.alt}
                        src={card.src}
                        width={30}
                        height={30}
                        data-uc-svg=""
                      />
                    </span>
                    <span className="fs-6 fw-bold mb-narrow text-inherit">
                      {card.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
