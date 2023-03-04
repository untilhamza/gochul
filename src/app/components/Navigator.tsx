"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";

const categories = [
  {
    id: "Leader",
    children: [
      {
        id: "Reports",
        path: "/reports",
        icon: <SummarizeIcon />,
        active: true,
      },
      { id: "Members", icon: <PeopleIcon />, path: "/members", active: false },
      {
        id: "Settings",
        icon: <SettingsIcon />,
        path: "/settings",
        active: false,
      },
    ],
  },
  {
    id: "Admin",
    children: [
      {
        id: "Group Reports",
        icon: <SettingsIcon />,
        path: "admin/reports",
        active: false,
      },
      {
        id: "Approvals",
        icon: <TimerIcon />,
        path: "admin/approvals",
        active: false,
      },
      {
        id: "Groups",
        icon: <SettingsInputComponentIcon />,
        path: "admin/groups",
        active: false,
      },
      { id: "Setting", icon: <PhonelinkSetupIcon />, path: "admin/settings" },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          Gochul
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, path }) => (
              <ListItem disablePadding key={childId}>
                {/* TODO: should be active if the path matches its path */}
                <ListItemButton
                  selected={pathname === path}
                  sx={item}
                  onClick={() => router.push(path)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
