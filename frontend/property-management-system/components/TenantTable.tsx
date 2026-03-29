import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Chip, Typography, Stack, IconButton, Box
} from '@mui/material';
import { User, Calendar, AlertCircle, Trash2 } from 'lucide-react';

interface Tenant {
  id: string;
  full_name: string;
  national_id: string;
  property_name: string;
  contract_end: string;
  contract_value: number;
}

interface TenantTableProps {
  tenants: Tenant[];
  onDelete: (id: string) => void;
}

export default function TenantTable({ tenants, onDelete }: TenantTableProps) {
  
  // دالة لحساب ما إذا كان العقد ينتهي خلال 30 يوماً (لتحقيق شرط التنبيهات في المهمة)
  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const end = new Date(expiryDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 30;
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #eee' }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f8f9fa' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>المستأجر</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>العقار</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>قيمة العقد</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>تاريخ الانتهاء</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>إجراءات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenants.map((tenant) => {
            const expiring = isExpiringSoon(tenant.contract_end);
            return (
              <TableRow key={tenant.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <User size={16} color="#666" />
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{tenant.full_name}</Typography>
                      <Typography variant="caption" color="text.secondary">{tenant.national_id}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{tenant.property_name || 'غير محدد'}</TableCell>
                <TableCell>
                  <Typography variant="body2" color="primary.main" fontWeight="bold">
                    {Number(tenant.contract_value).toLocaleString()} ر.س
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Calendar size={14} />
                    <Typography variant="body2">{tenant.contract_end}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  {expiring ? (
                    <Chip 
                      icon={<AlertCircle size={14} />} 
                      label="قرب الانتهاء" 
                      color="error" 
                      variant="outlined" 
                      size="small" 
                    />
                  ) : (
                    <Chip label="نشط" color="success" size="small" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onDelete(tenant.id)} size="small" color="error">
                    <Trash2 size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          {tenants.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                <Typography color="text.secondary">لا يوجد مستأجرين مسجلين حالياً</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}