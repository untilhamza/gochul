"use client";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "./nav/Navigator";
import Header from "./MainHeader";
import CustomThemeProvider, { theme } from "./CustomThemeProvider";
import { SessionProvider } from "next-auth/react";
import Navbar from "./nav/Navbar";
import Copyright from "./Copyright";
import MainSection from "./MainSection";

const drawerWidth = 256;

export default function MainLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // TODO: provide redux here
  return (
    <SessionProvider session={session}>
      <CustomThemeProvider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100vh",
            marginLeft: { sm: `${drawerWidth}px` },
          }}
        >
          <CssBaseline />
          {/* Navigation */}
          <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          {/* Main section of page */}
          <MainSection handleDrawerToggle={handleDrawerToggle}>
            {children}
          </MainSection>
          {/* Footer */}
          <footer className="p-2 bg-sky-100">
            <Copyright />
          </footer>
        </Box>
      </CustomThemeProvider>
    </SessionProvider>
  );
}
