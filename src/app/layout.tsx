// These styles apply to every route in the application
import "./globals.css";
import MainLayout from "../components/MainLayout";
import DefaultTags from "./default-tags";

// export const metadata = {
//   title: "Gochul Portal",
// };

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <DefaultTags />
      <head />
      <body>{<MainLayout>{children}</MainLayout>}</body>
    </html>
  );
}
