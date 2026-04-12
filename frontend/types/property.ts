export interface Property {
  id: string;
  name: string;
  type: 'سكني' | 'تجاري' | string;
  status: 'شاغل' | 'متاح' | 'صيانة' | string;
  unitsCount?: number;
  location: string;
  rent_price: number | string;
  income?: number;
  description?: string;
  created_at?: string;
}