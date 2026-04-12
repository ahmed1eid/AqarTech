import React from 'react';
import {
  Modal, Box, Typography, Button, 
  Grid, Stack, Divider, Chip
} from '@mui/material';
import { 
  Home, LocationOn, AttachMoney, 
  Info, CalendarToday 
} from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

import { Property } from '@/types/property';

interface PropertyDetailsModalProps {
  open: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function PropertyDetailsModal({ open, onClose, property }: PropertyDetailsModalProps) {
  if (!property) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* رأس المودال */}
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            تفاصيل العقار
          </Typography>
          <Chip 
            // عرض النوع بناءً على القيم الفعلية من قاعدة البيانات
            label={property.type === 'Apartment' ? 'شقة سكنية' : property.type === 'Villa' ? 'فيلا' : property.type}
            color={property.type === 'Apartment' ? 'primary' : 'secondary'}
            variant="outlined"
            size="small"
          />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* محتوى التفاصيل */}
        <Grid container spacing={3}>
          <Grid sx={{ xs: 12 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Home color="action" />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {property.name}
              </Typography>
            </Stack>
          </Grid>

          <Grid sx={{ xs: 6 }}>
            <Stack spacing={0.5}>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                <LocationOn fontSize="small" color="disabled" />
                <Typography variant="caption" color="text.secondary">الموقع</Typography>
              </Stack>
              <Typography variant="body2">{property.location}</Typography>
            </Stack>
          </Grid>

          <Grid sx={{ xs: 6 }}>
            <Stack spacing={0.5}>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                <AttachMoney fontSize="small" color="disabled" />
                <Typography variant="caption" color="text.secondary">الإيجار الشهري</Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                {property.rent_price} ر.س
              </Typography>
            </Stack>
          </Grid>

          <Grid sx={{ xs: 6 }}>
            <Stack spacing={0.5}>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                <Info fontSize="small" color="disabled" />
                <Typography variant="caption" color="text.secondary">الحالة التأجيرية</Typography>
              </Stack>
              <Chip 
                label={property.status === 'available' ? 'متاح' : 'مؤجر'} 
                size="small"
                color={property.status === 'available' ? 'success' : 'error'}
                sx={{ width: 'fit-content' }}
              />
            </Stack>
          </Grid>

          {property.created_at && (
            <Grid sx={{ xs: 6 }}>
              <Stack spacing={0.5}>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                  <CalendarToday fontSize="small" color="disabled" />
                  <Typography variant="caption" color="text.secondary">تاريخ الإضافة</Typography>
                </Stack>
                <Typography variant="body2">
                  {new Date(property.created_at).toLocaleDateString('ar-SA')}
                </Typography>
              </Stack>
            </Grid>
          )}
        </Grid>

        {/* أزرار التحكم */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={onClose}
            sx={{ bgcolor: '#1a237e', fontWeight: 'bold' }}
          >
            إغلاق
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}