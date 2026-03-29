'use client';
import { Paper, Typography, Box } from '@mui/material';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void; // إضافة الـ Prop الجديد كاختياري
}

export default function StatsCard({ title, value, icon, color, onClick }: StatsCardProps) {
  return (
    <Paper 
      elevation={0}
      onClick={onClick} // ربط حدث الضغط
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        border: '1px solid #e0e0e0', 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        transition: '0.3s',
        cursor: onClick ? 'pointer' : 'default', // تغيير شكل الماوس لو الكارت قابل للضغط
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          borderColor: color,
          transform: onClick ? 'translateY(-4px)' : 'none' // تأثير حركة بسيط عند التحليق
        }
      }}
    >
      <Box sx={{ 
        p: 1.5, 
        borderRadius: 2, 
        backgroundColor: `${color}15`, 
        color: color, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight="500">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}