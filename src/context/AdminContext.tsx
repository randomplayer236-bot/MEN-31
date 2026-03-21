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
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  products: Product[];
  lookbook: LookbookItem[];
  videos: VideoItem[];
  updateProductImage: (id: string, newImageUrl: string) => Promise<void>;
  updateLookbookImage: (id: string, newImageUrl: string) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  addLookbookItem: (item: LookbookItem) => Promise<void>;
  addVideo: (video: VideoItem) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  removeLookbookItem: (id: string) => Promise<void>;
  removeVideo: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_EMAIL = "samiarafati2006@gmail.com";

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [lookbook, setLookbook] = useState<LookbookItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === ADMIN_EMAIL) {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }
    });
    return () => unsubscribe();
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
      const data = snapshot.docs.map(doc => doc.data() as LookbookItem);
      setLookbook(data.length > 0 ? data : INITIAL_LOOKBOOK);
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

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
      user,
      loading,
      login,
      logout,
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
