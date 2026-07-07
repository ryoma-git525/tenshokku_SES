import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "30秒でできる 年収シミュレーター",
  description: "もし今転職したら、年収いくらくらいになりそうかをざっくり見られるシミュレーターです。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
