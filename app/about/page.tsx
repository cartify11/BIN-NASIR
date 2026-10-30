import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | The Bin Nasir Heritage & Purity Story',
  description:
    'Discover the legacy of Bin Nasir: handcrafted traditional Chakwal peanut rewri, wild raw Sidr honey, and natural Himalayan wellness supplements in Pakistan.',
};

export default function AboutPage() {
  return <AboutClient />;
}
