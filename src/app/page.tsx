'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

// Define the MenuItem and CartItem types
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'meals' | 'desserts';
}
interface CartItem extends MenuItem {
  quantity: number;
}

// Categorized menu data
const categorizedMenu: Record<MenuItem['category'], MenuItem[]> = {
  starters: [
    { id: 's1', name: 'Bruschetta', description: 'Grilled bread with tomato & basil', price: 6, category: 'starters' },
    { id: 's2', name: 'Garlic Bread', description: 'Crispy bread with garlic butter', price: 5, category: 'starters' },
    { id: 's3', name: 'Mozzarella Sticks', description: 'Fried mozzarella with marinara', price: 7, category: 'starters' },
    { id: 's4', name: 'Stuffed Mushrooms', description: 'Mushrooms filled with cheese & herbs', price: 8, category: 'starters' },
    { id: 's5', name: 'Shrimp Cocktail', description: 'Chilled shrimp with cocktail sauce', price: 9, category: 'starters' },
    { id: 's6', name: 'Caprese Salad', description: 'Tomato, mozzarella & basil', price: 6, category: 'starters' },
    { id: 's7', name: 'Spinach Dip', description: 'Creamy spinach served with chips', price: 7, category: 'starters' },
    { id: 's8', name: 'Onion Rings', description: 'Crispy fried onion rings', price: 6, category: 'starters' },
    { id: 's9', name: 'Fried Calamari', description: 'Served with lemon & aioli', price: 9, category: 'starters' },
    { id: 's10', name: 'Soup of the Day', description: 'Ask your server for details', price: 5, category: 'starters' },
  ],
  meals: [
    { id: 'm1', name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, cheese', price: 12, category: 'meals' },
    { id: 'm2', name: 'Margherita Pizza', description: 'Fresh tomato, mozzarella, basil', price: 15, category: 'meals' },
    { id: 'm3', name: 'Grilled Chicken', description: 'Served with vegetables and rice', price: 14, category: 'meals' },
    { id: 'm4', name: 'Fish & Chips', description: 'Beer-battered cod with fries', price: 13, category: 'meals' },
    { id: 'm5', name: 'Spaghetti Bolognese', description: 'Beef ragu over pasta', price: 14, category: 'meals' },
    { id: 'm6', name: 'Veggie Stir Fry', description: 'Mixed vegetables with soy glaze', price: 11, category: 'meals' },
    { id: 'm7', name: 'BBQ Ribs', description: 'Smoked pork ribs with BBQ sauce', price: 17, category: 'meals' },
    { id: 'm8', name: 'Beef Tacos', description: 'Three tacos with beef, lettuce, and salsa', price: 13, category: 'meals' },
    { id: 'm9', name: 'Chicken Alfredo', description: 'Creamy pasta with grilled chicken', price: 14, category: 'meals' },
    { id: 'm10', name: 'Salmon Teriyaki', description: 'Grilled salmon with teriyaki sauce', price: 16, category: 'meals' },
  ],
  desserts: [
    { id: 'd1', name: 'Cheesecake', description: 'Classic New York style', price: 7, category: 'desserts' },
    { id: 'd2', name: 'Chocolate Lava Cake', description: 'Warm cake with molten center', price: 8, category: 'desserts' },
    { id: 'd3', name: 'Tiramisu', description: 'Coffee-flavored Italian dessert', price: 7, category: 'desserts' },
    { id: 'd4', name: 'Ice Cream Sundae', description: 'Vanilla ice cream with toppings', price: 6, category: 'desserts' },
    { id: 'd5', name: 'Fruit Tart', description: 'Pastry with seasonal fruit', price: 7, category: 'desserts' },
    { id: 'd6', name: 'Brownie', description: 'Fudgy chocolate brownie', price: 6, category: 'desserts' },
    { id: 'd7', name: 'Crème Brûlée', description: 'Rich custard with caramelized sugar', price: 8, category: 'desserts' },
    { id: 'd8', name: 'Apple Pie', description: 'Classic pie with cinnamon apples', price: 7, category: 'desserts' },
    { id: 'd9', name: 'Panna Cotta', description: 'Creamy Italian pudding', price: 7, category: 'desserts' },
    { id: 'd10', name: 'Churros', description: 'Fried dough sticks with cinnamon sugar', price: 6, category: 'desserts' },
  ],
};

const categoryColors = {
  starters: {
    tab: 'bg-orange-500',
    toast: 'linear-gradient(135deg, #fb923c 0%, #ef4444 100%)',
    price: 'from-orange-400 to-red-500',
    button: 'from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600'
  },
  meals: {
    tab: 'bg-blue-600',
    toast: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
    price: 'from-blue-500 to-purple-600',
    button: 'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
  },
  desserts: {
    tab: 'bg-pink-500',
    toast: 'linear-gradient(135deg, #f472b6 0%, #f43f5e 100%)',
    price: 'from-pink-400 to-rose-500',
    button: 'from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600'
  },
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'menu' | 'order'>('menu');
  const [menuCategory, setMenuCategory] = useState<MenuItem['category']>('starters');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart or increment quantity
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart`, {
      description: `$${item.price.toFixed(2)}`,
      style: {
        background: categoryColors[item.category].toast,
        color: 'white',
        border: 'none',
        borderRadius: '12px',
      },
    });
  };

  // Change item quantity or remove when zero
  const changeQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      const updated = prev
        .map(i =>
          i.id === itemId ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter(i => i.quantity > 0);
      
      const removed = prev.find(i => i.id === itemId && i.quantity + delta <= 0);
      if (removed) {
        toast.info(`${removed.name} removed from cart`, {
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
          },
        });
      }
      
      return updated;
    });
  };

  // Confirm order handler
  const confirmOrder = () => {
    toast.success('Order confirmed!', {
      description: `Total: $${total}`,
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
      },
    });
    setCart([]);
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
  const cartItemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Main Tabs - Fixed at Top */}
      <div className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="flex">
          <button
            onClick={() => setActiveTab('menu')}
            className={`w-1/2 py-4 text-center font-semibold text-base transition-all duration-300 ${
              activeTab === 'menu' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50/50'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab('order')}
            className={`w-1/2 py-4 text-center font-semibold text-base transition-all duration-300 ${
              activeTab === 'order' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50/50'
            }`}
          >
            My Order
          </button>
        </div>
      </div>

      {/* Category Tabs - Only for Menu */}
      {activeTab === 'menu' && (
        <div className="fixed top-16 left-0 w-full bg-white/90 backdrop-blur-sm border-b border-slate-200 z-40">
          <div className="flex justify-center px-4 py-3">
            {(['starters', 'meals', 'desserts'] as MenuItem['category'][]).map(cat => (
              <button
                key={cat}
                onClick={() => setMenuCategory(cat)}
                className={`px-6 py-2 mx-1 text-center font-medium text-sm rounded-full transition-all duration-200 ${
                  menuCategory === cat 
                    ? `${categoryColors[cat].tab} text-white shadow-lg` 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span className="capitalize">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="pt-32 px-4 pb-24">
        {activeTab === 'menu' && (
          <div className="space-y-3">
            {categorizedMenu[menuCategory].map(item => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-slate-900 mb-1">{item.name}</h2>
                      <p className="text-sm text-slate-600 mb-2 leading-relaxed">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-lg font-bold bg-gradient-to-r ${categoryColors[menuCategory].price} bg-clip-text text-transparent`}>
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className={`flex-shrink-0 bg-gradient-to-r ${categoryColors[menuCategory].button} text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-md`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'order' && (
          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-600">Add some delicious items from the menu</p>
              </div>
            ) : (
              <>
                {(['starters', 'meals', 'desserts'] as MenuItem['category'][]).map(cat => {
                  const itemsInCat = cart.filter(i => i.category === cat);
                  if (!itemsInCat.length) return null;
                  return (
                    <div key={cat} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-900 capitalize">{cat}</h3>
                      </div>
                      <div className="space-y-2">
                        {itemsInCat.map(item => (
                          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-slate-100 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-slate-900 mb-1">{item.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                  <span>${item.price.toFixed(2)} each</span>
                                  <span>•</span>
                                  <span className="font-semibold text-blue-600">${(item.quantity * item.price).toFixed(2)} total</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => changeQuantity(item.id, -1)} 
                                  className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
                                >
                                  -
                                </button>
                                <span className="text-sm font-bold text-slate-900 w-6 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => changeQuantity(item.id, 1)} 
                                  className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      {/* Fixed Bottom Order Summary */}
      {activeTab === 'order' && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">{cartItemCount}</span> item{cartItemCount !== 1 ? 's' : ''}
            </div>
            <div className="text-lg font-bold">
              ${total}
            </div>
          </div>
          <button
            onClick={confirmOrder}
            className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold text-base hover:bg-gray-50 transition-all duration-300 hover:scale-[1.01] active:scale-98 shadow-md"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}