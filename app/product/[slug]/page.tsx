import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductBySlug, getProducts } from '@/lib/products-service';
import ProductDetailClientView from '@/components/ProductDetailClientView';

export const revalidate = 60;

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found | Bin Nasir',
    };
  }

  const title = `${product.name} | Bin Nasir Official`;
  const description =
    product.description ||
    '100% pure authentic traditional Pakistani delicacy. Handcrafted with natural ingredients and cash on delivery all over Pakistan.';
  const image = product.images?.[0] || '/images/peanut-rewri.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getProducts({ limit: 6 }))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailClientView product={product} relatedProducts={relatedProducts} />
  );
}
