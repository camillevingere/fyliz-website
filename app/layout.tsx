import "../public/assets/css/main.scss";
import "../public/assets/custom.scss";

import AnimationHandler from "@/components/common/AnimationHandler";
import BacktoTop from "@/components/common/BacktoTop";
import MobileMenu from "@/components/headers/component/MobileMenu";
import { env } from "@/lib/env";
import { getBootstrapData } from "@/lib/posthog/getBootstrapData";
import { constructMetadata } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.scss";
import PHProvider from "./posthog-provider";

export const metadata: Metadata = constructMetadata({});

export default async function RootLayout({ children }) {
  const bootstrapData = await getBootstrapData();

  return (
    <html lang="fr" dir="ltr" className="theme-5 theme-5-light">
      <head>
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        <Script
          type="text/javascript"
          id="crisp"
        >{`window.$crisp=[];window.CRISP_WEBSITE_ID="74e4d7cd-bc5e-4113-8f00-00e1bddc1f72";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}</Script>
      </head>
      <body>
        <PHProvider bootstrapData={bootstrapData}>
          {children}
          <AnimationHandler />
        </PHProvider>
        <MobileMenu />
        <BacktoTop />
      </body>
    </html>
  );
}
