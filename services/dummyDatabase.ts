import { Product, Order, Category, OrderStatus } from '@/types';

// Dummy database for development - replace with Firebase later
export class DummyDatabase {
  private static instance: DummyDatabase;
  private products: Product[] = [];
  private orders: Order[] = [];
  private categories: Category[] = [];

  private constructor() {
    this.initializeData();
  }

  public static getInstance(): DummyDatabase {
    if (!DummyDatabase.instance) {
      DummyDatabase.instance = new DummyDatabase();
    }
    return DummyDatabase.instance;
  }

  private initializeData() {
    // Initialize categories
    this.categories = [
      { id: '1', name: 'Vegetables', description: 'Fresh vegetables' },
      { id: '2', name: 'Fruits', description: 'Fresh fruits' },
      { id: '3', name: 'Leafy Greens', description: 'Spinach, lettuce, etc.' },
      { id: '4', name: 'Herbs', description: 'Fresh herbs and spices' },
    ];

    // Initialize products
    this.products = [
      {
        id: '1',
        name: 'Tomatoes',
        category: 'Vegetables',
        price: 40,
        stock: 50,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        name: 'Onions',
        category: 'Vegetables',
        price: 30,
        stock: 75,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/144248/onions-food-vegetables-healthy-144248.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '3',
        name: 'Carrots',
        category: 'Vegetables',
        price: 45,
        stock: 35,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '4',
        name: 'Potatoes',
        category: 'Vegetables',
        price: 25,
        stock: 100,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '5',
        name: 'Bananas',
        category: 'Fruits',
        price: 60,
        stock: 30,
        unit: 'dozen',
        image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '6',
        name: 'Apples',
        category: 'Fruits',
        price: 120,
        stock: 25,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '7',
        name: 'Spinach',
        category: 'Leafy Greens',
        price: 25,
        stock: 20,
        unit: 'bunch',
        image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '8',
        name: 'Lettuce',
        category: 'Leafy Greens',
        price: 30,
        stock: 15,
        unit: 'piece',
        image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
    ];

    // Initialize orders
    this.orders = [
      {
        id: '1',
        customerName: 'Rahul Sharma',
        customerPhone: '+91 9876543210',
        customerAddress: '123 MG Road, Koramangala, Bangalore - 560034',
        items: [
          { productId: '1', productName: 'Tomatoes', quantity: 2, price: 40, unit: 'kg' },
          { productId: '2', productName: 'Onions', quantity: 1, price: 30, unit: 'kg' },
        ],
        totalAmount: 110,
        status: 'pending',
        createdAt: new Date('2024-01-15T10:30:00'),
        updatedAt: new Date('2024-01-15T10:30:00'),
        estimatedDelivery: new Date('2024-01-15T18:00:00'),
      },
      {
        id: '2',
        customerName: 'Priya Patel',
        customerPhone: '+91 8765432109',
        customerAddress: '456 Brigade Road, Commercial Street, Bangalore - 560025',
        items: [
          { productId: '3', productName: 'Carrots', quantity: 1.5, price: 45, unit: 'kg' },
          { productId: '4', productName: 'Potatoes', quantity: 3, price: 25, unit: 'kg' },
        ],
        totalAmount: 142.5,
        status: 'accepted',
        createdAt: new Date('2024-01-15T11:00:00'),
        updatedAt: new Date('2024-01-15T11:15:00'),
        estimatedDelivery: new Date('2024-01-15T19:00:00'),
      },
      {
        id: '3',
        customerName: 'Amit Kumar',
        customerPhone: '+91 7654321098',
        customerAddress: '789 Commercial Street, Shivaji Nagar, Bangalore - 560001',
        items: [
          { productId: '7', productName: 'Spinach', quantity: 2, price: 25, unit: 'bunch' },
          { productId: '5', productName: 'Bananas', quantity: 1, price: 60, unit: 'dozen' },
        ],
        totalAmount: 110,
        status: 'in_transit',
        createdAt: new Date('2024-01-15T09:45:00'),
        updatedAt: new Date('2024-01-15T12:00:00'),
        estimatedDelivery: new Date('2024-01-15T16:30:00'),
      },
      {
        id: '4',
        customerName: 'Sneha Reddy',
        customerPhone: '+91 6543210987',
        customerAddress: '321 Indiranagar, 100 Feet Road, Bangalore - 560038',
        items: [
          { productId: '6', productName: 'Apples', quantity: 2, price: 120, unit: 'kg' },
        ],
        totalAmount: 240,
        status: 'out_for_delivery',
        createdAt: new Date('2024-01-15T08:20:00'),
        updatedAt: new Date('2024-01-15T13:45:00'),
        estimatedDelivery: new Date('2024-01-15T15:00:00'),
      },
      {
        id: '5',
        customerName: 'Vikram Singh',
        customerPhone: '+91 5432109876',
        customerAddress: '654 Whitefield, ITPL Main Road, Bangalore - 560066',
        items: [
          { productId: '1', productName: 'Tomatoes', quantity: 3, price: 40, unit: 'kg' },
          { productId: '8', productName: 'Lettuce', quantity: 1, price: 30, unit: 'piece' },
        ],
        totalAmount: 150,
        status: 'delivered',
        createdAt: new Date('2024-01-14T16:30:00'),
        updatedAt: new Date('2024-01-15T10:20:00'),
        estimatedDelivery: new Date('2024-01-15T12:00:00'),
      },
    ];
  }

  // Product methods
  getProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.products[index];
  }

