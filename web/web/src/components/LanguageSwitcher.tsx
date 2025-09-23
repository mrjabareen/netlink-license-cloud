import { useTranslation } from 'next-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Languages, Loader2 } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function LanguageSwitcher() {
  const { t } = useTranslation('common')
  const { currentLanguage, changeLanguage, isLoading } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Languages className="h-4 w-4 mr-2" />
          )}
          {currentLanguage === 'ar' ? t('arabic') : t('english')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => changeLanguage('ar')}
          disabled={isLoading || currentLanguage === 'ar'}
        >
          🇸🇦 {t('arabic')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          disabled={isLoading || currentLanguage === 'en'}
        >
          🇺🇸 {t('english')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
