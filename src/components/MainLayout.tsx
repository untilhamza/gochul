"use client";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "./Navigator";
import Header from "./MainHeader";
import CustomThemeProvider, { theme } from "./CustomThemeProvider";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Gochul Portal
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <CustomThemeProvider>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        {/* Navigation */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        {/* Main section of page */}
        <div className="flex flex-1 flex-col">
          <Header onDrawerToggle={handleDrawerToggle} />
          {children}
          <footer className="p-2 bg-sky-100">
            <Copyright />
          </footer>
        </div>
      </Box>
    </CustomThemeProvider>
  );
}
