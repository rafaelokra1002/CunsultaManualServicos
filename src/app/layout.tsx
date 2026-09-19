import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import PageViewTracker from "@/components/PageViewTracker";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OficinaDigital - Manuais de Serviço de Motocicletas",
  description: "Acesse manuais de serviço de motocicletas de diversas marcas e modelos.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "OficinaDigital",
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
    <html lang="pt-BR">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <Script id="fb-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '411617598934749');
fbq('track', 'PageView');
        ` }} />
        <noscript><img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=411617598934749&ev=PageView&noscript=1" alt="" /></noscript>
        <Providers>{children}</Providers>
        <PageViewTracker />
        <ServiceWorkerRegister />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
