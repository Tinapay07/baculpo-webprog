import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';

const drawerWidth = 150;

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <DashboardRoundedIcon /> },
  { label: 'Reports', to: '/dashboard/reports', icon: <QueryStatsRoundedIcon /> },
  { label: 'Users', to: '/dashboard/users', icon: <GroupsRoundedIcon /> },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ffb020',
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 4,
  },
});

const DashboardDrawer = ({ onNavigate }) => {
  const location = useLocation();

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <Toolbar sx={{ px: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
            Dashboard
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Material UI
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1, py: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={location.pathname === item.to}
            onClick={onNavigate}
            sx={{
              mb: 0.5,
              color: '#334155',
              '&.Mui-selected': {
                borderLeft: '4px solid #1976d2',
                bgcolor: '#e3f2fd',
                color: '#1976d2',
                '& .MuiListItemIcon-root': {
                  color: '#1976d2',
                },
              },
              '&.Mui-selected:hover': {
                bgcolor: '#d7ecff',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

const DashLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            bgcolor: 'primary.main',
            color: '#ffffff',
          }}
        >
          <Toolbar sx={{ gap: 2, minHeight: { xs: 56, sm: 56 } }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: 'none' } }}
              aria-label="Open dashboard navigation"
            >
              <MenuRoundedIcon />
            </IconButton>
            <Typography variant="body1" component="p" sx={{ flexGrow: 1, fontWeight: 700 }}>
              Dashboard
            </Typography>
            <Box
              component="input"
              placeholder="Search..."
              sx={{
                display: { xs: 'none', sm: 'block' },
                width: 180,
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 1,
                bgcolor: 'rgba(255,255,255,0.14)',
                color: '#ffffff',
                px: 1.25,
                py: 0.75,
                outline: 'none',
                '&::placeholder': { color: 'rgba(255,255,255,0.72)' },
              }}
            />
            <Box
              component="button"
              type="button"
              sx={{
                border: '1px solid rgba(255,255,255,0.65)',
                borderRadius: 1,
                bgcolor: 'transparent',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 700,
                px: 1.25,
                py: 0.75,
              }}
            >
              LOGOUT
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <DashboardDrawer onNavigate={handleDrawerToggle} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                borderRight: '1px solid #e5e7eb',
              },
            }}
            open
          >
            <DashboardDrawer />
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            p: { xs: 2, sm: 3 },
            pt: { xs: 10, md: 9 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashLayout;
