import { createClient } from '@supabase/supabase-js'

// إعدادات Supabase المباشرة
const supabaseUrl = 'http://192.168.99.3:8000'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'

// تسجيل الاتصال للتأكد
console.log('Supabase URL:', supabaseUrl)
console.log('Connecting to Supabase...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: number
  email: string
  password_hash: string
  full_name: string
  role: string
  is_active: boolean
  created_at: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  is_active: boolean
  slug: string
  created_at: string
}

export interface License {
  id: number
  user_id: number
  product_id: number
  license_key: string
  status: string
  created_at: string
}
