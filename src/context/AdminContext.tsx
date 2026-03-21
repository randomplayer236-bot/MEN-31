import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, LOOKBOOK as INITIAL_LOOKBOOK } from '../constants';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

interface LookbookItem {
  id: string;
  image: string;
  title: string;
}

interface VideoItem {
  id: string;
  url: string;
  title: string;
}

interface AdminContextType {
  isAdminMode: boolean;
  setIsAdminMode: (value: boolean) => void;
  products: Product[];
  lookbook: LookbookItem[];
  videos: VideoItem[];
  updateProductImage: (id: string, newImageUrl: string) => void;
  updateLookbookImage: (id: string, newImageUrl: string) => void;
  addProduct: (product: Product) => void;
  addLookbookItem: (item: LookbookItem) => void;
  addVideo: (video: VideoItem) => void;
  removeProduct: (id: string) => void;
  removeLookbookItem: (id: string) => void;
  removeVideo: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('men31_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [lookbook, setLookbook] = useState<LookbookItem[]>(() => {
    const saved = localStorage.getItem('men31_lookbook');
    return saved ? JSON.parse(saved) : INITIAL_LOOKBOOK;
  });
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('men31_videos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('men31_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('men31_lookbook', JSON.stringify(lookbook));
  }, [lookbook]);

  useEffect(() => {
    localStorage.setItem('men31_videos', JSON.stringify(videos));
  }, [videos]);

  const updateProductImage = (id: string, newImageUrl: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, image: newImageUrl } : p));
  };

  const updateLookbookImage = (id: string, newImageUrl: string) => {
    setLookbook(prev => prev.map(item => item.id === id ? { ...item, image: newImageUrl } : item));
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const addLookbookItem = (item: LookbookItem) => {
    setLookbook(prev => [...prev, item]);
  };

  const addVideo = (video: VideoItem) => {
    setVideos(prev => [...prev, video]);
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const removeLookbookItem = (id: string) => {
    setLookbook(prev => prev.filter(item => item.id !== id));
  };

  const removeVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  return (
    <AdminContext.Provider value={{ 
      isAdminMode, 
      setIsAdminMode, 
      products, 
      lookbook, 
      videos,
      updateProductImage, 
      updateLookbookImage,
      addProduct,
      addLookbookItem,
      addVideo,
      removeProduct,
      removeLookbookItem,
      removeVideo
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
