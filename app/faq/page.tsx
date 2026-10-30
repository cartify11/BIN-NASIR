import React from 'react';
import { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQs) | Bin Nasir',
  description:
    'Find answers about Bin Nasir delivery times, open parcel verification policy, cash on delivery, purity guarantees, and storage tips.',
};

export default function FaqPage() {
  return <FaqClient />;
}
