import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "./components/Navbar"; // Default import if Navbar becomes client component
import { createSupabaseServerClient } from "@/app/lib/supabase/server";
import { getUserData } from "@/app/lib/user";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import UrlToastHandler from "@/app/components/UrlToastHandler";

export const metadata: Metadata = {
  title: "BFriends",
  description: "Generated by create next app",
  icons: {
    icon: [
      { url: '/bfriends-full.svg', type: 'image/svg+xml' }, // Primary SVG icon
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' }, // Fallback ICO
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png' }, // Should be a PNG, e.g., 180x180
    ],
    // other: [
    //   { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }, // Example for Safari pinned tab
    // ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userData = user ? await getUserData(user.id) : null;

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar user={user} userData={userData} />
          <main className="pt-[10vh]">
            {children}
          </main>
          <UrlToastHandler />
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
