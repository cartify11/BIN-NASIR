import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Bin Nasir Customer Support',
  description:
    'Get in touch with Bin Nasir via WhatsApp (0300-1788080) or contact form. Inquire about bulk orders, corporate gifts, and delivery status.',
};

export default function ContactPage() {
  return <ContactClient />;
}
