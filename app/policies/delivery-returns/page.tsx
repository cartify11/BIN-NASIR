import React from 'react';
import { Metadata } from 'next';
import DeliveryReturnsClient from './DeliveryReturnsClient';

export const metadata: Metadata = {
  title: 'Delivery & Returns Policy | Open Parcel Guarantee | Bin Nasir',
  description:
    'Bin Nasir official delivery and return terms: Nationwide 2-4 days express delivery, open parcel inspection before payment, and 7-day money-back guarantee.',
};

export default function DeliveryReturnsPage() {
  return <DeliveryReturnsClient />;
}
