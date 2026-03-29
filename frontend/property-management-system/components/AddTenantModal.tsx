import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, TextField, Button, 
  MenuItem, Grid, Stack, Divider
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600 },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function AddTenantModal({ open, onClose, onAdd }) {
  const [availableProperties, setAvailableProperties] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    national_id: '',
    phone_number: '',
    email: '',
    property_id: '',
    contract_start: '',
    contract_end: '',
  });

  // جلب العقارات المتاحة فقط لربطها بمستأجر جديد
  useEffect(() => {
    if (open) {
      fetch('http://localhost:5000/api/properties')
        .then(res => res.json())
        .then(data => {
          // فلترة العقارات المتاحة (Available) فقط
          const available = data.filter(p => p.status === 'available');
          setAvailableProperties(available);
        });
    }
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    // تصغير الفورم بعد الإرسال
    setFormData({
      full_name: '', national_id: '', phone_number: '',
      email: '', property_id: '', contract_start: '', contract_end: ''
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          تسجيل مستأجر جديد
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          أدخل بيانات المستأجر وربطه بالوحدة السكنية لبدء العقد.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="الاسم الكامل" name="full_name"
                value={formData.full_name} onChange={handleChange} required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth label="رقم الهوية" name="national_id"
                value={formData.national_id} onChange={handleChange} required
                inputProps={{ maxLength: 10 }} // معايير الهوية الوطنية
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth label="رقم الجوال" name="phone_number"
                value={formData.phone_number} onChange={handleChange} required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select fullWidth label="اختر الوحدة السكنية المتاحة" 
                name="property_id" value={formData.property_id} onChange={handleChange} required
              >
                {availableProperties.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name} - {option.location}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth type="date" label="بداية العقد" name="contract_start"
                InputLabelProps={{ shrink: true }}
                value={formData.contract_start} onChange={handleChange} required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth type="date" label="نهاية العقد" name="contract_end"
                InputLabelProps={{ shrink: true }}
                value={formData.contract_end} onChange={handleChange} required
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button 
              fullWidth variant="contained" type="submit"
              sx={{ bgcolor: '#1a237e', py: 1.5, fontWeight: 'bold' }}
            >
              حفظ البيانات وبدء العقد
            </Button>
            <Button fullWidth variant="outlined" onClick={onClose} color="inherit">
              إلغاء
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}