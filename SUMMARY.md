# دیجی‌کالا کلون - خلاصه پروژه

## 🎯 هدف پروژه

ایجاد یک کلون کامل از صفحه اصلی دیجی‌کالا با حداکثر امتیازات Lighthouse با استفاده از Vue.js، Tailwind CSS و TypeScript.

## 📊 وضعیت فعلی

### امتیازات Lighthouse هدف

| دسته‌بندی | امتیاز فعلی | امتیاز هدف |
|-----------|-------------|------------|
| عملکرد | 28 | 95+ |
| دسترسی‌پذیری | 82 | 100 |
| بهترین شیوه‌ها | 75 | 100 |
| سئو | 100 | 100 |

### فایل‌های ایجاد شده

#### فایل‌های پیکربندی
- `package.json` - پیکربندی پروژه و وابستگی‌ها
- `vite.config.ts` - پیکربندی Vite
- `tsconfig.json` - پیکربندی TypeScript
- `tailwind.config.js` - پیکربندی Tailwind CSS
- `postcss.config.js` - پیکربندی PostCSS
- `index.html` - فایل HTML اصلی

#### فایل‌های منبع
- `src/main.ts` - نقطه ورود اصلی
- `src/App.vue` - کامپوننت اصلی
- `src/types/index.ts` - تعریف تایپ‌ها
- `src/services/api.ts` - سرویس API
- `src/composables/useHomeData.ts` - کامپوزیبل برای دریافت داده
- `src/styles/main.css` - استایل‌های اصلی

#### کامپوننت‌ها
- `src/components/AppHeader.vue` - هدر اصلی
- `src/components/AppFooter.vue` - فوتر
- `src/components/BannerSlider.vue` - اسلایدر بنر
- `src/components/BannerGrid.vue` - شبکه بنرها
- `src/components/CategoryShortcuts.vue` - دسته‌بندی‌ها
- `src/components/ProductSection.vue` - بخش محصولات
- `src/components/ProductCard.vue` - کارت محصول
- `src/components/SkeletonLoader.vue` - لودینگ اسکلتون
- `src/components/BottomNav.vue` - ناوبری پایین

#### مستندات
- `README.md` - مستندات اصلی پروژه
- `DEPLOYMENT.md` - راهنمای استقرار
- `LIGHTHOUSE_OPTIMIZATIONS.md` - راهنمای بهینه‌سازی Lighthouse
- `TECHNICAL_STRATEGY.md` - استراتژی فنی
- `SUMMARY.md` - این فایل

#### اسکریپت‌ها
- `setup.sh` - اسکریپت راه‌اندازی (Linux/Mac)
- `setup.bat` - اسکریپت راه‌اندازی (Windows)

#### پیکربندی GitHub
- `.github/workflows/deploy.yml` - فلوورک استقرار

## 🚀 مراحل اجرا

### مرحله ۱: نصب وابستگی‌ها

```bash
npm install
```

### مرحله ۲: اجرای توسعه

```bash
npm run dev
```

### مرحله ۳: بیلد برای تولید

```bash
npm run build
```

### مرحله ۴: استقرار در GitHub Pages

1. کد را به مخزن GitHub پوش کنید
2. GitHub Actions به طور خودکار استقرار را انجام می‌دهد
3. سایت در آدرس `https://YOUR_USERNAME.github.io/digikala-clone/` در دسترس خواهد بود

## ⚡ بهینه‌سازی‌های اعمال شده

### عملکرد
- ✅ بهینه‌سازی تصاویر با فرمت WebP
- ✅ بارگذاری تنبل (Lazy Loading)
- ✅ تقسیم کد (Code Splitting)
- ✅ CSS بحرانی (Critical CSS)
- ✅ نکات منابع (Resource Hints)
- ✅ بهینه‌سازی باندل
- ✅ کش سرویس‌ورکر

