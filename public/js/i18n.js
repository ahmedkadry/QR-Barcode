const translations = {
    ar: {
        title: "مولد الباركود و QR Code",
        type_label: "نوع الكود",
        text_label: "النص / الرابط",
        text_placeholder: "أدخل النص أو الرابط هنا...",
        barcode_type: "صيغة الباركود",
        size_label: "الحجم / الارتفاع",
        color_label: "لون الكود",
        format_label: "صيغة التحميل",
        generate_btn: "توليد الكود",
        download_btn: "تحميل الكود",
        error_empty: "يرجى إدخال النص المطلوب لتوليد الكود!",
        seo_title: "كيفية استخدام أداة توليد الباركود و QR Code",
        seo_desc: "تتيح لك هذه الأداة المجانية إنشاء أكواد الباركود و QR Codes عالية الدقة بسرعة وسهولة. يمكنك استخدامها لإدارة المنتجات، الروابط، النصوص، والمزيد. اختر نوع الكود المطلوب، أدخل البيانات، وقم بتخصيص الألوان والأبحاث ثم حمل النتيجة بصيغة PNG أو SVG."
    },
    en: {
        title: "Barcode & QR Generator",
        type_label: "Code Type",
        text_label: "Text / URL",
        text_placeholder: "Enter text or URL here...",
        barcode_type: "Barcode Format",
        size_label: "Size / Height",
        color_label: "Code Color",
        format_label: "Download Format",
        generate_btn: "Generate Code",
        download_btn: "Download Code",
        error_empty: "Please enter text to generate code!",
        seo_title: "How to use the Barcode & QR Code Generator",
        seo_desc: "This free tool enables you to generate high-resolution Barcode and QR Codes quickly and easily. Customize sizes, colors, and download your formats in PNG or SVG."
    }
};

let currentLang = 'ar';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}