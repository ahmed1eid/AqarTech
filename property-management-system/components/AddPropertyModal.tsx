'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Box
} from '@mui/material';
import { Property } from '@/types/property';

interface AddPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (property: Property) => void;
  editData?: Property;
}

export default function AddPropertyModal({
  open,
  onClose,
  onAdd,
  editData
}: AddPropertyModalProps) {

  const [formData, setFormData] = useState<Partial<Property>>({
    name: '',
    type: 'سكني',
    status: 'متاح',
    location: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        name: '',
        type: 'سكني',
        status: 'متاح',
        location: '',
      });
    }
    setErrors({});
  }, [editData, open]);

  const validate = () => {
    let newErrors: any = {};

    if (!formData.name) newErrors.name = 'اسم العقار مطلوب';
    if (!formData.location) newErrors.location = 'الموقع مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const finalProperty = {
        ...formData,
        id: editData?.id || `prop-${Date.now()}`,
      } as Property;

      onAdd(finalProperty);
      setLoading(false);
      onClose();
    }, 500); // simulation
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      dir="rtl"
      PaperProps={{
        sx: { borderRadius: 3, overflow: 'hidden' }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #1a237e, #3949ab)',
          color: '#fff'
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {editData ? 'تعديل العقار' : 'إضافة عقار جديد'}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          أدخل بيانات العقار بشكل صحيح
        </Typography>
      </Box>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={2}>

          <Grid xs={12}>
            <TextField
              fullWidth
              label="اسم العقار"
              value={formData.name || ''}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Grid>

          <Grid xs={6}>
            <TextField
              select
              fullWidth
              label="النوع"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as any })
              }
            >
              <MenuItem value="سكني">سكني</MenuItem>
              <MenuItem value="تجاري">تجاري</MenuItem>
            </TextField>
          </Grid>

          <Grid xs={6}>
            <TextField
              select
              fullWidth
              label="الحالة"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as any })
              }
            >
              <MenuItem value="متاح">متاح</MenuItem>
              <MenuItem value="شاغل">شاغل</MenuItem>
              <MenuItem value="صيانة">صيانة</MenuItem>
            </TextField>
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label="الموقع"
              value={formData.location || ''}
              error={!!errors.location}
              helperText={errors.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          إلغاء
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            px: 3,
            borderRadius: 2,
            fontWeight: 'bold'
          }}
        >
          {loading
            ? 'جارٍ الحفظ...'
            : editData
            ? 'تحديث'
            : 'حفظ'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}