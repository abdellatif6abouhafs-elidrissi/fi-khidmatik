'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Button from './Button';
import Card from './Card';
import { CreditCard, Lock } from 'lucide-react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

interface PaymentFormContentProps {
  bookingId: string;
  amount: number;
  locale: string;
  onSuccess: () => void;
}

const PaymentFormContent: React.FC<PaymentFormContentProps> = ({
  bookingId,
  amount,
  locale,
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'An error occurred');
        setIsProcessing(false);
        return;
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
        });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm payment on backend
        await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        });

        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card variant="outlined" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900">
              {locale === 'ar' ? 'معلومات الدفع' : 'Informations de paiement'}
            </h3>
            <p className="text-gray-600 font-medium">
              {locale === 'ar'
                ? `المبلغ الإجمالي: ${amount} DH`
                : `Montant total: ${amount} DH`}
            </p>
          </div>
        </div>

        <PaymentElement />

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            isLoading={isProcessing}
            disabled={!stripe || isProcessing}
            className="w-full"
          >
            <Lock className="w-5 h-5" />
            {locale === 'ar'
              ? `ادفع ${amount} DH`
              : `Payer ${amount} DH`}
          </Button>
          <p className="text-center text-sm text-gray-500 font-medium mt-3">
            <Lock className="w-4 h-4 inline mr-1" />
            {locale === 'ar'
              ? 'دفع آمن ومشفر بواسطة Stripe'
              : 'Paiement sécurisé par Stripe'}
          </p>
        </div>
      </Card>
    </form>
  );
};

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  locale: string;
  onSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: props.bookingId }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setClientSecret(data.clientSecret);
    } catch (err: any) {
      setError(err.message || 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card variant="outlined" padding="lg">
        <p className="text-red-600 font-medium">{error}</p>
      </Card>
    );
  }

  if (!clientSecret) {
    return null;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
        },
      }}
    >
      <PaymentFormContent {...props} />
    </Elements>
  );
};

export default PaymentForm;
