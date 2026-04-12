import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, IconButton, Chip, Typography, Stack
} from '@mui/material';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyTableProps {
  data: Property[];
  onDelete: (id: string) => void;
  onEdit: (property: Property) => void;
  onView: (property: Property) => void;

}

export default function PropertyTable({ data, onDelete, onEdit, onView }: PropertyTableProps) {
  
  // دالة لتحديد لون الحالة (Status)
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'available':
        return <Chip label="متاح" color="success" variant="outlined" />;
      case 'occupied':
        return <Chip label="مشغول" color="primary" variant="outlined" />;
      case 'maintenance':
        return <Chip label="صيانة" color="warning" variant="outlined" />;
      default:
        return <Chip label={status} />;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #eee' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: '#f8f9fa' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>اسم العقار</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>النوع</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>الموقع</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>الإيجار الشهري</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الإجراءات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((property) => (
            <TableRow key={property.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{property.name}</Typography>
              </TableCell>
              <TableCell>{property.type === 'Apartment' ? 'شقة' : property.type === 'Villa' ? 'فيلا' : property.type}</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{property.location}</TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {Number(property.rent_price).toLocaleString()} ر.س
                </Typography>
              </TableCell>
              <TableCell>{getStatusChip(property.status)}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
                  <IconButton onClick={() => onEdit(property)} size="small" sx={{ color: '#1a237e' }}>
                    <Edit size={18} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(property.id)} size="small" color="error">
                    <Trash2 size={18} />
                  </IconButton>
                  <IconButton onClick={() => onView(property)} sx={{ color: '#666' }} size="small">
                    <Eye size={18} />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}