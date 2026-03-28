'use client';
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  Snackbar,
  Alert,
  Paper
} from '@mui/material';
import { Building, Users, AlertCircle, Receipt, Plus } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import PropertyTable from '../components/PropertyTable';
import AddPropertyModal from '../components/AddPropertyModal';
import { Property } from '@/types/property';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | undefined>();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showAlert = (message: string, severity: any = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    const saved = localStorage.getItem('property_management_data');
    if (saved) {
      try {
        setProperties(JSON.parse(saved));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('property_management_data', JSON.stringify(properties));
  }, [properties]);

  const handleAddOrUpdateProperty = (property: Property) => {
    if (propertyToEdit) {
      setProperties((prev) =>
        prev.map((p) => (p.id === property.id ? property : p))
      );
      setPropertyToEdit(undefined);
      showAlert('تم تحديث العقار ✅');
    } else {
      setProperties((prev) => [property, ...prev]);
      showAlert('تم إضافة العقار 🎉');
    }
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm('هل أنت متأكد؟')) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      showAlert('تم الحذف ❌', 'error');
    }
  };

  const handleEditClick = (property: Property) => {
    setPropertyToEdit(property);
    setIsModalOpen(true);
  };

  return (
    <Box sx={{ p: 3, background: '#f5f7fb', minHeight: '100vh' }}>
      
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #1a237e, #3949ab)',
          color: '#fff'
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold">
              لوحة التحكم
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              إدارة العقارات بسهولة واحترافية
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              setPropertyToEdit(undefined);
              setIsModalOpen(true);
            }}
            startIcon={<Plus />}
            sx={{
              background: '#fff',
              color: '#1a237e',
              fontWeight: 'bold',
              '&:hover': { background: '#eee' }
            }}
          >
            إضافة عقار
          </Button>
        </Stack>
      </Paper>

      {/* Stats */}
      <Grid container spacing={3}>
        {[{
          title: 'إجمالي العقارات',
          value: properties.length,
          icon: <Building />,
          color: '#1a237e'
        },
        {
          title: 'المستأجرين',
          value: 0,
          icon: <Users />,
          color: '#2e7d32'
        },
        {
          title: 'عقود قريبة',
          value: 0,
          icon: <AlertCircle />,
          color: '#ed6c02'
        },
        {
          title: 'الإيرادات',
          value: '0 ر.س',
          icon: <Receipt />,
          color: '#9c27b0'
        }].map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Box sx={{
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <StatsCard {...item} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Table Section */}
      <Paper sx={{ mt: 5, p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          العقارات
        </Typography>

        {properties.length === 0 ? (
          <Box textAlign="center" py={5}>
            <Typography color="text.secondary">
              لا يوجد عقارات حالياً
            </Typography>
          </Box>
        ) : (
          <PropertyTable
            data={properties}
            onDelete={handleDeleteProperty}
            onEdit={handleEditClick}
          />
        )}
      </Paper>

      {/* Modal */}
      <AddPropertyModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPropertyToEdit(undefined);
        }}
        onAdd={handleAddOrUpdateProperty}
        editData={propertyToEdit}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}