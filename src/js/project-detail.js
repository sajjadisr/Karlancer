// دریافت شناسه از URL
function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

async function loadProjectDetail() {
    const id = getProjectId();
    if (!id) {
        document.getElementById('projectDetailContainer').innerHTML = '<div class="error">شناسه پروژه مشخص نیست</div>';
        return;
    }

    try {
        const response = await fetch(import.meta.env.BASE_URL + 'public/data/projects.json');
        const data = await response.json();
        const project = data.projects.find(p => p.id === id);

        if (!project) {
            document.getElementById('projectDetailContainer').innerHTML = '<div class="error">پروژه مورد نظر یافت نشد</div>';
            return;
        }

        // رندر کردن جزئیات با SVGها
        renderDetail(project);
    } catch (error) {
        console.error('خطا:', error);
        document.getElementById('projectDetailContainer').innerHTML = '<div class="error">مشکل در دریافت اطلاعات</div>';
    }
}

function renderDetail(project) {
    const html = `
        <div class="project-detail-card">
            <div class="detail-header">
                <h1>${project.title}</h1>
                ${project.badge ? `<div class="project-status">${project.badge}</div>` : ''}
            </div>

            <div class="detail-info">
                <div class="info-item">
                    <div class="info-icon"><img src="${import.meta.env.BASE_URL}svg/wallet.svg" alt="بودجه"></div>
                    <div><div class="info-label">بودجه</div><div class="info-value">${project.budget}</div></div>
                </div>
                <div class="info-item">
                    <div class="info-icon"><img src="${import.meta.env.BASE_URL}svg/clock.svg" alt="زمان"></div>
                    <div><div class="info-label">زمان تحویل</div><div class="info-value">${project.deadline}</div></div>
                </div>
                <div class="info-item">
                    <div class="info-icon"><img src="${import.meta.env.BASE_URL}svg/folder.svg" alt="دسته"></div>
                    <div><div class="info-label">دسته‌بندی</div><div class="info-value">${project.category}</div></div>
                </div>
            </div>

            <div class="detail-description">
                <h3>توضیحات کامل پروژه</h3>
                <p>${project.fullDescription || project.description}</p>
            </div>

            <div class="skills-section">
                <h3>مهارت‌های موردنیاز</h3>
                <div class="skills-list">
                    ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>

            <div class="proposal-stats">
                <div class="proposal-count">
                    <img src="${import.meta.env.BASE_URL}svg/proposal.svg" alt="پیشنهاد"> <strong>${project.proposalsCount}</strong> پیشنهاد ارسال شده
                </div>
                <div>آخرین مهلت: ${project.deadline}</div>
            </div>

            <div class="submit-proposal">
                <button class="btn-submit" id="submitProposalBtn">ارسال پیشنهاد برای این پروژه</button>
            </div>

            <div class="client-info">
                <h3><img src="${import.meta.env.BASE_URL}svg/user.svg" alt="کارفرما"> اطلاعات کارفرما</h3>
                <div class="client-details">
                    <div class="client-avatar">${project.client.avatar}</div>
                    <div>
                        <div class="client-name">${project.client.name}</div>
                        <div class="client-rating"><img src="${import.meta.env.BASE_URL}svg/star.svg" alt="ستاره"> ${project.client.rating} (از ۵)</div>
                        <div class="client-member">عضو از ${project.client.memberSince}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('projectDetailContainer').innerHTML = html;

    const submitBtn = document.getElementById('submitProposalBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => alert('برای ارسال پیشنهاد باید وارد شوید.'));
    }
}

document.addEventListener('DOMContentLoaded', loadProjectDetail);
