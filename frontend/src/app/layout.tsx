"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { Roboto } from "next/font/google";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { EmotionProvider } from '../components/emotion/provider';
import { useGetTrack } from '../services/hooks/hookAdmin';
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",  
});
<head>
  <script
    src="https://accounts.google.com/gsi/client"
    async
    defer
  ></script>
</head>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname();
  const { postUseTrack } = useGetTrack();

  useEffect(() => {
    if (pathname) {
      postUseTrack({ path: pathname }).catch((err) => {
        console.error("Tracking failed:", err);
      });
    }
  }, [pathname]);
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`} suppressHydrationWarning>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <EmotionProvider>{children}</EmotionProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
