export interface Property {
  id: string;
  name: string;
  type: 'سكني' | 'تجاري';
  status: 'شاغل' | 'متاح' | 'صيانة';
  unitsCount: number;
  location: string;
  rent_price: number | string; // السطر ده هو اللي هيحل المشكلة
  income: number;
}