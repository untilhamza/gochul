"use client";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Navigator from "./Navigator";
import { theme } from "../CustomThemeProvider";
import { useSession } from "next-auth/react";

const DRAWER_WIDTH = 256;

interface Iprops {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ mobileOpen, setMobileOpen }: Iprops) => {
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { data: session, status } = useSession();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!session || !session.user) return null;

  //@ts-ignore
  if (session.user?.role === "USER") return null;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      {isSmUp ? null : (
        <Navigator
          PaperProps={{ style: { width: DRAWER_WIDTH } }}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        />
      )}
      <Navigator
        PaperProps={{ style: { width: DRAWER_WIDTH } }}
        sx={{ display: { sm: "block", xs: "none" } }}
      />
    </Box>
  );
};

export default Navbar;
