import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        shop: 'Shop',
        about: 'About',
        gallery: 'Lookbook',
        contact: 'Contact',
        admin: 'Admin'
      },
      hero: {
        subtitle: 'New Collection 2026',
        title: 'Elevate Your Style',
        shopNow: 'Shop Now',
        visitStore: 'Visit Store'
      },
      shop: {
        title: 'Collections',
        categories: {
          all: 'All',
          tshirts: 'T-Shirts',
          hoodies: 'Hoodies',
          pants: 'Pants',
          jackets: 'Jackets',
          accessories: 'Accessories'
        },
        addToCart: 'Add to Cart'
      },
      about: {
        title: 'Our Story',
        p1: 'MEN 31 represents more than just clothing. It represents confidence, discipline, and modern masculinity.',
        p2: 'Founded with a vision to bring premium style to the modern man, we focus on high-quality fabrics and impeccable fits that make a statement.',
        p3: 'Whether you\'re looking for the perfect streetwear ensemble or a classic outfit for a special occasion, MEN 31 provides the curated selection you need to elevate your presence.',
        quality: 'Quality Assured',
        established: 'Established'
      },
      gallery: {
        title: 'Lookbook',
        subtitle: 'Curated Styles for the Modern Man',
        viewOutfit: 'View Outfit'
      },
      contact: {
        title: 'Visit Us',
        location: 'Location',
        phone: 'Phone',
        hours: 'Hours',
        getDirections: 'Get Directions',
        openDaily: 'Open Daily',
        callInquiries: 'Call for inquiries'
      },
      footer: {
        desc: 'The destination for premium men\'s fashion in Morocco. Streetwear, classy outfits, and accessories designed for the modern man.',
        links: 'Quick Links',
        newsletter: 'Newsletter',
        newsletterDesc: 'Subscribe to get special offers and style updates.',
        placeholder: 'Your Email',
        join: 'Join',
        rights: 'All Rights Reserved. Designed for the Modern Man.'
      },
      products: {
        "1": { name: "Premium Oversized Tee" },
        "2": { name: "Essential Black Hoodie" },
        "3": { name: "Cargo Tech Pants" },
        "4": { name: "Minimalist Bomber Jacket" },
        "5": { name: "Signature Leather Belt" },
        "6": { name: "Graphic Streetwear Tee" }
      },
      lookbook: {
        "1": { title: "Urban Elegance" },
        "2": { title: "Casual Sophistication" },
        "3": { title: "Night Out" },
        "4": { title: "Street Style" }
      },
      admin: {
        login: 'Admin Login',
        username: 'Username',
        password: 'Password',
        enter: 'Enter',
        dashboard: 'Admin Dashboard',
        uploadProduct: 'Upload Product',
        uploadGallery: 'Upload Gallery',
        uploadVideo: 'Upload Video',
        productName: 'Product Name',
        price: 'Price',
        category: 'Category',
        selectFile: 'Select File',
        uploading: 'Uploading...',
        success: 'Uploaded Successfully',
        logout: 'Logout',
        recentUploads: 'Recent Uploads',
        invalidCredentials: 'Invalid credentials'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        shop: 'Boutique',
        about: 'À Propos',
        gallery: 'Lookbook',
        contact: 'Contact',
        admin: 'Admin'
      },
      hero: {
        subtitle: 'Nouvelle Collection 2026',
        title: 'Élevez Votre Style',
        shopNow: 'Acheter',
        visitStore: 'Visiter'
      },
      shop: {
        title: 'Collections',
        categories: {
          all: 'Tout',
          tshirts: 'T-Shirts',
          hoodies: 'Hoodies',
          pants: 'Pantalons',
          jackets: 'Vestes',
          accessories: 'Accessoires'
        },
        addToCart: 'Ajouter au Panier'
      },
      about: {
        title: 'Notre Histoire',
        p1: 'MEN 31 représente plus que de simples vêtements. Il représente la confiance, la discipline et la masculinité moderne.',
        p2: 'Fondé avec la vision d\'apporter un style premium à l\'homme moderne, nous nous concentrons sur des tissus de haute qualité et des coupes impeccables.',
        p3: 'Que vous recherchiez l\'ensemble streetwear parfait ou une tenue classique pour une occasion spéciale, MEN 31 propose la sélection dont vous avez besoin.',
        quality: 'Qualité Assurée',
        established: 'Établi'
      },
      gallery: {
        title: 'Lookbook',
        subtitle: 'Styles Curatés pour l\'Homme Moderne',
        viewOutfit: 'Voir la Tenue'
      },
      contact: {
        title: 'Visitez-nous',
        location: 'Emplacement',
        phone: 'Téléphone',
        hours: 'Horaires',
        getDirections: 'Itinéraire',
        openDaily: 'Ouvert tous les jours',
        callInquiries: 'Appelez pour plus d\'infos'
      },
      footer: {
        desc: 'La destination de la mode masculine premium au Maroc. Streetwear, tenues élégantes et accessoires pour l\'homme moderne.',
        links: 'Liens Rapides',
        newsletter: 'Newsletter',
        newsletterDesc: 'Abonnez-vous pour les offres spéciales.',
        placeholder: 'Votre Email',
        join: 'Rejoindre',
        rights: 'Tous droits réservés. Conçu pour l\'homme moderne.'
      },
      products: {
        "1": { name: "T-shirt Oversize Premium" },
        "2": { name: "Hoodie Noir Essentiel" },
        "3": { name: "Pantalon Cargo Tech" },
        "4": { name: "Blouson Bomber Minimaliste" },
        "5": { name: "Ceinture en Cuir Signature" },
        "6": { name: "T-shirt Graphic Streetwear" }
      },
      lookbook: {
        "1": { title: "Élégance Urbaine" },
        "2": { title: "Sophistication Décontractée" },
        "3": { title: "Sortie Nocturne" },
        "4": { title: "Style de Rue" }
      },
      admin: {
        login: 'Connexion Admin',
        username: 'Nom d\'utilisateur',
        password: 'Mot de passe',
        enter: 'Entrer',
        dashboard: 'Tableau de Bord Admin',
        uploadProduct: 'Ajouter Produit',
        uploadGallery: 'Ajouter Galerie',
        uploadVideo: 'Ajouter Vidéo',
        productName: 'Nom du Produit',
        price: 'Prix',
        category: 'Catégorie',
        selectFile: 'Choisir Fichier',
        uploading: 'Téléchargement...',
        success: 'Téléchargé avec succès',
        logout: 'Déconnexion',
        recentUploads: 'Téléchargements Récents',
        invalidCredentials: 'Identifiants invalides'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        shop: 'المتجر',
        about: 'من نحن',
        gallery: 'لوحة الأنماط',
        contact: 'اتصل بنا',
        admin: 'المشرف'
      },
      hero: {
        subtitle: 'مجموعة جديدة 2026',
        title: 'ارتقِ بأسلوبك',
        shopNow: 'تسوق الآن',
        visitStore: 'زيارة المتجر'
      },
      shop: {
        title: 'المجموعات',
        categories: {
          all: 'الكل',
          tshirts: 'تي شيرت',
          hoodies: 'هوديز',
          pants: 'سراويل',
          jackets: 'سترات',
          accessories: 'إكسسوارات'
        },
        addToCart: 'أضف إلى السلة'
      },
      about: {
        title: 'قصتنا',
        p1: 'تمثل MEN 31 أكثر من مجرد ملابس. إنها تمثل الثقة والانضباط والرجولة الحديثة.',
        p2: 'تأسست برؤية لتقديم أسلوب متميز للرجل العصري، نركز على الأقمشة عالية الجودة والقصات المثالية.',
        p3: 'سواء كنت تبحث عن طقم ملابس الشارع المثالي أو زي كلاسيكي لمناسبة خاصة، توفر MEN 31 التشكيلة المختارة التي تحتاجها.',
        quality: 'جودة مضمونة',
        established: 'تأسست في'
      },
      gallery: {
        title: 'لوحة الأنماط',
        subtitle: 'أنماط مختارة للرجل العصري',
        viewOutfit: 'عرض الزي'
      },
      contact: {
        title: 'تفضل بزيارتنا',
        location: 'الموقع',
        phone: 'الهاتف',
        hours: 'الساعات',
        getDirections: 'احصل على الاتجاهات',
        openDaily: 'مفتوح يومياً',
        callInquiries: 'اتصل للاستفسار'
      },
      footer: {
        desc: 'وجهة الموضة الرجالية المتميزة في المغرب. ملابس الشارع، أزياء كلاسيكية، وإكسسوارات مصممة للرجل العصري.',
        links: 'روابط سريعة',
        newsletter: 'النشرة الإخبارية',
        newsletterDesc: 'اشترك للحصول على العروض الخاصة وتحديثات الأنماط.',
        placeholder: 'بريدك الإلكتروني',
        join: 'انضمام',
        rights: 'جميع الحقوق محفوظة. صمم للرجل العصري.'
      },
      products: {
        "1": { name: "تي شيرت فضفاض متميز" },
        "2": { name: "هودي أسود أساسي" },
        "3": { name: "سروال كارغو تقني" },
        "4": { name: "سترة بومبر بسيطة" },
        "5": { name: "حزام جلدي مميز" },
        "6": { name: "تي شيرت ستريت وير جرافيك" }
      },
      lookbook: {
        "1": { title: "أناقة حضرية" },
        "2": { title: "رقي غير رسمي" },
        "3": { title: "سهرة خارجية" },
        "4": { title: "أسلوب الشارع" }
      },
      admin: {
        login: 'دخول المشرف',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        enter: 'دخول',
        dashboard: 'لوحة تحكم المشرف',
        uploadProduct: 'رفع منتج',
        uploadGallery: 'رفع للمعرض',
        uploadVideo: 'رفع فيديو',
        productName: 'اسم المنتج',
        price: 'السعر',
        category: 'الفئة',
        selectFile: 'اختر ملف',
        uploading: 'جاري الرفع...',
        success: 'تم الرفع بنجاح',
        logout: 'تسجيل الخروج',
        recentUploads: 'التحميلات الأخيرة',
        invalidCredentials: 'بيانات الاعتماد غير صالحة'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
