import { testimonials5 } from "@/data/testimonials";
import Image from "next/image";
import s from "./landing.module.scss";

export default function Testimonials() {
  return (
    <section id="avis" className={s.section} style={{ paddingTop: 0 }}>
      <div className={s.container}>
        <div className={s.sectionHeadCenter} data-reveal>
          <span className={s.eyebrow}>
            <span className={s.eyebrowDot} />
            Avis clients
          </span>
          <h2 className={s.h2}>
            Ce qu&apos;en disent <span className={s.serif}>nos clients.</span>
          </h2>
        </div>

        <div className={s.testimonials}>
          {testimonials5.filter((item) => item.text).map((item) => (
            <figure key={item.name} className={s.testimonial} data-reveal>
              <blockquote>{item.text}</blockquote>
              <figcaption className={s.testimonialAuthor}>
                <Image src={item.imgSrc} alt="" width={80} height={80} />
                <div>
                  {item.linkedinUrl ? (
                    <a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  ) : (
                    <strong>{item.name}</strong>
                  )}
                  <span>{item.company}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
