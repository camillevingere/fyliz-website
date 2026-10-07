// next/font/google plante sous Turbopack (Next 15.2) : on charge la feuille Google Fonts directement.
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Funnel+Display:wght@500;600;700&family=Funnel+Sans:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@1&display=swap";

export default function Fonts() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS_URL} precedence="default" />
    </>
  );
}
