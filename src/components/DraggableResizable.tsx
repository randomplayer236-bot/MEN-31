import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { useAdmin } from '../context/AdminContext';
import { Maximize2, Move } from 'lucide-react';

interface DraggableResizableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const DraggableResizable: React.FC<DraggableResizableProps> = ({ id, children, className = "" }) => {
  const { isAdminMode, layoutSettings, updateElementLayout } = useAdmin();
  const layout = (layoutSettings?.elements?.[id]) || { x: 0, y: 0, scale: 1 };
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isAdminMode) {
    return (
      <div 
        className={className}
        style={{ 
          transform: `translate(${layout.x}px, ${layout.y}px) scale(${layout.scale})`,
          transition: 'none'
        }}
      >
        {children}
      </div>
    );
  }

  const handleDragEnd = (_: any, info: any) => {
    if (isResizing) return;
    updateElementLayout(id, { 
      x: layout.x + info.offset.x, 
      y: layout.y + info.offset.y 
    });
  };

  const handleResize = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startScale = layout.scale;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const deltaX = currentX - startX;
      const newScale = Math.max(0.2, startScale + deltaX / 200);
      updateElementLayout(id, { scale: newScale });
    };

    const onUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
  };

  return (
    <motion.div
      ref={containerRef}
      drag={!isResizing}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onDragStart={(e) => {
        // Prevent default browser drag behavior for links/images
        if (isAdminMode) e.preventDefault();
      }}
      className={`relative group ${className}`}
      style={{ 
        x: layout.x, 
        y: layout.y, 
        scale: layout.scale,
        cursor: isResizing ? 'nwse-resize' : 'move',
        zIndex: 50,
        touchAction: 'none',
        userSelect: 'none'
      }}
    >
      {/* Drag Overlay - Captures mouse events for dragging */}
      <div className="absolute inset-0 z-10" />
      
      {/* Admin Overlay Border */}
      <div className="absolute -inset-2 border-2 border-dashed border-gold/40 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20" />
      
      {/* Drag Handle Icon */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gold text-navy p-1 rounded-t-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        <Move size={12} />
      </div>

      <div className="relative z-0">
        {children}
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleResize}
        onTouchStart={handleResize}
        className="absolute -bottom-2 -right-2 w-6 h-6 bg-gold text-navy rounded-full flex items-center justify-center cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-lg hover:scale-110 active:scale-95"
      >
        <Maximize2 size={12} />
      </div>
    </motion.div>
  );
};
