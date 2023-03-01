"use client";
// These styles apply to every route in the application
import "./globals.css";
import MainLayout from "./components/MainLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{<MainLayout>{children}</MainLayout>}</body>
    </html>
  );
}
