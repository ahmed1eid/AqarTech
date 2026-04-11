'use client';
import React from 'react';
import { 
  Modal, Box, Typography, Stack, Divider, Button, Grid, Chip, Paper 
} from '@mui/material';
import { MapPin, Building, DollarSign, Info, Calendar, Home } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyDetailsModalProps {
  open: boolean;
  onClose: () => void;
  property: Property | null;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 500 },
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  p: 0, // أزلنا الـ padding لعمل Header ملون
  overflow: 'hidden'
};

export default function PropertyDetailsModal({ open, onClose, property }: PropertyDetailsModalProps) {
  if (!property) return null;

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box sx={style}>
        {/* Header المودال */}
        <Box sx={{ bgcolor: '#1a237e', color: '#fff', p: 3 }}>
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
            <Building size={28} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>تفاصيل الوحدة العقارية</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>رقم المعرف: {property.id}</Typography>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ p: 4 }}>
          <Grid container spacing={3}>
            {/* القسم الأول: معلومات أساسية */}
            <Grid sx={{ xs: 12 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" sx={{ color:"text.secondary" ,display:"block"}} gutterBottom>
                    اسم العقار
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight:"bold" , display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Home size={18} color="#3949ab" /> {property.name}
                  </Typography>
                </Box>

                <Divider />

                <Grid container spacing={2}>
                  <Grid sx={{ xs: 6 }}>
                    <Typography variant="caption" sx={{ color:"text.secondary" ,display:"block"}} gutterBottom>
                      النوع
                    </Typography>
                    <Chip
                      label={property.type === 'Apartment' ? 'شقة' : 'فيلا'} 
                      variant="outlined" 
                      size="small" 
                    />
                  </Grid>
                  <Grid sx={{ xs: 6 }}>
                    <Typography variant="caption" sx={{ color:"text.secondary" ,display:"block"}} gutterBottom>
                      الحالة الحالية
                    </Typography>
                    <Chip 
                      label={property.status === 'available' ? 'متاح' : property.status === 'occupied' ? 'مشغول' : 'صيانة'} 
                      color={property.status === 'available' ? 'success' : 'primary'}
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Divider />

                {/* القسم الثاني: الموقع والسعر */}
                <Box>
                  <Typography variant="caption" sx={{ color:"text.secondary" ,display:"block"}} gutterBottom>
                    الموقع الجغرافي
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MapPin size={18} color="#ef5350" /> {property.location}
                  </Typography>
                </Box>

                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2, borderStyle: 'dashed' }}>
                  <Typography variant="caption" sx={{ color:"text.secondary" ,display:"block"}} gutterBottom>
                    القيمة الإيجارية
                  </Typography>
                  <Typography variant="h5" color="primary.main" fontWeight="bold">
                    {Number(property.rent_price).toLocaleString()} 
                    <Typography component="span" variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>ر.س / شهرياً</Typography>
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={onClose}
              sx={{ bgcolor: '#1a237e', borderRadius: 2, py: 1.2 }}
            >
              إغلاق النافذة
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}