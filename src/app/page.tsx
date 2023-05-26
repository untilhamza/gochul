"use client";
import Image from "next/image";
import CommunityImage from "public/images/community.jpg";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

//TODO: make this a sign in page the redirects if the user is already logged in .
export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("main layout session", session);
  }, [session]);

  return (
    <main className="flex flex-col justify-center items-center h-full p-4  flex-1">
      <div className="w-full rounded-lg m-auto flex items-center justify-center">
        <Image
          src={CommunityImage}
          alt="Next.js Logo"
          priority
          placeholder="blur"
        />
      </div>
    </main>
  );
}
