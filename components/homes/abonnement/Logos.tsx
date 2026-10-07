import { brands6 } from "@/data/brands";
import Image from "next/image";
import s from "./landing.module.scss";

export default function Logos() {
  // Chaque piste répète les logos pour dépasser la largeur des grands écrans,
  // puis elle est dupliquée pour que la boucle du défilement soit continue.
  const tracks = [0, 1];
  const logos = [...brands6, ...brands6, ...brands6];

  return (
    <section className={s.logos} aria-label="Ils nous font confiance">
      <p className={`${s.eyebrow} ${s.logosLabel}`} style={{ display: "block" }}>
        Ils nous ont confié leurs automatisations
      </p>
      <div className={s.marquee}>
        {tracks.map((track) => (
          <div key={track} className={s.marqueeTrack} aria-hidden={track === 1}>
            {logos.map((brand, index) => (
              <Image
                key={`${brand.alt}-${index}`}
                src={brand.src}
                alt={track === 0 && index < brands6.length ? brand.alt : ""}
                width={brand.width * 2}
                height={brand.height * 2}
                loading="eager"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
