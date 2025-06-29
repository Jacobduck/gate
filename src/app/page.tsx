'use client';

import { useState } from 'react';

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
  };

  // Change item quantity or remove when zero
  const changeQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i =>
          i.id === itemId ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  // Confirm order handler
  const confirmOrder = () => {
    alert('Order passed and confirmed!');
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Parent Tabs */}
      <div className="fixed top-0 left-0 w-full flex justify-around bg-white shadow z-10">
        <button
          onClick={() => setActiveTab('menu')}
          className={`w-1/2 py-3 text-center ${activeTab === 'menu' ? 'font-bold border-b-4 border-blue-500' : 'text-gray-500'}`}
        >
          Menu
        </button>
        <button
          onClick={() => setActiveTab('order')}
          className={`w-1/2 py-3 text-center ${activeTab === 'order' ? 'font-bold border-b-4 border-blue-500' : 'text-gray-500'}`}
        >
          My Order
        </button>
      </div>

      {/* Sub-Menu Tabs */}
      {activeTab === 'menu' && (
        <div className="fixed top-12 w-full flex justify-around bg-white shadow z-10">
          {(['starters', 'meals', 'desserts'] as MenuItem['category'][]).map(cat => (
            <button
              key={cat}
              onClick={() => setMenuCategory(cat)}
              className={`w-1/3 py-2 text-center capitalize ${menuCategory === cat ? 'font-semibold border-b-2 border-blue-600' : 'text-gray-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="pt-28 p-4 flex-1">
        {activeTab === 'menu' && (
          <div className="space-y-4">
            {categorizedMenu[menuCategory].map(item => (
              <div key={item.id} className="bg-white p-4 rounded shadow flex flex-col gap-2">
                <div>
                  <h2 className="font-medium text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm font-semibold">${item.price}</p>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="self-end bg-blue-600 text-white px-4 py-2 rounded transition-all duration-150 active:bg-blue-700 active:scale-95"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'order' && (
          <div className="flex flex-col justify-between h-full pb-32 space-y-6">
            {(['starters', 'meals', 'desserts'] as MenuItem['category'][]).map(cat => {
              const itemsInCat = cart.filter(i => i.category === cat);
              if (!itemsInCat.length) return null;
              return (
                <div key={cat} className="space-y-2">
                  <h3 className="text-md font-semibold capitalize text-gray-700">{cat}</h3>
                  {itemsInCat.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                      <div>
                        <h2 className="font-medium">{item.name}</h2>
                        <p className="text-sm text-gray-500">{item.quantity} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQuantity(item.id, -1)} className="bg-red-500 text-white px-2 py-1 rounded">−</button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.id, 1)} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            {cart.length > 0 && (
              <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner px-4 py-3 border-t">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <button
                  onClick={confirmOrder}
                  className="mt-2 w-full bg-green-600 text-white py-2 rounded"
                >
                  Pass & confirm order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}