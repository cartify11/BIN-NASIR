'use client';

import React, { useState } from 'react';
import { Phone, CheckCircle, Clock, Truck, XCircle, Play, RefreshCw, AlertTriangle } from 'lucide-react';
import { formatPKR } from '@/lib/utils';
import { OrderStatus, ConfirmationStatus } from '@/types';

interface DemoAdminOrder {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  city: string;
  total: number;
  payment_method: string;
  status: OrderStatus;
  confirmation_status: ConfirmationStatus;
  items_summary: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<DemoAdminOrder[]>([
    {
      id: 'o-101',
      order_number: 'BN-1001',
      customer_name: 'Tariq Mehmood',
      phone: '0300-1788080',
      city: 'Lahore',
      total: 3800,
      payment_method: 'cod',
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
      status: 'shipped',
      confirmation_status: 'confirmed',
      items_summary: 'Royal Desi Ghee Panjeeri (500g)',
      created_at: '2 hours ago',
    },
  ]);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [testingWebhookId, setTestingWebhookId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

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

  const handleSimulateWebhook = async (order: DemoAdminOrder) => {
    setTestingWebhookId(order.id);
    setStatusMessage(`Triggering webhook & AI automation for ${order.order_number}...`);

    try {
      // Simulate calling internal trigger webhook
      console.log('[Admin] Dispatched automation test for order:', order);
      setTimeout(() => {
        setTestingWebhookId(null);
        setStatusMessage(`✅ Webhook dispatched for ${order.order_number}! Event logged in order_events.`);
        setTimeout(() => setStatusMessage(null), 4000);
      }, 1000);
    } catch (e) {
      setTestingWebhookId(null);
    }
  };

  const filteredOrders =
    activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab || o.confirmation_status === activeTab);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-gray-900">
            Orders Management (انتظامیہ آرڈرز)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Protected Admin Area — Track COD orders, manage AI confirmation call queue & courier sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            Automation Ready
          </span>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium animate-fadeIn">
          {statusMessage}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Total Orders</p>
          <p className="text-2xl font-black text-gray-900 font-mono mt-1">{orders.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Pending Confirmation</p>
          <p className="text-2xl font-black text-amber-600 font-mono mt-1">
            {orders.filter((o) => o.confirmation_status === 'not_called').length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Confirmed for Dispatch</p>
          <p className="text-2xl font-black text-green-600 font-mono mt-1">
            {orders.filter((o) => o.confirmation_status === 'confirmed').length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Total Volume</p>
          <p className="text-2xl font-black text-amber-900 font-mono mt-1">
            {formatPKR(orders.reduce((acc, o) => acc + o.total, 0))}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {['all', 'pending', 'not_called', 'confirmed', 'shipped'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 rounded-xl capitalize transition ${
              activeTab === tab
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider font-semibold border-b">
              <tr>
                <th className="px-6 py-4">Order #</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Items Summary</th>
                <th className="px-6 py-4">Total (PKR)</th>
                <th className="px-6 py-4">Confirmation Call</th>
                <th className="px-6 py-4">Order Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-amber-50/30 transition">
                  <td className="px-6 py-4 font-bold font-mono text-gray-900">{order.order_number}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{order.customer_name}</p>
                    <p className="text-gray-500 font-mono text-[11px]">{order.phone}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{order.city}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{order.items_summary}</td>
                  <td className="px-6 py-4 font-bold font-mono text-amber-900">
                    {formatPKR(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.confirmation_status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : order.confirmation_status === 'not_called'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.confirmation_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'shipped'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleSimulateWebhook(order)}
                      disabled={testingWebhookId === order.id}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-medium text-[11px] transition inline-flex items-center gap-1"
                      title="Trigger webhook for AI Voice call"
                    >
                      <Play className="w-3 h-3" />
                      <span>{testingWebhookId === order.id ? 'Calling...' : 'Trigger AI'}</span>
                    </button>
                    {order.confirmation_status === 'not_called' ? (
                      <button
                        onClick={() => updateConfirmation(order.id, 'confirmed')}
                        className="px-2.5 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-[11px] transition"
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        onClick={() => updateConfirmation(order.id, 'not_called')}
                        className="px-2.5 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium text-[11px] transition"
                      >
                        Reset
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
