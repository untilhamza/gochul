"use client";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MainHeader from "./MainHeader";
import { theme } from "./CustomThemeProvider";
import { useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";

interface Iprops {
  children: React.ReactNode;
  handleDrawerToggle: () => void;
}

const MainSection = ({ children, handleDrawerToggle }: Iprops) => {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-1 flex-col">
      <MainHeader onDrawerToggle={handleDrawerToggle} />

      {status === "loading" ? (
        <div className="flex items-center justify-center w-full h-full">
          <CircularProgress />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default MainSection;
