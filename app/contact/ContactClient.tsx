'use client';

import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function ContactClient() {
  const { lang, t, isUrdu } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
          {isUrdu ? 'ہم سے رابطہ کریں' : 'Contact Bin Nasir'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {isUrdu
            ? 'کسی بھی سوال، رہنمائی، یا ہول سیل / گفٹ آرڈرز کے لیے ہماری کسٹمر سپورٹ ٹیم سے رابطہ کریں۔'
            : 'Have questions, need help with your order, or planning corporate gift packs? We are here for you.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-3">
              {isUrdu ? 'براہ راست رابطہ' : 'Direct Channels'}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-stone-900">WhatsApp & Phone</h5>
                  <a
                    href="https://wa.me/923001788080"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline font-mono text-sm font-bold block mt-0.5"
                  >
                    0300-1788080
                  </a>
                  <span className="text-[11px] text-stone-400">Available 9 AM to 11 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-stone-900">Email Support</h5>
                  <p className="text-stone-600 font-mono text-xs mt-0.5">contact@binnasir.pk</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-stone-900">Offices & Logistics Hub</h5>
                  <p className="text-stone-600 text-xs mt-0.5">
                    Chakwal Road & Lahore Fulfillment Center, Punjab, Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-xl space-y-3">
            <h4 className="font-serif font-bold text-base">
              {isUrdu ? 'فوری واٹس ایپ بات چیت' : 'Instant WhatsApp Assistance'}
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              {isUrdu
                ? 'کسی بھی وقت واٹس ایپ پر میسج بھیج کر فوری جواب اور رہنمائی حاصل کریں۔'
                : 'Send a quick message on WhatsApp for instant confirmation, tracking updates, and queries.'}
            </p>
            <a
              href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-black text-xs shadow-md hover:bg-emerald-50 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isUrdu ? 'واٹس ایپ کھولیں' : 'Open WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 border-b border-stone-100 pb-3">
              {isUrdu ? 'پیغام بھیجیں' : 'Send us a Message'}
            </h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-emerald-950">
                  {isUrdu ? 'شکریہ! آپ کا پیغام موصول ہو چکا ہے' : 'Thank You! Message Received'}
                </h4>
                <p className="text-xs text-emerald-800">
                  {isUrdu
                    ? 'ہماری ٹیم جلد از جلد آپ سے رابطہ کرے گی۔'
                    : 'Our customer support representative will get back to you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="font-bold text-stone-800 block mb-1.5">
                    {t.fullNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1.5">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1788080"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1.5">
                    {isUrdu ? 'آپ کا پیغام / سوال *' : 'Your Message / Inquiry *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isUrdu
                        ? 'اپنا سوال یا تفصیل یہاں درج کریں...'
                        : 'How can we help you? Feel free to ask about custom quantities, orders, or delivery.'
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-600/25 transition active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{isUrdu ? 'پیغام ارسال کریں' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
