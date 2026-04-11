'use client';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { LayoutDashboard, Building2, Users, FileText, Wrench, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 260;

const menuItems = [
  { text: 'لوحة التحكم', icon: <LayoutDashboard size={22} />, href: '/' },
  { text: 'العقارات والوحدات', icon: <Building2 size={22} />, href: '/properties' },
  { text: 'المستأجرين', icon: <Users size={22} />, href: '/tenants' },
  { text: 'عقود الإيجار', icon: <FileText size={22} />, href: '/contracts' },
  { text: 'طلبات الصيانة', icon: <Wrench size={22} />, href: '/maintenance' },
  { text: 'التقارير المالية', icon: <BarChart3 size={22} />, href: '/reports' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1a237e',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff', letterSpacing: 1 }}>
          SITY EXPERT
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          نظام إدارة العقارات
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton
                  selected={isActive}
                  sx={{
                    mx: 1.5,
                    borderRadius: '8px',
                    mb: 0.5,
                    justifyContent: 'right',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ textAlign: 'right', '& .MuiTypography-root': { fontWeight: isActive ? 'bold' : 'normal' } }} 
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}