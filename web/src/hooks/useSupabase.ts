import { useState, useEffect } from 'react'
import { supabase, User, Product, License } from '@/lib/supabase'

// Hook للمستخدمين
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addUser = async (userData: Omit<User, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()

      if (error) throw error
      await fetchUsers() // إعادة تحميل البيانات
      return data[0]
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return { users, loading, error, fetchUsers, addUser }
}

// Hook للمنتجات
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()

      if (error) throw error
      await fetchProducts()
      return data[0]
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products, loading, error, fetchProducts, addProduct }
}

// Hook للتراخيص
export const useLicenses = () => {
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLicenses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('licenses')
        .select(`
          *,
          users(full_name, email),
          products(name, price)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setLicenses(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createLicense = async (licenseData: Omit<License, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .insert([licenseData])
        .select()

      if (error) throw error
      await fetchLicenses()
      return data[0]
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchLicenses()
  }, [])

  return { licenses, loading, error, fetchLicenses, createLicense }
}
