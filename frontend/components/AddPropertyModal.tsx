import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, TextField, Button, 
  MenuItem, Grid, Stack, Divider, InputAdornment
} from '@mui/material';
import { Property } from '@/types/property';

interface AddPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
  editData?: Property;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function AddPropertyModal({ open, onClose, onAdd, editData }: AddPropertyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Apartment',
    location: '',
    status: 'available',
    rent_price: ''
  });

  // حل مشكلة الـ Infinite Loop: نحدث البيانات فقط عند فتح المودال (open) 
  // أو عند تغيير الـ id الخاص بالبيانات المطلوب تعديلها
  useEffect(() => {
    if (open) {
      if (editData) {
        setFormData({
          name: editData.name || '',
          type: editData.type || 'Apartment',
          location: editData.location || '',
          status: editData.status || 'available',
          rent_price: editData.rent_price?.toString() || ''
        });
      } else {
        setFormData({ name: '', type: 'Apartment', location: '', status: 'available', rent_price: '' });
      }
    }
  }, [open, editData?.id]); // الاعتماد على الـ id بدلاً من الـ object كاملاً

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" sx={{ fontWeight: 'bold',mb:1 }} >
          {editData ? 'تعديل بيانات العقار' : 'إضافة عقار جديد'}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth label="اسم العقار" name="name"
                value={formData.name} onChange={handleChange} required
              />
            </Grid>
            <Grid sx={{ xs: 6 }}>
              <TextField
                select fullWidth label="نوع العقار" name="type"
                value={formData.type} onChange={handleChange}
              >
                <MenuItem value="Apartment">شقة</MenuItem>
                <MenuItem value="Villa">فيلا</MenuItem>
              </TextField>
            </Grid>
            <Grid sx={{ xs: 6 }}>
              <TextField
                fullWidth label="سعر الإيجار" name="rent_price"
                type="number" value={formData.rent_price} onChange={handleChange} required
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">ر.س</InputAdornment>,
                  }
                }}
              />
            </Grid>
            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth label="الموقع" name="location"
                value={formData.location} onChange={handleChange} required
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: '#1a237e' }}>
              {editData ? 'تحديث' : 'إضافة'}
            </Button>
            <Button fullWidth variant="outlined" onClick={onClose}>إلغاء</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}