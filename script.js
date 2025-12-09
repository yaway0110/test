// 頁面切換功能
document.addEventListener('DOMContentLoaded', function() {
    // 取得所有導航連結
    const navLinks = document.querySelectorAll('.nav-link');
    const cardButtons = document.querySelectorAll('.card-btn');
    const normalButtons = document.querySelectorAll('.btn');
    const pages = document.querySelectorAll('.page');

    // 顯示指定頁面的函數
    function showPage(pageId) {
        // 隱藏所有頁面
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // 移除所有導航連結的 active 狀態
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // 顯示目標頁面
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 將對應的導航連結設為 active
        const activeNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }

        // 滾動到頁面頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // 更新 URL hash（不觸發頁面跳轉）
        history.pushState(null, null, `#${pageId}`);
    }

    // 處理導航連結點擊
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });

    // 處理卡片按鈕點擊
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });

    // 處理一般按鈕點擊
    normalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });

    // 處理瀏覽器前進後退按鈕
    window.addEventListener('popstate', function() {
        const pageId = window.location.hash.substring(1) || 'home';
        showPage(pageId);
    });

    // 頁面載入時檢查 URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showPage(initialHash);
    } else {
        showPage('home');
    }

    // 平滑滾動效果增強
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});

// 添加滾動視差效果給雲朵
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const clouds = document.querySelectorAll('.decoration');
    
    clouds.forEach((cloud, index) => {
        const speed = (index + 1) * 0.5;
        cloud.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 添加頁面載入動畫
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});