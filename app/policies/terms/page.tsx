import React from 'react';
import { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Bin Nasir Traditional Foods',
  description:
    'Bin Nasir terms and conditions for ordering, payment methods, open box verification, and authentic food products across Pakistan.',
};

export default function TermsPage() {
  return <TermsClient />;
}
