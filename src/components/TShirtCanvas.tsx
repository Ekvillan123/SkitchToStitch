import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image, Transformer, Rect } from 'react-konva';
import { useDesign } from '../contexts/DesignContext';
import Konva from 'konva';

interface TShirtCanvasProps {
  width: number;
  height: number;
}

type ViewType = 'front' | 'back' | 'left' | 'right';

const TShirtCanvas: React.FC<TShirtCanvasProps> = ({ width, height }) => {
  const { garmentColor, stickers, updateSticker, removeSticker, currentView, setCurrentView } = useDesign();
  const [images, setImages] = useState<{ [key: string]: HTMLImageElement }>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tshirtImage, setTshirtImage] = useState<HTMLImageElement | null>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const stageRef = useRef<Konva.Stage>(null);

  // Create realistic T-shirt SVG for different views
  useEffect(() => {
    const createTShirtSVG = (view: ViewType) => {
      let svg = '';
      
      switch (view) {
        case 'front':
          svg = `
            <svg width="300" height="360" viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
                <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:${garmentColor};stop-opacity:0.8" />
                  <stop offset="50%" style="stop-color:${garmentColor};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:${garmentColor};stop-opacity:0.9" />
                </linearGradient>
              </defs>
              <path d="M75 80 L75 340 L225 340 L225 80 L200 80 L200 60 C200 45 185 30 150 30 C115 30 100 45 100 60 L100 80 Z" 
                    fill="url(#shirtGradient)" 
                    stroke="#ddd" 
                    stroke-width="1" 
                    filter="url(#shadow)"/>
              <ellipse cx="60" cy="100" rx="25" ry="40" fill="${garmentColor}" stroke="#ddd" stroke-width="1"/>
              <ellipse cx="240" cy="100" rx="25" ry="40" fill="${garmentColor}" stroke="#ddd" stroke-width="1"/>
              <ellipse cx="150" cy="65" rx="25" ry="15" fill="none" stroke="#ddd" stroke-width="1"/>
              <rect x="90" y="90" width="120" height="160" fill="none" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
            </svg>
          `;
          break;
        case 'back':
          svg = `
            <svg width="300" height="360" viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
                <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:${garmentColor};stop-opacity:0.9" />
                  <stop offset="50%" style="stop-color:${garmentColor};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:${garmentColor};stop-opacity:0.8" />
                </linearGradient>
              </defs>
              <path d="M75 80 L75 340 L225 340 L225 80 L200 80 L200 60 C200 45 185 30 150 30 C115 30 100 45 100 60 L100 80 Z" 
                    fill="url(#shirtGradient)" 
                    stroke="#ddd" 
                    stroke-width="1" 
                    filter="url(#shadow)"/>
              <ellipse cx="60" cy="100" rx="25" ry="40" fill="${garmentColor}" stroke="#ddd" stroke-width="1"/>
              <ellipse cx="240" cy="100" rx="25" ry="40" fill="${garmentColor}" stroke="#ddd" stroke-width="1"/>
              <path d="M125 65 Q150 55 175 65" fill="none" stroke="#ddd" stroke-width="1"/>
              <rect x="90" y="90" width="120" height="160" fill="none" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
            </svg>
          `;
          break;
        case 'left':
          svg = `
            <svg width="300" height="360" viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
                <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:${garmentColor};stop-opacity:0.7" />
                  <stop offset="100%" style="stop-color:${garmentColor};stop-opacity:1" />
                </linearGradient>
              </defs>
              <path d="M100 80 L100 340 L200 340 L200 80 L180 80 L180 60 C180 45 165 30 150 30 C135 30 120 45 120 60 L120 80 Z" 
                    fill="url(#shirtGradient)" 
                    stroke="#ddd" 
                    stroke-width="1" 
                    filter="url(#shadow)"/>
              <ellipse cx="80" cy="100" rx="30" ry="45" fill="${garmentColor}" stroke="#ddd" stroke-width="1"/>
              <line x1="100" y1="80" x2="100" y2="340" stroke="#ccc" stroke-width="1"/>
              <rect x="110" y="90" width="80" height="160" fill="none" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
            </svg>
          `;
          break;
        case 'right':
          svg = `
            <svg width="300" height="360" viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
                <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:${garmentColor};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:${garmentColor};stop-opacity:0.7" />
                </linearGradient>
              </defs>
              <path d="M100 80 L100 340 L200 340 L200 80 L180 80 L180 60 C180 45 165 30 150 30 C135 30 120 45 120 60 L120 80 Z" 
                    fill="url(#shirtGradient)" 
                    stroke="#ddd" 
                    stroke-width="1" 
                    filter="url(#shadow)"/>
              <ellipse cx="220" cy="100" rx="30" ry="45" fill="${garmentColor}" stroke="#ddd" stroke-width="1"/>
              <line x1="200" y1="80" x2="200" y2="340" stroke="#ccc" stroke-width="1"/>
              <rect x="110" y="90" width="80" height="160" fill="none" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
            </svg>
          `;
          break;
      }
      
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new window.Image();
      img.onload = () => {
        setTshirtImage(img);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };

    createTShirtSVG(currentView);
  }, [garmentColor, currentView]);

  // Load sticker images
  useEffect(() => {
    const loadImages = async () => {
      const currentViewStickers = stickers.filter(s => s.view === currentView);
      
      const imagePromises = currentViewStickers.map(sticker => {
        return new Promise<{ id: string; image: HTMLImageElement }>((resolve, reject) => {
          const img = new window.Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve({ id: sticker.id, image: img });
          img.onerror = reject;
          img.src = sticker.src;
        });
      });

      try {
        const loadedImages = await Promise.all(imagePromises);
        const imageMap = loadedImages.reduce((acc, { id, image }) => {
          acc[id] = image;
          return acc;
        }, {} as { [key: string]: HTMLImageElement });
        setImages(imageMap);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    if (stickers.length > 0) {
      loadImages();
    } else {
      setImages({});
    }
  }, [stickers, currentView]);

  // Handle transformer
  useEffect(() => {
    if (selectedId && transformerRef.current && layerRef.current) {
      const node = layerRef.current.findOne(`#${selectedId}`);
      if (node) {
        // Ensure the node is a Konva.Node and cast it to attach the transformer
        transformerRef.current.nodes([node as Konva.Node]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
    }
  }, [selectedId]);

  const handleStickerClick = (id: string) => {
    setSelectedId(id);
  };

  // Explicitly typing the event object for Konva events
  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage() || e.target.name() === 'tshirt' || e.target.name() === 'background') {
      setSelectedId(null);
    }
  };

  const getDesignArea = () => {
    const baseX = (width - 300) / 2;
    const baseY = (height - 360) / 2;
    
    switch (currentView) {
      case 'front':
      case 'back':
        return {
          x: baseX + 90,
          y: baseY + 90,
          width: 120,
          height: 160
        };
      case 'left':
      case 'right':
        return {
          x: baseX + 110,
          y: baseY + 90,
          width: 80,
          height: 160
        };
      default:
        return {
          x: baseX + 90,
          y: baseY + 90,
          width: 120,
          height: 160
        };
    }
  };

  // Explicitly typing the node parameter as Konva.Image
  const handleStickerTransform = (id: string, node: Konva.Image) => {
    const designArea = getDesignArea();
    
    // Get the absolute transform
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    // Calculate new dimensions
    const newWidth = Math.max(20, node.width() * scaleX);
    const newHeight = Math.max(20, node.height() * scaleY);
    
    // Reset scale to 1 and apply the new dimensions
    node.scaleX(1);
    node.scaleY(1);
    node.width(newWidth);
    node.height(newHeight);
    
    // Constrain position to design area
    const x = Math.max(designArea.x, Math.min(node.x(), designArea.x + designArea.width - newWidth));
    const y = Math.max(designArea.y, Math.min(node.y(), designArea.y + designArea.height - newHeight));
    
    node.x(x);
    node.y(y);
    
    updateSticker(id, {
      x: x - designArea.x,
      y: y - designArea.y,
      width: newWidth,
      height: newHeight,
      rotation: node.rotation()
    });
  };

  // Explicitly typing the node parameter as Konva.Image
  const handleStickerDragEnd = (id: string, node: Konva.Image) => {
    const designArea = getDesignArea();
    
    // Constrain position to design area
    const x = Math.max(designArea.x, Math.min(node.x(), designArea.x + designArea.width - node.width()));
    const y = Math.max(designArea.y, Math.min(node.y(), designArea.y + designArea.height - node.height()));
    
    node.x(x);
    node.y(y);
    
    updateSticker(id, {
      x: x - designArea.x,
      y: y - designArea.y
    });
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Delete' && selectedId) {
      removeSticker(selectedId);
      setSelectedId(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedId, removeSticker, setSelectedId]);

  const currentViewStickers = stickers.filter(s => s.view === currentView);
  const designArea = getDesignArea();

  return (
    <div className="relative">
      {/* View Selector */}
      <div className="flex justify-center mb-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex">
          {(['front', 'back', 'left', 'right'] as ViewType[]).map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                currentView === view
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 flex items-center justify-center border border-gray-200">
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onClick={handleStageClick}
          onTap={handleStageClick}
        >
          <Layer ref={layerRef}>
            {/* Background */}
            <Rect
              name="background"
              width={width}
              height={height}
              fill="transparent"
            />
            
            {/* T-shirt base */}
            {tshirtImage && (
              <Image
                name="tshirt"
                image={tshirtImage}
                x={(width - 300) / 2}
                y={(height - 360) / 2}
                width={300}
                height={360}
              />
            )}
            
            {/* Stickers for current view */}
            {currentViewStickers.map(sticker => {
              const image = images[sticker.id];
              if (!image) return null;

              return (
                <Image
                  key={sticker.id}
                  id={sticker.id}
                  image={image}
                  x={designArea.x + sticker.x}
                  y={designArea.y + sticker.y}
                  width={sticker.width}
                  height={sticker.height}
                  rotation={sticker.rotation}
                  draggable
                  onClick={() => handleStickerClick(sticker.id)}
                  onTap={() => handleStickerClick(sticker.id)}
                  onDragEnd={(e) => handleStickerDragEnd(sticker.id, e.target as Konva.Image)}
                  onTransformEnd={(e) => handleStickerTransform(sticker.id, e.target as Konva.Image)}
                  dragBoundFunc={(pos: Konva.Vector2d) => {
                    return {
                      x: Math.max(designArea.x, Math.min(pos.x, designArea.x + designArea.width - sticker.width)),
                      y: Math.max(designArea.y, Math.min(pos.y, designArea.y + designArea.height - sticker.height))
                    };
                  }}
                />
              );
            })}
            
            {/* Transformer */}
            <Transformer
              ref={transformerRef}
              // Corrected type for oldBox and newBox parameters to 'ReturnType<typeof transformerRef.current.getClientRect>'
              // This dynamically gets the expected Box type from the transformer itself.
              boundBoxFunc={(oldBox, newBox) => {
                // Minimum size constraints
                if (newBox.width < 20 || newBox.height < 20) {
                  return oldBox;
                }
                
                // Maximum size constraints (design area)
                if (newBox.width > designArea.width || newBox.height > designArea.height) {
                  return oldBox;
                }
                
                // Ensure rotation is always a number (it should be from the Box type)
                return {
                  x: newBox.x,
                  y: newBox.y,
                  width: newBox.width,
                  height: newBox.height,
                  rotation: newBox.rotation || 0 // Provide a default of 0 if for some reason it's undefined
                };
              }}
              keepRatio={false}
              enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
            />
          </Layer>
        </Stage>
      </div>
      
      {selectedId && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Press Delete to remove
        </div>
      )}
      
      {currentViewStickers.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-gray-400 mt-16">
            <div className="text-lg font-medium mb-2">Design the {currentView} side</div>
            <div className="text-sm">Add colors, stickers, or upload your own images</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TShirtCanvas;