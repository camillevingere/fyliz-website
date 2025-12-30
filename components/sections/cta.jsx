import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function CtaSection() {
  return (
    <div className="my-16">
      <div className="mx-auto max-w-[900px] rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-10 text-center text-white shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          {siteConfig.cta.title}
        </h2>
        <p className="text-white/80 mb-5">
          Profitez de notre offre et échangeons sur vos automatisations.
        </p>
        <Link
          href={siteConfig.cta.buttonLink}
          className="inline-flex items-center justify-center rounded-full bg-white text-orange-600 px-5 py-2 font-semibold shadow-sm hover:shadow-md transition"
        >
          {siteConfig.cta.buttonText}
        </Link>
        <p className="text-sm text-white/80 mt-2">Offert</p>
      </div>
    </div>
  );
}

