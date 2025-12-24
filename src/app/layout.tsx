import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Nav } from "@/components/Nav/Nav";
import { SITE_NAME, NAV_ITEMS, SITE_DESCRIPTION } from "@/content/site";
import "./globals.scss";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Nav homeLabel={SITE_NAME} items={[...NAV_ITEMS]} />
          {children}
          <footer>
            <div>&copy; {new Date().getFullYear()} Tom&apos;s Portfolio</div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
