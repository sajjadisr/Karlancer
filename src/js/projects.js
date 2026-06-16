// بارگذاری داده‌ها از فایل JSON
let allProjects = [];

let currentCategory = 'all';
let currentSearch = '';

// تابع خواندن پارامتر از URL
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat && cat !== 'all') {
        currentCategory = cat;
    }
}

async function loadProjects() {
    try {
        const response = await fetch(import.meta.env.BASE_URL + 'public/data/projects.json');
        const data = await response.json();
        allProjects = data.projects;
        renderProjects();
        setActiveFilterButton();
    } catch (error) {
        console.error('خطا در بارگذاری پروژه‌ها:', error);
        document.getElementById('projectsList').innerHTML = '<div class="error">مشکل در دریافت اطلاعات</div>';
    }
}

function renderProjects() {
    const container = document.getElementById('projectsList');
    if (!container) return;

    let filtered = [...allProjects];
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    if (currentSearch.trim() !== '') {
        filtered = filtered.filter(p => 
            p.title.includes(currentSearch) || 
            p.description.includes(currentSearch)
        );
    }

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results"><p>❌ هیچ پروژه‌ای یافت نشد.</p></div>';
        return;
    }

    let html = '';
    filtered.forEach(project => {
        html += `
            <div class="project-item">
                ${project.badge ? `<div class="project-badge">${project.badge}</div>` : ''}
                <h3>${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-meta">
                    <span class="project-category">${project.category}</span>
                    <span class="project-budget">
                        <img src="${import.meta.env.BASE_URL}svg/wallet.svg" alt="بودجه" style="width: 18px; vertical-align: middle; margin-left: 4px;">
                        ${project.budget}
                    </span>
                </div>
                <div class="project-deadline">
                    <img src="${import.meta.env.BASE_URL}svg/clock.svg" alt="زمان"> زمان تحویل: ${project.deadline}
                </div>
<<<<<<< HEAD
                <a href="${import.meta.env.BASE_URL}src/pages/project-detail.html?id=${project.id}" class="project-link">
                    مشاهده جزئیات پروژه <img src="${import.meta.env.BASE_URL}svg/arrow-left.svg" alt="arrow">
=======
                <a href="project-detail.html?id=${project.id}" class="project-link">
                    مشاهده جزئیات پروژه <img src="/svg/arrow-left.svg" alt="arrow">
>>>>>>> 03a838b (Fixed)
                </a>
            </div>
        `;
    });
    container.innerHTML = html;
}

function setActiveFilterButton() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn.dataset.category === currentCategory) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getCategoryFromURL();
    loadProjects();

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.target.dataset.category;
            const url = new URL(window.location.href);
            if (currentCategory === 'all') {
                url.searchParams.delete('category');
            } else {
                url.searchParams.set('category', currentCategory);
            }
            window.history.pushState({}, '', url);
            setActiveFilterButton();
            renderProjects();
        });
    });

    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    function doSearch() {
        currentSearch = searchInput.value;
        renderProjects();
    }
    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') doSearch(); });
});
