import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Edit3, RotateCcw, Download } from 'lucide-react';
import { useDesign } from '../contexts/DesignContext';
import ThreeModel from '../components/ThreeModel';

const Preview3D: React.FC = () => {
  const { stickers, totalPrice, garmentColor, basePrice } = useDesign();
  const navigate = useNavigate();

  const handleDownloadPreview = () => {
    // This would typically capture the 3D canvas and download it
    // For now, we'll show a toast message
    alert('3D preview download feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Design
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">3D Preview</h1>
                <p className="text-sm text-gray-600">Realistic view of your custom design</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Price</div>
                <div className="text-2xl font-bold text-green-600">${totalPrice}</div>
              </div>
              <button
                onClick={handleDownloadPreview}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button
                onClick={() => navigate('/order')}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Model */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-center mb-6">
                <ThreeModel width={600} height={600} />
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Your design is shown on a realistic 3D model. The garment rotates automatically to show all angles.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => navigate('/design')}
                    className="flex items-center px-6 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Design
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Refresh View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Design Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Design Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Design Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Garment</h4>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: garmentColor }}
                    />
                    <div>
                      <div className="text-sm font-medium">Classic T-Shirt</div>
                      <div className="text-xs text-gray-500">{garmentColor}</div>
                    </div>
                  </div>
                </div>

                {stickers.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Design Elements ({stickers.length})</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {stickers.map(sticker => (
                        <div key={sticker.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <img src={sticker.src} alt={sticker.name} className="w-6 h-6 object-cover rounded" />
                            <span className="text-sm">{sticker.name}</span>
                          </div>
                          <span className="text-sm text-green-600 font-medium">${sticker.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Price:</span>
                      <span>${basePrice}</span>
                    </div>
                    {stickers.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Design Elements:</span>
                        <span>${totalPrice - basePrice}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-green-600">${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Process */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Ready to Order?</h4>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>High-quality printing on premium fabric</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>5-7 business days delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>100% satisfaction guarantee</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/order')}
                className="w-full mt-4 flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Place Order - ${totalPrice}
              </button>
            </div>

            {/* Size Guide */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Size Guide</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Small (S):</span>
                  <span>36-38" chest</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium (M):</span>
                  <span>38-40" chest</span>
                </div>
                <div className="flex justify-between">
                  <span>Large (L):</span>
                  <span>40-42" chest</span>
                </div>
                <div className="flex justify-between">
                  <span>X-Large (XL):</span>
                  <span>42-44" chest</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview3D;