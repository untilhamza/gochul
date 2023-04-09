"use client";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MainHeader from "./MainHeader";
import CustomThemeProvider, { theme } from "./CustomThemeProvider";
import { SessionProvider } from "next-auth/react";
import Navbar from "./nav/Navbar";
import Copyright from "./Copyright";
import { useSession } from "next-auth/react";

interface Iprops {
  children: React.ReactNode;
  handleDrawerToggle: () => void;
}

const MainSection = ({ children, handleDrawerToggle }: Iprops) => {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  //@ts-ignore

  return (
    <div className="flex flex-1 flex-col">
      <MainHeader onDrawerToggle={handleDrawerToggle} />
      {children}
      <footer className="p-2 bg-sky-100">
        <Copyright />
      </footer>
    </div>
  );
};

export default MainSection;
