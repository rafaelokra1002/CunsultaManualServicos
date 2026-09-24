import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import PageViewTracker from "@/components/PageViewTracker";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Mesma tipografia da página de vendas: Archivo nos títulos, IBM Plex no texto.
const fontDisplay = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OficinaDigital - Manuais de Serviço de Motocicletas",
  description: "Acesse manuais de serviço de motocicletas de diversas marcas e modelos.",
  metadataBase: new URL("https://www.manualdeservicos.store"),
  openGraph: {
    title: "Descubra qualquer defeito de moto em 5 minutos",
    description: "+2.300 manuais oficiais, diagnóstico Honda sem scanner e calculadora de válvulas. R$ 67, acesso vitalício.",
    type: "website",
    locale: "pt_BR",
    siteName: "OficinaDigital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Descubra qualquer defeito de moto em 5 minutos",
    description: "+2.300 manuais oficiais, diagnóstico Honda sem scanner. R$ 67, vitalício.",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "OficinaDigital",
  },
  other: {
    "facebook-domain-verification": "rulsf2u0ef9xqbcni0d479x0r1b9ue",
  },
};

export const viewport: Viewport = {
  themeColor: "#6c5ce7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <Script id="fb-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1074292432237603');
fbq('track', 'PageView');
        ` }} />
        <noscript><img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1074292432237603&ev=PageView&noscript=1" alt="" /></noscript>
        <Providers>{children}</Providers>
        <PageViewTracker />
        <ServiceWorkerRegister />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
