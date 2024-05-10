import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from './style.module.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vacation Master",
  description: "Vacation management platform."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id={styles.body} className={inter.className}>
        <section id={styles.topbar}>
          <h1 id={styles.title}>Vacation Master ✈️🌍🌴</h1>
        </section>
        { children }
      </body>
    </html>
  );
}
