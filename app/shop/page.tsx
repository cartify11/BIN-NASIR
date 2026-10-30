import React from 'react';
import { getCategories, getProducts } from '@/lib/products-service';
import ShopClientView from '@/components/ShopClientView';

export const revalidate = 60;

interface ShopPageProps {
  searchParams: {
    category?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const activeCategorySlug = searchParams.category;
  const categories = await getCategories();
  const products = await getProducts({ categorySlug: activeCategorySlug });

  return (
    <ShopClientView
      categories={categories}
      products={products}
      activeCategorySlug={activeCategorySlug}
    />
  );
}
