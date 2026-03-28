export interface Property {
  id: string;
  name: string;
  type: 'سكني' | 'تجاري';
  status: 'شاغل' | 'متاح' | 'صيانة';
  unitsCount: number;
  location: string;
  income: number;
}