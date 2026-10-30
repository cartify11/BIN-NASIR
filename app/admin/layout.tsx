import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, PhoneCall, ShoppingCart, BarChart3, Settings, ShieldAlert } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-gray-300 p-6 flex flex-col justify-between border-r border-gray-800">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-11 bg-white/10 rounded-lg p-0.5 border border-amber-500/30">
                <Image
                  src="/images/logo.png"
                  alt="Bin Nasir Admin Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold text-white text-base">Bin Nasir Admin</span>
            </div>
            <p className="text-[10px] text-amber-400 mt-1 uppercase font-mono tracking-wider">
              Management & Automation
            </p>
          </div>

          <nav className="space-y-1.5 text-sm">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-amber-600/20 text-amber-300 font-semibold"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Orders (آرڈرز)</span>
            </Link>

            <Link
              href="/admin#confirmation"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>AI Call Automation</span>
            </Link>

            <Link
              href="/shop"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition"
            >
              <Package className="w-4 h-4" />
              <span>Catalog & Products</span>
            </Link>
          </nav>
        </div>

        {/* Auth status placeholder */}
        <div className="p-3 rounded-xl bg-gray-800/80 border border-gray-700/60 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Auth Protected</span>
          </div>
          <p className="text-gray-400 text-[11px]">
            Supabase Auth / Role Session Active. Ready for Supabase Auth Guard.
          </p>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
