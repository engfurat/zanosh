document.addEventListener('DOMContentLoaded', () => {
    
    // 1. إدارة السلة (LocalStorage لتعمل في كل الصفحات)
    const cartCountElement = document.getElementById('cart-count');
    const addButtons = document.querySelectorAll('.add-btn'); // تأكدي أن الكلاس في HTML هو add-btn
    
    let count = parseInt(localStorage.getItem('cartCount')) || 0;
    if(cartCountElement) cartCountElement.innerText = count;

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            count++;
            localStorage.setItem('cartCount', count);
            if(cartCountElement) cartCountElement.innerText = count;

            // تأثير بصري للزر
            const originalContent = button.innerHTML;
            button.innerHTML = '✓ تمت الإضافة';
            button.style.backgroundColor = "#D4AF37"; // ذهبي

            setTimeout(() => {
                button.innerHTML = originalContent;
                button.style.backgroundColor = ""; // يعود للبرغندي
            }, 1000);
        });
    });

    // 2. إدارة منيو الجوال
    const mobileBtn = document.getElementById('mobile-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // تغيير الأيقونة
            const icon = mobileBtn.querySelector('i');
            if(icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // إغلاق المنيو عند الضغط في الخارج
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && e.target !== mobileBtn) {
                navMenu.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if(icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
});

// 3. وظيفة القلب (خارج DOMContentLoaded لسهولة الاستدعاء من HTML)
function toggleWishlist(btn) {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    if(icon) {
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
    }
}