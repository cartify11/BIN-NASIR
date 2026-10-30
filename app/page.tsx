import React from 'react';
import { getCategories, getProducts } from '@/lib/products-service';
import HomeClientView from '@/components/HomeClientView';

export const revalidate = 60;

export default async function HomePage() {
  const categories = await getCategories();
  const products = await getProducts();

  return <HomeClientView categories={categories} products={products} />;
}
