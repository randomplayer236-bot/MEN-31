import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Check, Loader2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const LayoutControls = () => {
  const { isAdminMode, saveLayout } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isAdminMode) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveLayout();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save layout:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2"
          >
            <Check size={14} />
            Layout Saved Successfully
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        disabled={isSaving}
        className="bg-gold text-navy px-6 py-3 rounded-full font-display uppercase tracking-widest text-sm font-bold shadow-2xl flex items-center gap-3 hover:bg-ivory transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        {isSaving ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <Save className="group-hover:rotate-12 transition-transform" size={18} />
        )}
        {isSaving ? "Saving..." : "Save Layout"}
      </motion.button>
      
      <div className="bg-navy/80 backdrop-blur-md text-gold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold border border-gold/20">
        Admin Mode: Drag & Resize Elements
      </div>
    </div>
  );
};
