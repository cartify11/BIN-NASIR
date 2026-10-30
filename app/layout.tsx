import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { LanguageProvider } from '@/lib/language-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  metadataBase: new URL('https://bin-nasir-mauve.vercel.app'),
  title: 'Bin Nasir | Traditional Peanut Rewri, Sidr Honey & Shilajit in Pakistan',
  description:
    'Bin Nasir brings 100% natural and authentic Pakistani delicacies: Special Peanut Rewri, wild Sidr Honey, purified Himalayan Shilajit, and Desi Ghee Panjeeri. Open Parcel inspection and Cash on Delivery nationwide.',
  keywords: [
    'Bin Nasir',
    'Peanut Rewri Chakwal',
    'Sidr Honey Pakistan',
    'Beri Honey',
    'Pure Himalayan Shilajit',
    'Royal Panjeeri Desi Ghee',
    'Sunnah Talbina',
    'Cash on delivery Pakistan',
    'Open parcel delivery Pakistan',
  ],
  authors: [{ name: 'Bin Nasir Traditional Foods' }],
  openGraph: {
    title: 'Bin Nasir | 100% Pure Traditional Delights & Nutrition',
    description:
      'Handcrafted Special Peanut Rewri, Wild Sidr Honey, and Himalayan Shilajit. Open Parcel inspection before payment all over Pakistan.',
    url: 'https://bin-nasir-mauve.vercel.app',
    siteName: 'Bin Nasir',
    images: [
      {
        url: '/images/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Bin Nasir Traditional Foods Pakistan',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bin Nasir | 100% Pure Traditional Delights & Nutrition',
    description: 'Chakwal Peanut Rewri, Sidr Honey, Himalayan Shilajit with Cash on Delivery in Pakistan.',
    images: ['/images/banner.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <body className="antialiased text-stone-900 bg-[#fdfbf7] flex flex-col min-h-screen pb-16 md:pb-0">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileBottomNav />
            <FloatingWhatsApp />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
