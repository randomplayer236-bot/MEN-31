import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  setDoc, 
  doc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { Product, LookbookItem } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, LOOKBOOK as INITIAL_LOOKBOOK } from '../constants';

interface VideoItem {
  id: string;
  url: string;
  title: string;
}

interface ElementLayout {
  x: number;
  y: number;
  scale: number;
}

interface LayoutSettings {
  elements: Record<string, ElementLayout>;
}

interface AdminContextType {
  isAdminMode: boolean;
  setIsAdminMode: (value: boolean) => void;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  products: Product[];
  lookbook: LookbookItem[];
  videos: VideoItem[];
  siteLogo: string | null;
  heroImage: string | null;
  philosophyImage: string | null;
  aboutImage: string | null;
  showCollection: boolean;
  setShowCollection: (value: boolean) => void;
  layoutSettings: LayoutSettings;
  updateElementLayout: (id: string, layout: Partial<ElementLayout>) => void;
  saveLayout: () => Promise<void>;
  updateProductImage: (id: string, newImageUrl: string) => Promise<void>;
  updateLookbookImage: (id: string, newImageUrl: string) => Promise<void>;
  updateSiteLogo: (newLogoUrl: string) => Promise<void>;
  updateHeroImage: (newHeroUrl: string) => Promise<void>;
  updatePhilosophyImage: (newUrl: string) => Promise<void>;
  updateAboutImage: (newUrl: string) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  addLookbookItem: (item: LookbookItem) => Promise<void>;
  addVideo: (video: VideoItem) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  removeLookbookItem: (id: string) => Promise<void>;
  removeVideo: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_USERNAME = "sam";
const ADMIN_PASSWORD = "sam2006";

const DEFAULT_LAYOUT: LayoutSettings = {
  elements: {}
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem('men31_admin_auth_v4') === 'true';
  });
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [lookbook, setLookbook] = useState<LookbookItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [siteLogo, setSiteLogo] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [philosophyImage, setPhilosophyImage] = useState<string | null>(null);
  const [aboutImage, setAboutImage] = useState<string | null>(null);
  const [showCollection, setShowCollection] = useState(false);
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>(DEFAULT_LAYOUT);

  useEffect(() => {
    // No longer using Firebase Auth for admin check
    setLoading(false);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Product);
      setProducts(data.length > 0 ? data : INITIAL_PRODUCTS);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'lookbook'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbData = snapshot.docs.map(doc => doc.data() as LookbookItem);
      
      // Merge: Start with initial data, then override with database data
      const merged = INITIAL_LOOKBOOK.map(initialItem => {
        const dbItem = dbData.find(d => d.id === initialItem.id);
        return dbItem || initialItem;
      });

      // Add any items from DB that aren't in INITIAL_LOOKBOOK
      const extraItems = dbData.filter(d => !INITIAL_LOOKBOOK.some(i => i.id === d.id));
      
      setLookbook([...merged, ...extraItems]);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'videos'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as VideoItem);
      setVideos(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'site'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setSiteLogo(data.logo);
        setHeroImage(data.heroImage || 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1920');
        setPhilosophyImage(data.philosophyImage || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000');
        setAboutImage(data.aboutImage || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000');
        if (data.layout) {
          setLayoutSettings({
            elements: data.layout.elements || {}
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      localStorage.setItem('men31_admin_auth_v4', 'true');
      return true;
    }
    return false;
  };

  const logout = async () => {
    setIsAdminMode(false);
    localStorage.removeItem('men31_admin_auth_v4');
  };

  const updateElementLayout = (id: string, layout: Partial<ElementLayout>) => {
    setLayoutSettings(prev => ({
      ...prev,
      elements: {
        ...prev.elements,
        [id]: {
          ...(prev.elements[id] || { x: 0, y: 0, scale: 1 }),
          ...layout
        }
      }
    }));
  };

  const saveLayout = async () => {
    await setDoc(doc(db, 'settings', 'site'), { layout: layoutSettings }, { merge: true });
  };

  const updateProductImage = async (id: string, newImageUrl: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      await setDoc(doc(db, 'products', id), { ...product, image: newImageUrl });
    }
  };

  const updateLookbookImage = async (id: string, newImageUrl: string) => {
    const item = lookbook.find(item => item.id === id);
    if (item) {
      await setDoc(doc(db, 'lookbook', id), { ...item, image: newImageUrl });
    }
  };

  const updateSiteLogo = async (newLogoUrl: string) => {
    await setDoc(doc(db, 'settings', 'site'), { logo: newLogoUrl }, { merge: true });
  };

  const updateHeroImage = async (newHeroUrl: string) => {
    await setDoc(doc(db, 'settings', 'site'), { heroImage: newHeroUrl }, { merge: true });
  };

  const updatePhilosophyImage = async (newUrl: string) => {
    await setDoc(doc(db, 'settings', 'site'), { philosophyImage: newUrl }, { merge: true });
  };

  const updateAboutImage = async (newUrl: string) => {
    await setDoc(doc(db, 'settings', 'site'), { aboutImage: newUrl }, { merge: true });
  };

  const addProduct = async (product: Product) => {
    await setDoc(doc(db, 'products', product.id), product);
  };

  const addLookbookItem = async (item: LookbookItem) => {
    await setDoc(doc(db, 'lookbook', item.id), item);
  };

  const addVideo = async (video: VideoItem) => {
    await setDoc(doc(db, 'videos', video.id), video);
  };

  const removeProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  };

  const removeLookbookItem = async (id: string) => {
    await deleteDoc(doc(db, 'lookbook', id));
  };

  const removeVideo = async (id: string) => {
    await deleteDoc(doc(db, 'videos', id));
  };

  return (
    <AdminContext.Provider value={{ 
      isAdminMode, 
      setIsAdminMode, 
      loading,
      login,
      logout,
      products, 
      lookbook, 
      videos,
      siteLogo,
      heroImage,
      philosophyImage,
      aboutImage,
      showCollection,
      setShowCollection,
      layoutSettings,
      updateElementLayout,
      saveLayout,
      updateProductImage, 
      updateLookbookImage,
      updateSiteLogo,
      updateHeroImage,
      updatePhilosophyImage,
      updateAboutImage,
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
