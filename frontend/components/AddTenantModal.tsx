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

// 1. تعريف الأنواع لـ TypeScript (هذا السطر يحل مشكلة الـ Build Failed)
interface AddTenantModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
  editData?: any;
}

// 2. ربط الـ Interface بالمكون
export default function AddTenantModal({ open, onClose, onAdd, editData }: AddTenantModalProps) {
  const [availableProperties, setAvailableProperties] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    full_name: '',
    national_id: '',
    phone_number: '',
    email: '',
    property_id: '',
    contract_start: '',
    contract_end: '',
    contract_value: ''
  });

  // تحديث النموذج إذا كان هناك بيانات للتعديل أو تفريغه
  useEffect(() => {
    if (editData) {
      setFormData({
        full_name: editData.full_name || '',
        national_id: editData.national_id || '',
        phone_number: editData.phone_number || '',
        email: editData.email || '',
        property_id: editData.property_id || '',
        contract_start: editData.contract_start || '',
        contract_end: editData.contract_end || '',
        contract_value: editData.contract_value || ''
      });
      // للتعديل نضيف العقار الحالي للقائمة المتاحة لكي يكون متاحاً للاختيار (لأنه مشغول حالياً)
      if (editData.property_id && editData.property_name) {
         setAvailableProperties(prev => {
             if(prev.find(p => p.id === editData.property_id)) return prev;
             return [...prev, { id: editData.property_id, name: editData.property_name, location: '' }];
         });
      }
    } else {
      setFormData({
        full_name: '', national_id: '', phone_number: '',
        email: '', property_id: '', contract_start: '', contract_end: '', contract_value: ''
      });
    }
  }, [editData]);

  // جلب العقارات المتاحة
  useEffect(() => {
    if (open) {
      // نستخدم متغير بيئة للرابط أو localhost كاحتياطي
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      fetch(`${apiUrl}/api/properties`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const available = data.filter((p: any) => p.status === 'available');
            // دمج العقار الحالي في حال التعديل
            if (editData && editData.property_id) {
              const currentProp = data.find((p:any) => p.id === editData.property_id);
              if (currentProp && !available.find((p:any)=>p.id === currentProp.id)) {
                  available.push(currentProp);
              }
            }
            setAvailableProperties(available);
          } else {
            console.error("البيانات القادمة ليست مصفوفة:", data);
          }
        })
        .catch(err => console.error("Error fetching properties:", err));
    }
  }, [open, editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          {editData ? 'تعديل بيانات المستأجر' : 'تسجيل مستأجر جديد'}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }} >
          {editData ? 'قم بتحديث بيانات المستأجر أو تغيير الوحدة السكنية.' : 'أدخل بيانات المستأجر وربطه بالوحدة السكنية لبدء العقد.'}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth label="الاسم الكامل" name="full_name"
                value={formData.full_name} onChange={handleChange} required
              />
            </Grid>
            <Grid sx={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth label="رقم الهوية" name="national_id"
                value={formData.national_id} onChange={handleChange} required
                slotProps={{
                  htmlInput: { maxLength: 10 }
                }} 
              />
            </Grid>
            <Grid sx={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth label="رقم الجوال" name="phone_number"
                value={formData.phone_number} onChange={handleChange} required
              />
            </Grid>
            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth label="قيمة العقد (ر.س)" name="contract_value"
                type="number"
                value={formData.contract_value} onChange={handleChange} required
              />
            </Grid>
            <Grid sx={{ xs: 12 }}>
              <TextField
                select fullWidth label="اختر الوحدة السكنية المتاحة" 
                name="property_id" value={formData.property_id} onChange={handleChange} required
              >
                {availableProperties.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name} - {option.location || ''}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid sx={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth 
                type="date" 
                label="بداية العقد" 
                name="contract_start"
                // Extract only the date part YYYY-MM-DD
                value={formData.contract_start ? formData.contract_start.split('T')[0] : ''} 
                onChange={handleChange} 
                required
                // استخدام slotProps بدلاً من الخصائص المباشرة (MUI v6+)
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>
            <Grid sx={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth 
                type="date" 
                label="نهاية العقد" 
                name="contract_end"
                value={formData.contract_end ? formData.contract_end.split('T')[0] : ''} 
                onChange={handleChange} 
                required
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button 
              fullWidth variant="contained" type="submit"
              sx={{ bgcolor: '#1a237e', py: 1.5, fontWeight: 'bold' }}
            >
              {editData ? 'تحديث البيانات' : 'حفظ البيانات وبدء العقد'}
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