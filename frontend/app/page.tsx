'use client';
import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Box, Button, Stack, Snackbar, Alert, Paper
} from '@mui/material';
import { Building, Users, AlertCircle, Receipt, Plus } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import PropertyTable from '../components/PropertyTable';
import AddPropertyModal from '../components/AddPropertyModal';
import AddTenantModal from '../components/AddTenantModal';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import TenantTable from '../components/TenantTable';
import { Property } from '@/types/property';

const API_URL = 'http://localhost:5000/api/properties';
const TENANT_API_URL = 'http://localhost:5000/api/tenants';
const STATS_API_URL = 'http://localhost:5000/api/stats/summary';

export default function Home() {
  const [viewType, setViewType] = useState<'properties' | 'tenants' | 'expiring'>('properties');
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | undefined>();
  const [dashboardStats, setDashboardStats] = useState({
    total_properties: 0,
    active_tenants: 0,
    total_revenue: 0,
    expiring_soon: 0
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const showAlert = (message: string, severity: any = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // جلب البيانات من السيرفر
  const fetchData = async () => {
    try {
      // 1. جلب العقارات
      const propRes = await fetch(API_URL);
      if (propRes.ok) {
        const propData = await propRes.json();
        setProperties(propData);
      }

      // 2. جلب الإحصائيات
      const statsRes = await fetch(STATS_API_URL);
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setDashboardStats(statsData);
      }

      // 3. جلب المستأجرين (تم تصحيح التكرار هنا)
      const tenantRes = await fetch(TENANT_API_URL);
      if (tenantRes.ok) {
        const tenantData = await tenantRes.json();
        setTenants(tenantData);
      }
    } catch (error) {
      console.error("Critical Fetch Error:", error);
      showAlert('حدث خطأ أثناء جلب البيانات من السيرفر', 'error');
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا العقار؟')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showAlert('تم حذف العقار بنجاح');
        fetchData();
      }
    } catch (error) { showAlert('فشل في حذف العقار', 'error'); }
  };

  const handleEdit = (property: Property) => {
    setPropertyToEdit(property);
    setIsPropertyModalOpen(true);
  };

  const handleAddProperty = async (formData: any) => {
    try {
      const isEdit = !!propertyToEdit;
      const url = isEdit ? `${API_URL}/${propertyToEdit.id}` : API_URL;
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showAlert(isEdit ? 'تم تحديث العقار بنجاح' : 'تم إضافة العقار بنجاح');
        setIsPropertyModalOpen(false);
        fetchData();
      }
    } catch (error) { showAlert('حدث خطأ في الاتصال بالسيرفر', 'error'); }
  };

  const getExpiringTenants = () => {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);

    return tenants.filter((t: any) => {
      const end = new Date(t.contract_end);
      return end >= today && end <= nextMonth;
    });
  };

  const handleAddTenant = async (tenantData: any) => {
    try {
      const response = await fetch(TENANT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenantData),
      });
      if (response.ok) {
        showAlert('تم تسجيل المستأجر بنجاح 🎉');
        setIsTenantModalOpen(false);
        fetchData();
      }
    } catch (error) { showAlert('فشل في إضافة المستأجر', 'error'); }
  };

  return (
    <Box sx={{ p: 3, background: '#f5f7fb', minHeight: '100vh' }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #1a237e, #3949ab)', color: '#fff' }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>لوحة التحكم</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>إدارة العقارات وسلاسل التوريد</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => setIsTenantModalOpen(true)} startIcon={<Users size={20} />} sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', '&:hover': { background: 'rgba(255,255,255,0.3)' } }}>
              تسجيل مستأجر
            </Button>
            <Button variant="contained" onClick={() => { setPropertyToEdit(undefined); setIsPropertyModalOpen(true); }} startIcon={<Plus />} sx={{ background: '#fff', color: '#1a237e', fontWeight: 'bold' }}>
              إضافة عقار
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Stats Cards Section */}
      <Grid container spacing={3}>
        {[
          { title: 'إجمالي العقارات', value: dashboardStats.total_properties, icon: <Building />, color: '#1a237e', onClick: () => setViewType('properties') },
          { title: 'المستأجرين النشطين', value: dashboardStats.active_tenants, icon: <Users />, color: '#2e7d32', onClick: () => setViewType('tenants') },
          { title: 'عقود تنتهي قريباً', value: dashboardStats.expiring_soon, icon: <AlertCircle />, color: '#ed6c02', onClick: () => setViewType('expiring') },
          { title: 'الإيرادات الشهرية', value: `${Number(dashboardStats.total_revenue).toLocaleString()} ر.س`, icon: <Receipt />, color: '#9c27b0' }
        ].map((item, i) => (
          <Grid key={i} sx={{xs:12,sm:6,md:3}}>
            <StatsCard {...item} onClick={item.onClick} />
          </Grid>
        ))}
      </Grid>

      {/* Dynamic Tables Section */}
      <Paper sx={{ mt: 5, p: 3, borderRadius: 3 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb:2 }} >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {viewType === 'properties' && 'العقارات والوحدات السكنية'}
            {viewType === 'tenants' && 'قائمة المستأجرين النشطين'}
            {viewType === 'expiring' && 'تنبيهات العقود المنتهية قريباً'}
          </Typography>
          
          {/* زر العودة يظهر في حالتي "المستأجرين" أو "العقود المنتهية" */}
          {viewType !== 'properties' && (
            <Button variant="text" size="small" onClick={() => setViewType('properties')}>
              العودة لجدول العقارات
            </Button>
          )}
        </Stack>

        {viewType === 'properties' ? (
          <PropertyTable 
            data={properties} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
            onView={handleViewProperty} 
          />
        ) : (
          <TenantTable 
            tenants={viewType === 'expiring' ? getExpiringTenants() : tenants} 
            onDelete={async (id) => {
              if (confirm('هل تريد حذف المستأجر؟')) {
                await fetch(`${TENANT_API_URL}/${id}`, { method: 'DELETE' });
                fetchData();
              }
            }} 
          />
        )}
      </Paper>

      { /* Modals Section */ }
      <AddPropertyModal open={isPropertyModalOpen} onClose={() => {setIsPropertyModalOpen(false); setPropertyToEdit(undefined);}} onAdd={handleAddProperty} editData={propertyToEdit} />
      <AddTenantModal open={isTenantModalOpen} onClose={() => setIsTenantModalOpen(false)} onAdd={handleAddTenant} />
      <PropertyDetailsModal open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} property={selectedProperty} />

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({...snackbar, open: false})}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}