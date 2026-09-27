export interface UserAddress {
  fullName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: UserAddress;
  createdAt: string;
}

export const DEMO_USER: User = {
  id: "usr-demo-001",
  name: "Demo User",
  email: "demo@solex.com",
  phone: "+1 (555) 234-5678",
  address: {
    fullName: "Demo User",
    street: "742 Evergreen Terrace",
    city: "Seattle",
    province: "Washington",
    postalCode: "98101",
    phone: "+1 (555) 234-5678",
    notes: "Please leave package at front door.",
  },
  createdAt: "2026-01-15T08:00:00.000Z",
};
