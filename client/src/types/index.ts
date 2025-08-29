export interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  mrp: number;
  rating: number;
  stock: number;
  category: ICategory | string;
  images: IImage[];
}

export interface IImage {
  _id: string;
  url: string;
  product_id: string;
  public_id: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export interface ICart {
  _id?: string;
  quantity: number;
  item: {
    _id: string;
    title: string;
    slug: string;
    images: IImage[];
    price: number;
    mrp: number;
  };
}

export interface IWishlist {
  _id?: string;
  item: {
    _id: string;
    title: string;
    slug: string;
    images: IImage[];
    price: number;
    mrp: number;
  };
}

export interface IAddress {
  _id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  landmark: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder {
  _id: string;
  user: IUser;
  orderItems: ICart[];
  status: string;
  shippingAddress: IAddress;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  // paymentResult: string;
  // itemsPrice: number;
  // shippingPrice: number;
  // taxPrice: number;
  // isPaid: boolean;
  // paidAt: string;
  // isDelivered: boolean;
  // deliveredAt: string;
}
