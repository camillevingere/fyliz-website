import { siteConfig } from "@/lib/config";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Couleurs de la landing (landing.module.scss).
const paper = "#f7f3ec";
const ink = "#17130f";
const ink2 = "#4a433c";
const orange = "#ff781a";

const defaultTitle = "Ton équipe IA externalisée : agents IA et automatisation";

export async function GET(req: NextRequest) {
  const title = (req.nextUrl.searchParams.get("title") || defaultTitle).slice(0, 140);
  const fontData = await fetch(
    new URL("../../public/assets/fonts/Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: paper,
          color: ink,
          borderBottom: `16px solid ${orange}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 36 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: orange,
              marginRight: 16,
            }}
          />
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 56 : 68,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: ink2 }}>
          fyliz.com · Agents IA et automatisation pour les PME
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: fontData, style: "normal", weight: 600 }],
    }
  );
}
