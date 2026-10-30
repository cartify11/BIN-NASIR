import { supabase, isSupabaseConfigured } from './supabase';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './mock-data';
import { Product, Category } from '@/types';

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch (e) {
      console.warn('Supabase fetch failed, using fallback categories', e);
    }
  }
  return INITIAL_CATEGORIES;
}

export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  limit?: number;
}): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      let query = supabase.from('products').select('*, category:categories(*)').eq('is_active', true);

      if (options?.categoryId) {
        query = query.eq('category_id', options.categoryId);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let results = data as Product[];
        if (options?.categorySlug) {
          results = results.filter((p) => p.category?.slug === options.categorySlug);
        }
        return results;
      }
    } catch (e) {
      console.warn('Supabase fetch failed, using fallback products', e);
    }
  }

  // Fallback to initial Pakistani seed products
  let filtered = [...INITIAL_PRODUCTS];
  if (options?.categorySlug) {
    const cat = INITIAL_CATEGORIES.find((c) => c.slug === options.categorySlug);
    if (cat) {
      filtered = filtered.filter((p) => p.category_id === cat.id);
    }
  }
  if (options?.categoryId) {
    filtered = filtered.filter((p) => p.category_id === options.categoryId);
  }
  if (options?.limit) {
    filtered = filtered.slice(0, options.limit);
  }
  return filtered;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (!error && data) {
        return data as Product;
      }
    } catch (e) {
      console.warn('Supabase fetch failed, looking in local products', e);
    }
  }

  return INITIAL_PRODUCTS.find((p) => p.slug === slug) || null;
}