  deleteProduct(id: string): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    return true;
  }

  // Order methods
  getOrders(): Order[] {
    return [...this.orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  updateOrderStatus(id: string, status: OrderStatus): Order | null {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    this.orders[index] = {
      ...this.orders[index],
      status,
      updatedAt: new Date(),
    };
    return this.orders[index];
  }

  // Category methods
  getCategories(): Category[] {
    return [...this.categories];
  }

  // Analytics methods
  getAnalytics() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const todayOrders = this.orders.filter(o => 
      o.createdAt.toDateString() === today.toDateString()
    );
    
    const yesterdayOrders = this.orders.filter(o => 
      o.createdAt.toDateString() === yesterday.toDateString()
    );

    const thisMonth = this.orders.filter(o => 
      o.createdAt.getMonth() === today.getMonth() && 
      o.createdAt.getFullYear() === today.getFullYear()
    );

    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthOrders = this.orders.filter(o => 
      o.createdAt.getMonth() === lastMonth.getMonth() && 
      o.createdAt.getFullYear() === lastMonth.getFullYear()
    );

    return {
      revenue: {
        today: todayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
        yesterday: yesterdayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
        thisMonth: thisMonth.reduce((sum, o) => sum + o.totalAmount, 0),
        lastMonth: lastMonthOrders.reduce((sum, o) => sum + o.totalAmount, 0),
      },
      orders: {
        today: todayOrders.length,
        yesterday: yesterdayOrders.length,
        thisMonth: thisMonth.length,
        lastMonth: lastMonthOrders.length,
      },
      products: {
        total: this.products.length,
        lowStock: this.products.filter(p => p.stock < 10 && p.stock > 0).length,
        outOfStock: this.products.filter(p => p.stock === 0).length,
      },
      customers: {
        total: new Set(this.orders.map(o => o.customerPhone)).size,
        new: todayOrders.length,
        returning: todayOrders.filter(o => 
          this.orders.some(prevOrder => 
            prevOrder.customerPhone === o.customerPhone && 
            prevOrder.createdAt < o.createdAt
          )
        ).length,
      },
    };
  }
}

export const dummyDB = DummyDatabase.getInstance();

/* 
  Firebase Integration Code (for future use):
  
  import { 
    collection, 
    doc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy, 
    where 
  } from 'firebase/firestore';
  import { db } from '@/config/firebase';

  // Replace dummy methods with Firebase Firestore operations:
  
  export const getProducts = async (): Promise<Product[]> => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  };

  export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'products'), product);
    return docRef.id;
  };

  export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
    await updateDoc(doc(db, 'products', id), updates);
  };

  export const deleteProduct = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'products', id));
  };

  // Similar patterns for orders, categories, etc.
*/