import React from 'react';
import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bin Nasir Official',
  description:
    'Bin Nasir official privacy policy: How we collect, store, and protect customer delivery data and contact information across Pakistan.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}
