import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { metadata } from "@/lib/metadata";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // next-themes uses 'theme' as the default key
                  var storedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var systemTheme = systemPrefersDark ? 'dark' : 'light';
                  
                  var resolvedTheme;
                  if (!storedTheme || storedTheme === 'system') {
                    resolvedTheme = systemTheme;
                  } else {
                    resolvedTheme = storedTheme;
                  }
                  
                  document.documentElement.setAttribute('data-theme', resolvedTheme);
                } catch (e) {
                  // Fallback to system preference or dark mode
                  var fallbackTheme = 'dark';
                  try {
                    fallbackTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } catch (e2) {}
                  document.documentElement.setAttribute('data-theme', fallbackTheme);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${satoshi.variable} antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
