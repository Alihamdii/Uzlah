مشروع متجر عُزلة - مكتمل
تشغيل محلي:
- افتح المجلد في VS Code
- استخدم Live Server لتشغيل index.html
ماذا يحتوي المشروع:
- صفحات: index.html, product.html, checkout.html, booking.html
- assets: style.css, store.js (يحتوي على منطق السلة وتحميل المنتجات)
- data/products.json: 60 منتج (20 لكل قسم). الكتب والموسيقى مجانية (السعر 0 درهم).
ملاحظات: الدفع محاكاة (وهمي). لتوصيل بوابة دفع حقيقية، احتاج مفاتيح API من خدمة الدفع (Stripe/PayPal/HyperPay) ويمكني ادمجها.


---
Payment & Merchant setup:
- Open checkout.html and use the payment form.
- To set your bank/account details locally: open the browser console and run `setMerchantInfo()` and follow prompts. Merchant info is stored in localStorage.
- Orders are stored in localStorage under 'ozluh_orders'.
- For a real payment gateway, you'll need to integrate with a provider and supply API keys.


Images: product images use high-quality public images (Unsplash) as placeholders. Replace with AliExpress product images if you prefer by saving images into the images/ folder and updating data/products.json accordingly.
