import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/products-service';
import ProductDetailClientView from '@/components/ProductDetailClientView';

export const revalidate = 60;

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getProducts({ limit: 4 }))
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <ProductDetailClientView product={product} relatedProducts={relatedProducts} />
  );
}
