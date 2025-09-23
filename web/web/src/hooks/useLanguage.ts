import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useLanguage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // حفظ اللغة في localStorage
  const saveLanguagePreference = (locale: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', locale)
    }
  }

  // استرجاع اللغة المحفوظة
  const getSavedLanguage = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preferred-language')
    }
    return null
  }

  // تغيير اللغة
  const changeLanguage = async (locale: string) => {
    setIsLoading(true)
    try {
      // حفظ اللغة المختارة
      saveLanguagePreference(locale)
      
      // تغيير اللغة في Next.js
      await router.push(router.pathname, router.asPath, { locale })
    } catch (error) {
      console.error('Error changing language:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // استرجاع اللغة المحفوظة عند تحميل الصفحة
  useEffect(() => {
    const savedLanguage = getSavedLanguage()
    
    // إذا كانت هناك لغة محفوظة وتختلف عن اللغة الحالية
    if (savedLanguage && savedLanguage !== router.locale && router.isReady) {
      changeLanguage(savedLanguage)
    }
  }, [router.isReady, router.locale])

  // حفظ اللغة الحالية عند تغييرها
  useEffect(() => {
    if (router.locale && router.isReady) {
      saveLanguagePreference(router.locale)
    }
  }, [router.locale, router.isReady])

  return {
    currentLanguage: router.locale || 'ar',
    changeLanguage,
    isLoading,
    availableLanguages: ['ar', 'en'],
  }
}
