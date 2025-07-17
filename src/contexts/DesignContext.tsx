import React, { createContext, useContext, useState, useCallback } from 'react';

interface Sticker {
  id: string;
  type: 'template' | 'custom';
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  price: number;
  name: string;
  view: 'front' | 'back' | 'left' | 'right';
}

interface DesignContextType {
  selectedGarment: string;
  setSelectedGarment: (garment: string) => void;
  garmentColor: string;
  setGarmentColor: (color: string) => void;
  currentView: 'front' | 'back' | 'left' | 'right';
  setCurrentView: (view: 'front' | 'back' | 'left' | 'right') => void;
  stickers: Sticker[];
  addSticker: (sticker: Omit<Sticker, 'id'>) => void;
  updateSticker: (id: string, updates: Partial<Sticker>) => void;
  removeSticker: (id: string) => void;
  clearDesign: () => void;
  totalPrice: number;
  basePrice: number;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};

export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGarment, setSelectedGarment] = useState('t-shirt');
  const [garmentColor, setGarmentColor] = useState('#ffffff');
  const [currentView, setCurrentView] = useState<'front' | 'back' | 'left' | 'right'>('front');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  
  const basePrice = 25; // Base price for garment

  const addSticker = useCallback((sticker: Omit<Sticker, 'id'>) => {
    const newSticker: Sticker = {
      ...sticker,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setStickers(prev => [...prev, newSticker]);
  }, []);

  const updateSticker = useCallback((id: string, updates: Partial<Sticker>) => {
    setStickers(prev => prev.map(sticker => 
      sticker.id === id ? { ...sticker, ...updates } : sticker
    ));
  }, []);

  const removeSticker = useCallback((id: string) => {
    setStickers(prev => prev.filter(sticker => sticker.id !== id));
  }, []);

  const clearDesign = useCallback(() => {
    setStickers([]);
    setGarmentColor('#ffffff');
  }, []);

  const totalPrice = basePrice + stickers.reduce((sum, sticker) => sum + sticker.price, 0);

  return (
    <DesignContext.Provider value={{
      selectedGarment,
      setSelectedGarment,
      garmentColor,
      setGarmentColor,
      currentView,
      setCurrentView,
      stickers,
      addSticker,
      updateSticker,
      removeSticker,
      clearDesign,
      totalPrice,
      basePrice
    }}>
      {children}
    </DesignContext.Provider>
  );
};