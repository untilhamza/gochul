"use client";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import CustomThemeProvider, { theme } from "./CustomThemeProvider";
import { SessionProvider, useSession } from "next-auth/react";
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
  // TODO: provide redux here
  return (
    <SessionProvider session={session}>
      <App> {children}</App>
    </SessionProvider>
  );
}

const App = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // TODO: if not authenticated, redirect to login page
  // if (status === "unauthenticated") return <div>Unauthenticated</div>;

  return (
    <CustomThemeProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          marginLeft: {
            sm: `${drawerWidth}px`,
          },
        }}
      >
        {
          <>
            <CssBaseline />
            {/* Navigation */}
            <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            {/* Main section of page */}
            <MainSection handleDrawerToggle={handleDrawerToggle}>
              {children}
            </MainSection>
            {/* Footer */}
            <footer className="p-2 bg-sky-100 mt-auto">
              <Copyright />
            </footer>
          </>
        }
      </Box>
    </CustomThemeProvider>
  );
};
