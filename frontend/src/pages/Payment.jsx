import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { paymentService } from '../services/paymentService';
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  Receipt,
  Smartphone,
  Building
} from 'lucide-react';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId') || '1';
  const amount = searchParams.get('amount') || '594.98';
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [cardNumber, setCardNumber] = useState('4532 8821 9012 8892');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('742');
  const [upiId, setUpiId] = useState('traveler@okhdfcbank');
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    try {
      const payload = {
        bookingId: Number(bookingId),
        amount: Number(amount),
        paymentMethod
      };
      const result = await paymentService.processPayment(payload);
      setReceipt(result);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment processing failed. Please retry.');
    } finally {
      setProcessing(false);
    }
  };

  if (receipt) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Payment Successful!</h1>
          <p className="text-xs text-slate-500">
            Your tour booking is now fully confirmed. Safe travels!
          </p>
        </div>

        {/* Receipt Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-left space-y-3 text-xs">
          <div className="flex justify-between border-b pb-3 font-semibold text-slate-500">
            <span>Transaction ID</span>
            <span className="font-mono text-slate-900 font-bold">{receipt.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Booking ID</span>
            <span className="font-bold text-slate-800">#{receipt.bookingId || bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount Paid</span>
            <span className="font-extrabold text-blue-600 text-sm">${amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment Method</span>
            <span className="font-medium text-slate-800">{receipt.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status</span>
            <span className="font-bold text-emerald-600">CONFIRMED</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            to="/my-bookings"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            Go to My Bookings
          </Link>
          <Link
            to="/"
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Step 2 of 2: Secure Checkout
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
          Complete Your Payment
        </h1>
        <p className="text-xs text-slate-500">
          All transactions are 256-bit SSL encrypted and protected with verified fraud guards.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        {/* Payment Amount Display */}
        <div className="p-4 rounded-2xl bg-slate-50 flex items-center justify-between border border-slate-100">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">Total Payable</span>
            <span className="text-2xl font-black text-slate-900">${amount}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Booking Reference</span>
            <span className="text-xs font-mono font-bold text-blue-600">ID #{bookingId}</span>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('CREDIT_CARD')}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                paymentMethod === 'CREDIT_CARD'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('UPI')}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                paymentMethod === 'UPI'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span>UPI / QR</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('NET_BANKING')}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                paymentMethod === 'NET_BANKING'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Building className="w-5 h-5" />
              <span>Net Banking</span>
            </button>
          </div>
        </div>

        {/* Payment Form Fields */}
        <form onSubmit={handlePay} className="space-y-4">
          {paymentMethod === 'CREDIT_CARD' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'UPI' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Virtual Payment Address (VPA / UPI ID)</label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@okhdfcbank"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          {paymentMethod === 'NET_BANKING' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Bank</label>
              <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500 focus:outline-none">
                <option>HDFC Bank</option>
                <option>State Bank of India</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Citibank</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={processing}
            className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-emerald-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            <Lock className="w-4 h-4" />
            <span>{processing ? 'Processing Payment...' : `Pay $${amount} Securely`}</span>
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 256-Bit SSL Protection
          </span>
          <span>•</span>
          <span>Instant Confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
