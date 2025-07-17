import React, { useState, useRef } from 'react';
import { Upload, Palette, Sticker, ShoppingCart, Trash2, Eye, RotateCcw } from 'lucide-react'; // Removed Save
import { useDesign } from '../contexts/DesignContext';
import { useNavigate } from 'react-router-dom';
import TShirtCanvas from '../components/TShirtCanvas';
import toast from 'react-hot-toast';

const DesignStudio: React.FC = () => {
  const {
    garmentColor,
    setGarmentColor,
    currentView,
    stickers,
    addSticker,
    removeSticker,
    clearDesign,
    totalPrice,
    basePrice
  } = useDesign();
  
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'designs' | 'text' | 'upload'>('colors');

  const colors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Gray', value: '#6b7280' },
    { name: 'Navy', value: '#1e3a8a' },
    { name: 'Teal', value: '#0d9488' },
    { name: 'Lime', value: '#65a30d' },
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Rose', value: '#f43f5e' }
  ];

  const designCategories = [
    {
      name: 'Animals',
      designs: [
        { src: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', name: 'Cat', price: 5 },
        { src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', name: 'Dog', price: 5 },
        { src: 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', name: 'Bird', price: 4 }
      ]
    },
    {
      name: 'Nature',
      designs: [
        { src: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', name: 'Rose', price: 3 },
        { src: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', name: 'Tree', price: 4 },
        { src: 'https://images.pexels.com/photos/158251/forest-the-sun-morning-tucholskie-158251.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', name: 'Forest', price: 6 }
      ]
    },
    {
      name: 'Symbols',
      designs: [
        { src: 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', name: 'Heart', price: 2 },
        { src: 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', name: 'Star', price: 2 },
        { src: 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', name: 'Lightning', price: 3 }
      ]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        addSticker({
          type: 'custom',
          src,
          x: 30,
          y: 30,
          width: 80,
          height: 80,
          rotation: 0,
          price: 8,
          name: file.name.split('.')[0],
          view: currentView
        });
        toast.success('Custom image added!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDesignAdd = (design: any) => {
    addSticker({
      type: 'template',
      src: design.src,
      x: 120 + Math.random() * 60,
      y: 120 + Math.random() * 60,
      width: 60,
      height: 60,
      rotation: 0,
      price: design.price,
      name: design.name,
      view: currentView
    });
    toast.success(`${design.name} added!`);
  };

  const handleProceedToOrder = () => {
    if (stickers.length === 0 && garmentColor === '#ffffff') {
      toast.error('Please customize your design before ordering');
      return;
    }
    navigate('/order');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Design Studio</h1>
              <p className="text-sm text-gray-600">Create your custom T-shirt</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Price</div>
                <div className="text-2xl font-bold text-green-600">${totalPrice}</div>
              </div>
              <button
                onClick={() => navigate('/preview')}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                3D Preview
              </button>
              <button
                onClick={handleProceedToOrder}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Design Tools Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-32">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: 'colors', label: 'Colors', icon: Palette },
                    { id: 'designs', label: 'Designs', icon: Sticker },
                    { id: 'upload', label: 'Upload', icon: Upload }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mr-1" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-4 max-h-96 overflow-y-auto">
                {activeTab === 'colors' && (
                  <div>
                    <h3 className="font-semibold mb-3">T-shirt Colors</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {colors.map(color => (
                        <button
                          key={color.value}
                          onClick={() => setGarmentColor(color.value)}
                          className={`relative w-full aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                            garmentColor === color.value 
                              ? 'border-blue-500 ring-2 ring-blue-200' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        >
                          {color.value === '#ffffff' && (
                            <div className="absolute inset-0 bg-gray-100 rounded-md opacity-20" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Color
                      </label>
                      <input
                        type="color"
                        value={garmentColor}
                        onChange={(e) => setGarmentColor(e.target.value)}
                        className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'designs' && (
                  <div className="space-y-4">
                    {designCategories.map(category => (
                      <div key={category.name}>
                        <h4 className="font-medium text-gray-900 mb-2">{category.name}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {category.designs.map((design, index) => (
                            <button
                              key={index}
                              onClick={() => handleDesignAdd(design)}
                              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <img
                                src={design.src}
                                alt={design.name}
                                className="w-full h-16 object-cover rounded mb-1 group-hover:scale-105 transition-transform"
                              />
                              <div className="text-xs font-medium text-gray-900">{design.name}</div>
                              <div className="text-xs text-green-600">${design.price}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'upload' && (
                  <div>
                    <h3 className="font-semibold mb-3">Upload Your Design</h3>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400 group-hover:text-blue-500" />
                      <div className="text-sm font-medium text-gray-900 mb-1">Click to upload</div>
                      <div className="text-xs text-gray-500">PNG, JPG up to 10MB</div>
                      <div className="text-xs text-green-600 mt-1">+$8.00</div>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 p-4 space-y-2">
                <button
                  onClick={clearDesign}
                  className="w-full flex items-center justify-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Design
                </button>
              </div>
            </div>
          </div>

          {/* Main Design Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Your Design</h2>
                  <p className="text-sm text-gray-600">Drag and drop elements to customize</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    Base: <span className="font-medium">${basePrice}</span>
                  </div>
                  {stickers.length > 0 && (
                    <div className="text-sm text-gray-600">
                      Add-ons: <span className="font-medium">${totalPrice - basePrice}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                <TShirtCanvas width={500} height={600} />
              </div>

              {/* Design Elements List */}
              {stickers.filter(s => s.view === currentView).length > 0 && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="font-semibold mb-3">Design Elements - {currentView.charAt(0).toUpperCase() + currentView.slice(1)} ({stickers.filter(s => s.view === currentView).length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {stickers.filter(s => s.view === currentView).map(sticker => (
                      <div key={sticker.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img src={sticker.src} alt={sticker.name} className="w-8 h-8 object-cover rounded" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sticker.name}</div>
                            <div className="text-xs text-green-600">${sticker.price}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeSticker(sticker.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;