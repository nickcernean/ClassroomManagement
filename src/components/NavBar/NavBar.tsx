import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomImage from "../Image/CustomImage";
import Link from "next/link";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "Teachers", "Students"];

export default function DrawerAppBar({ window }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <CustomImage
          className="mx-auto"
          src="/red_square.png"
          variant="icon"
          alt="logo"
        />
      </Typography>

      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link key={item} href={`/${item.toLowerCase()}`} passHref>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText
                  sx={{
                    color: "common.black",
                    fontSize: 34,
                    fontWeight: "medium",
                  }}
                  primary={item}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" position="relative">
        <Toolbar
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.secondary.light
                : theme.palette.grey[400],
            p: 1,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.1, display: { xs: "none", sm: "block" } }}
          >
            <CustomImage
              className="mx-auto"
              src="/red_square.png"
              variant="icon"
              alt="logo"
            />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Link key={item} href={`/${item.toLowerCase()}`} passHref>
                <Button
                  key={item}
                  sx={{
                    color: "common.black",
                    fontSize: 17,
                    marginRight: index < navItems.length - 1 ? 2 : 0,
                  }}
                >
                  {item}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
