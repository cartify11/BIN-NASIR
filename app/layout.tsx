import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { LanguageProvider } from '@/lib/language-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'Bin Nasir | Traditional Peanut Rewri, Sidr Honey & Shilajit in Pakistan',
  description:
    'Bin Nasir offers 100% natural and authentic Pakistani sweets, Special Peanut Rewri, pure Sidr honey, and purified Himalayan Shilajit. Cash on delivery available all over Pakistan.',
  keywords: [
    'Bin Nasir',
    'Peanut Rewri',
    'Sidr Honey Pakistan',
    'Pure Shilajit',
    'Panjeeri',
    'Talbina',
    'Cash on delivery Pakistan',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <body className="antialiased text-gray-900 bg-amber-50/20 flex flex-col min-h-screen pb-14 md:pb-0">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileBottomNav />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
