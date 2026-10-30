'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Phone,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Play,
  RefreshCw,
  AlertTriangle,
  Settings,
  ListOrdered,
  Eye,
  Save,
  Check,
} from 'lucide-react';
import { formatPKR } from '@/lib/utils';
import { OrderStatus, ConfirmationStatus } from '@/types';
import { DEFAULT_STORE_SETTINGS, StoreSettings } from '@/lib/store-settings';

interface AdminOrder {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  city: string;
  total: number;
  payment_method: string;
  payment_status?: string;
  payment_proof_url?: string;
  status: OrderStatus;
  confirmation_status: ConfirmationStatus;
  items_summary: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState<'orders' | 'settings'>('orders');

  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: 'o-101',
      order_number: 'BN-1001',
      customer_name: 'Tariq Mehmood',
      phone: '0300-1788080',
      city: 'Lahore',
      total: 3610,
      payment_method: 'advance',
      payment_status: 'pending_verification',
      payment_proof_url: '/images/banner.jpg',
      status: 'pending',
      confirmation_status: 'not_called',
      items_summary: 'Special Peanut Rewri (1kg), Pure Sidr Honey (1kg)',
      created_at: 'Just now',
    },
    {
      id: 'o-102',
      order_number: 'BN-1002',
      customer_name: 'Usman Ghani',
      phone: '0321-4567890',
      city: 'Karachi',
      total: 2450,
      payment_method: 'cod',
      payment_status: 'unpaid',
      status: 'confirmed',
      confirmation_status: 'confirmed',
      items_summary: 'Pure Himalayan Shilajit (30g)',
      created_at: '25 mins ago',
    },
    {
      id: 'o-103',
      order_number: 'BN-1003',
      customer_name: 'Bilal Khan',
      phone: '0345-8912345',
      city: 'Islamabad',
      total: 1650,
      payment_method: 'cod',
      payment_status: 'unpaid',
      status: 'shipped',
      confirmation_status: 'confirmed',
      items_summary: 'Royal Desi Ghee Panjeeri (500g)',
      created_at: '2 hours ago',
    },
  ]);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [previewProofUrl, setPreviewProofUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Settings State
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettingsForm(data.settings);
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      }
    } catch (e) {
      alert('Failed to save settings');
    }
  };

  const updateConfirmation = (orderId: string, newStatus: ConfirmationStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              confirmation_status: newStatus,
              status: newStatus === 'confirmed' ? 'confirmed' : newStatus === 'rejected' ? 'cancelled' : o.status,
            }
          : o
      )
    );
  };

  const updatePaymentStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, payment_status: newStatus } : o))
    );
  };

  const filteredOrders =
    activeTab === 'all'
      ? orders
      : activeTab === 'advance'
      ? orders.filter((o) => o.payment_method === 'advance')
      : orders.filter((o) => o.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Top Bar with Navigation between Orders & Settings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 font-serif">
            Bin Nasir Management Portal
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage customer orders, advance payment proofs, and editable store settings.
          </p>
        </div>

        <div className="inline-flex rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => setActiveView('orders')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'orders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Orders Management</span>
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'settings' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Store Settings & Stats</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 text-xs rounded-xl font-medium">
          {statusMessage}
        </div>
      )}

      {/* =========================================================================
          VIEW 1: ORDERS MANAGEMENT
          ========================================================================= */}
      {activeView === 'orders' && (
        <div className="space-y-6">
          {/* Status Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {['all', 'pending', 'advance', 'confirmed', 'shipped'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl font-bold uppercase whitespace-nowrap transition ${
                  activeTab === tab
                    ? 'bg-amber-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab === 'advance' ? 'Advance Payment Proofs' : tab}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-4">Customer & City</th>
                    <th className="py-3 px-4">Items Summary</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/70">
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                        {ord.order_number}
                        <span className="block text-[10px] text-gray-400 font-sans">{ord.created_at}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-gray-900">{ord.customer_name}</p>
                        <p className="text-[11px] text-gray-500 font-mono">{ord.phone}</p>
                        <span className="text-[10px] text-amber-800 font-semibold">{ord.city}</span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs text-gray-600 truncate">
                        {ord.items_summary}
                      </td>
                      <td className="py-3.5 px-4 font-black text-gray-900 font-mono">
                        {formatPKR(ord.total)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            ord.payment_method === 'advance'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.payment_method}
                        </span>
                        {ord.payment_proof_url && (
                          <button
                            onClick={() => setPreviewProofUrl(ord.payment_proof_url!)}
                            className="mt-1 block text-[10px] text-emerald-700 font-bold hover:underline flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Proof</span>
                          </button>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          {ord.payment_status === 'pending_verification' && (
                            <button
                              onClick={() => updatePaymentStatus(ord.id, 'paid')}
                              className="px-2 py-1 rounded bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-500"
                            >
                              Verify Paid
                            </button>
                          )}
                          <button
                            onClick={() => updateConfirmation(ord.id, 'confirmed')}
                            className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                            title="Confirm Order"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateConfirmation(ord.id, 'rejected')}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                            title="Cancel Order"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: STORE SETTINGS & STATS (Replaces all hardcoded numbers!)
          ========================================================================= */}
      {activeView === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-gray-900">Editable Store Stats & Marketing</h3>
                <p className="text-xs text-gray-500">
                  Update customer rating and stats without touching code.
                </p>
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow"
              >
                {settingsSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{settingsSaved ? 'Saved!' : 'Save Settings'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Store Rating (e.g. 4.9)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={settingsForm.stats_rating}
                  onChange={(e) => setSettingsForm({ ...settingsForm, stats_rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Reviews Count (e.g. 1250)</label>
                <input
                  type="number"
                  value={settingsForm.stats_reviews_count}
                  onChange={(e) => setSettingsForm({ ...settingsForm, stats_reviews_count: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Happy Customers Count</label>
                <input
                  type="number"
                  value={settingsForm.stats_customers_count}
                  onChange={(e) => setSettingsForm({ ...settingsForm, stats_customers_count: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                />
              </div>
            </div>

            {/* Advance Payment Discount & Thresholds */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-4 border-t border-gray-100">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Advance Payment Discount %</label>
                <input
                  type="number"
                  step="0.5"
                  value={settingsForm.advance_discount_percent}
                  onChange={(e) => setSettingsForm({ ...settingsForm, advance_discount_percent: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Free Shipping Threshold (PKR)</label>
                <input
                  type="number"
                  value={settingsForm.free_shipping_threshold}
                  onChange={(e) => setSettingsForm({ ...settingsForm, free_shipping_threshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Standard Delivery Fee (PKR)</label>
                <input
                  type="number"
                  value={settingsForm.standard_shipping_fee}
                  onChange={(e) => setSettingsForm({ ...settingsForm, standard_shipping_fee: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                />
              </div>
            </div>

            {/* Official Payment Accounts */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <h4 className="font-bold text-xs uppercase text-gray-500 tracking-wider">
                Official Payment Accounts (Shown to customers for Advance Payment)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">JazzCash Number</label>
                  <input
                    type="text"
                    value={settingsForm.jazzcash_number}
                    onChange={(e) => setSettingsForm({ ...settingsForm, jazzcash_number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">JazzCash Account Title</label>
                  <input
                    type="text"
                    value={settingsForm.jazzcash_title}
                    onChange={(e) => setSettingsForm({ ...settingsForm, jazzcash_title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Easypaisa Number</label>
                  <input
                    type="text"
                    value={settingsForm.easypaisa_number}
                    onChange={(e) => setSettingsForm({ ...settingsForm, easypaisa_number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Easypaisa Account Title</label>
                  <input
                    type="text"
                    value={settingsForm.easypaisa_title}
                    onChange={(e) => setSettingsForm({ ...settingsForm, easypaisa_title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={settingsForm.bank_name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bank_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Bank Account Title</label>
                  <input
                    type="text"
                    value={settingsForm.bank_title}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bank_title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    value={settingsForm.bank_account_number}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bank_account_number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Bank IBAN</label>
                  <input
                    type="text"
                    value={settingsForm.bank_iban}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bank_iban: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Proof Modal */}
      {previewProofUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewProofUrl(null)}
        >
          <div className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden p-4 space-y-3">
            <h4 className="font-bold text-sm text-gray-900">Advance Payment Receipt Preview</h4>
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100">
              <Image src={previewProofUrl} alt="Receipt" fill className="object-contain" />
            </div>
            <button
              onClick={() => setPreviewProofUrl(null)}
              className="w-full py-2 bg-gray-900 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
