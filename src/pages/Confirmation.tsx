import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Home, Shirt } from 'lucide-react';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const currentOrder = JSON.parse(localStorage.getItem('sketchtostitch_current_order') || '{}');

  const handleDownloadReceipt = () => {
    const receiptData = {
      orderNumber: currentOrder.id,
      date: new Date().toLocaleDateString(),
      items: currentOrder.stickers?.map((s: any) => s.name).join(', ') || 'Custom Design',
      total: currentOrder.totalPrice,
      customerName: currentOrder.name,
      customerEmail: currentOrder.email
    };

    const receipt = `
SKETCHTOSTITCH ORDER RECEIPT
============================

Order Number: ${receiptData.orderNumber}
Date: ${receiptData.date}
Customer: ${receiptData.customerName}
Email: ${receiptData.customerEmail}

Items: ${receiptData.items}
Total: $${receiptData.total}

Thank you for your order!
    `;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receiptData.orderNumber}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!currentOrder.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No order found</h2>
          <button
            onClick={() => navigate('/design')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Design
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order. We'll start working on it right away.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Order Details</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">#{currentOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">{currentOrder.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{currentOrder.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-blue-600">${currentOrder.totalPrice}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3">Shipping Address</h4>
              <div className="text-sm text-gray-600">
                <p>{currentOrder.name}</p>
                <p>{currentOrder.address}</p>
                <p>{currentOrder.city}, {currentOrder.state} {currentOrder.zipCode}</p>
                <p>{currentOrder.phone}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Order Processing</h4>
                  <p className="text-sm text-gray-600">We're preparing your custom design for production</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Manufacturing</h4>
                  <p className="text-sm text-gray-600">Your garment will be carefully crafted with your design</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Shipping</h4>
                  <p className="text-sm text-gray-600">Free shipping, delivered in 5-7 business days</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <h4 className="font-semibold text-green-900">Confirmation Email Sent</h4>
                  <p className="text-sm text-green-800">
                    We've sent a confirmation email to {currentOrder.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Receipt
          </button>
          <button
            onClick={() => navigate('/design')}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Shirt className="h-5 w-5 mr-2" />
            Create Another Design
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;