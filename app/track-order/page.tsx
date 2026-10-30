import React from 'react';
import { Metadata } from 'next';
import TrackOrderClient from './TrackOrderClient';

export const metadata: Metadata = {
  title: 'Track Your Order | Bin Nasir Live Parcel Tracking',
  description:
    'Track your Bin Nasir order status live using your Order Number and Pakistani phone number. Monitor courier dispatch and delivery milestones.',
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