### دسترسی‌پذیری
- ✅ برچسب‌های ARIA
- ✅ پیوند رد شدن (Skip Navigation)
- ✅ مدیریت فوکوس
- ✅ نسبت کنتراست رنگ
- ✅ برچسب‌های فرم
- ✅ متن جایگزین تصاویر
- ✅ پشتیبانی از کاهش حرکت

### بهترین شیوه‌ها
- ✅ اجرای HTTPS
- ✅ سیاست امنیتی محتوا
- ✅ مدیریت خطاها
- ✅ نظارت بر عملکرد
- ✅ HTML معنایی
- ✅ طراحی ریسپانسیو

### سئو
- ✅ متا تگ‌ها
- ✅ تگ‌های Open Graph
- ✅ داده‌های ساختاریافته
- ✅ URL متعالی
- ✅ زبان و جهت RTL

## 🏗️ ساختار کامپوننت‌ها

### کامپوننت‌های اصلی
1. **AppHeader** - هدر با ناوبری و سرچ‌بار
2. **AppFooter** - فوتر با لینک‌ها و اطلاعات تماس
3. **BannerSlider** - اسلایدر بنرهای تبلیغاتی
4. **CategoryShortcuts** - دسته‌بندی‌های اصلی
5. **ProductSection** - لیست محصولات
6. **ProductCard** - کارت تکی محصول
7. **SkeletonLoader** - لودینگ اسکلتون
8. **BottomNav** - ناوبری موبایل

### کامپوزیبل‌ها
- **useHomeData** - مدیریت داده‌های صفحه اصلی

### سرویس‌ها
- **api** - درخواست‌های API به دیجی‌کالا

## 🎨 طراحی ریسپانسیو

### بریک‌پوینت‌ها
- **موبایل**: < 640px
- **تبلت**: 640px - 1024px
- **دسکتاپ**: > 1024px

### ویژگی‌های ریسپانسیو
- Grid سیستم برای لیست محصولات
- ناوبری پایین برای موبایل
- اندازه فونت متغیر
- فاصله‌گذاری متغیر

## 🔧 پیکربندی محیط

### متغیرهای محیطی
```bash
VITE_BASE_URL=/
VITE_API_BASE_URL=https://api.digikala.com
```

### پیکربندی Tailwind
```javascript
colors: {
  'dk-red': '#ed1b2f',
  'dk-blue': '#0f0c8c',
  'dk-green': '#00b2a9',
}
```

## 📈 معیارهای موفقیت

### عملکرد
- امتیاز Lighthouse: 95+
- LCP: < 2.5 ثانیه
- FID: < 100 میلی‌ثانیه
- CLS: < 0.1

### دسترسی‌پذیری
- امتیاز Lighthouse: 100
- رعایت WCAG 2.1 AA
- سازگاری با screen reader

### بهترین شیوه‌ها
- امتیاز Lighthouse: 100
- بدون آسیب‌پذیری امنیتی
- مدیریت صحیح خطاها

### سئو
- امتیاز Lighthouse: 100
- متا تگ‌های صحیح
- داده‌های ساختاریافته

## 🛠️ ابزارها و تکنولوژی‌ها

### فریمورک‌ها
- Vue.js 3
- TypeScript
- Tailwind CSS

### ابزارها
- Vite
- Axios
- PostCSS

### استقرار
- GitHub Pages
- GitHub Actions

## 📚 منابع آموزشی

- [Vue.js Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages Documentation](https://docs.github.com/pages)

## 🤝 مشارکت

در صورت تمایل به مشارکت در این پروژه:

1. Fork کنید
2. Branch جدید ایجاد کنید
3. تغییرات را اعمال کنید
4. Pull Request ارسال کنید

## 📄 مجوز

این پروژه برای اهداف آموزشی و نمونه کار ایجاد شده است و ارتباطی با دیجی‌کالا ندارد.

## 📞 پشتیبانی

در صورت بروز مشکل:

1. Issues مخزن را بررسی کنید
2. مستندات را مطالعه کنید
3. issue جدید ایجاد کنید

---

**ساخته شده با ❤️ توسط Freebuff**
