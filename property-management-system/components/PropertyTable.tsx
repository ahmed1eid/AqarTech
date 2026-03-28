'use client';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Typography,
  IconButton, Stack, TextField, Box
} from '@mui/material';
import { Trash2, Edit3, Search } from 'lucide-react';
import { useState } from 'react';
import { Property } from '@/types/property';

interface PropertyTableProps {
  data: Property[];
  onDelete: (id: string) => void;
  onEdit: (property: Property) => void;
}

const statusColors: Record<string, any> = {
  'متاح': 'success',
  'شاغل': 'primary',
  'صيانة': 'warning',
};

export default function PropertyTable({ data, onDelete, onEdit }: PropertyTableProps) {

  const [search, setSearch] = useState('');

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  if (data.length === 0) {
    return (
      <Paper sx={{
        p: 6,
        textAlign: 'center',
        borderRadius: 3,
        border: '1px dashed #ccc',
        background: '#fafafa'
      }}>
        <Typography variant="h6" gutterBottom>
          لا توجد عقارات 🏠
        </Typography>
        <Typography color="text.secondary">
          ابدأ بإضافة أول عقار من الزر بالأعلى
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>

      {/* Search */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="ابحث عن عقار أو موقع..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <Search size={18} style={{ marginLeft: 8 }} />
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
        }}
      >
        <Table dir="rtl">

          {/* Header */}
          <TableHead>
            <TableRow sx={{ background: '#f5f7fb' }}>
              <TableCell align="right"><b>اسم العقار</b></TableCell>
              <TableCell align="right"><b>النوع</b></TableCell>
              <TableCell align="right"><b>الموقع</b></TableCell>
              <TableCell align="right"><b>الحالة</b></TableCell>
              <TableCell align="center"><b>الإجراءات</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  transition: '0.2s',
                  '&:hover': {
                    backgroundColor: '#f9fbff'
                  }
                }}
              >
                <TableCell align="right" sx={{ fontWeight: 500 }}>
                  {row.name}
                </TableCell>

                <TableCell align="right">
                  <Chip
                    label={row.type}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell align="right" sx={{ color: 'text.secondary' }}>
                  {row.location}
                </TableCell>

                <TableCell align="right">
                  <Chip
                    label={row.status}
                    color={statusColors[row.status] || 'default'}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">

                    <IconButton
                      size="small"
                      sx={{
                        background: '#e3f2fd',
                        '&:hover': { background: '#bbdefb' }
                      }}
                      onClick={() => onEdit(row)}
                    >
                      <Edit3 size={16} />
                    </IconButton>

                    <IconButton
                      size="small"
                      sx={{
                        background: '#ffebee',
                        '&:hover': { background: '#ffcdd2' }
                      }}
                      onClick={() => onDelete(row.id)}
                    >
                      <Trash2 size={16} />
                    </IconButton>

                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}