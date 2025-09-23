# NetLink License Cloud - دليل النشر

## 📋 الملفات المطلوبة للرفع:

### ✅ الملفات الأساسية:
- `docker-compose.yml` - إعدادات Docker
- `.env` - متغيرات البيئة  
- `README.md` - وصف المشروع
- `package.json` - تبعيات المشروع الرئيسية

### ✅ المجلدات المطلوبة:
- `api/` - الخدمات الخلفية (Backend)
- `web/` - الواجهة الأمامية (Frontend)  
- `sdk/` - مكتبات التطوير
- `scripts/` - سكريبتات مساعدة

### ❌ الملفات غير المطلوبة:
- `.env.example` - مثال فقط
- `env.example` - مثال فقط
- `.gitignore` - خاص بـ Git
- `RUN.bat` - خاص بـ Windows
- `demo.html` - ملف تجريبي
- `README-DEPLOY.md` - هذا الملف

## 🚀 خطوات النشر:

1. احذف كل شيء من GitHub Repository
2. ارفع الملفات والمجلدات المطلوبة فقط
3. في Portainer:
   - Stacks → Add Stack
   - Repository: https://github.com/mrjabareen/netlink-license-cloud
   - Deploy

## 🎯 المنافذ:
- Frontend: http://localhost:3000
- API: http://localhost:8000  
- Database: localhost:5432
- Redis: localhost:6379

## ✅ النظام جاهز للعمل بدون مشاكل!
