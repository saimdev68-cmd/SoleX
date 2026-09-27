import { CartItem } from "@/context/CartContext";
import { UserAddress } from "@/data/users";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage";
import { generateOrderId } from "@/lib/utils";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: UserAddress;
  paymentMethod: "Cash on Delivery";
  status: "Order Placed" | "Processing" | "In Transit" | "Delivered";
}

export function getLocalOrders(): Order[] {
  return getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, [
    // Pre-populate with a realistic demo previous order if empty
    {
      id: "SLX-20260910-184",
      date: "2026-09-10T14:32:00.000Z",
      items: [
        {
          id: "sp-001-Onyx_Black-10",
          productId: "sp-001",
          slug: "solex-air-one",
          name: "SoleX Air One",
          price: 165,
          image: "/products/solex-air-one-1.jpg",
          color: "Onyx Black",
          size: 10,
          quantity: 1,
          maxStock: 24,
        },
      ],
      subtotal: 165,
      shipping: 0,
      total: 165,
      shippingAddress: {
        fullName: "Demo User",
        street: "742 Evergreen Terrace",
        city: "Seattle",
        province: "Washington",
        postalCode: "98101",
        phone: "+1 (555) 234-5678",
      },
      paymentMethod: "Cash on Delivery",
      status: "Delivered",
    },
  ]);
}

export function createLocalOrder(
  items: CartItem[],
  subtotal: number,
  shipping: number,
  shippingAddress: UserAddress
): Order {
  const newOrder: Order = {
    id: generateOrderId(),
    date: new Date().toISOString(),
    items: [...items],
    subtotal,
    shipping,
    total: subtotal + shipping,
    shippingAddress,
    paymentMethod: "Cash on Delivery",
    status: "Order Placed",
  };

  const existing = getLocalOrders();
  const updated = [newOrder, ...existing];
  saveToStorage(STORAGE_KEYS.ORDERS, updated);

  return newOrder;
}

export function getOrderById(orderId: string): Order | undefined {
  const orders = getLocalOrders();
  return orders.find((o) => o.id === orderId);
}
