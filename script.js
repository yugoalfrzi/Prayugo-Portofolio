// ==========================
// AOS INIT
// ==========================

AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: false,
    offset: 60,
    disable: 'mobile'
});


// ==========================
// NAVBAR SCROLL BEHAVIOR
// ==========================

const mainNav = document.getElementById('mainNav');

function updateNav() {
    const scrolled = window.scrollY > 50;
    mainNav.classList.toggle('scrolled', scrolled);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();


// ==========================
// ACTIVE NAV LINK (SCROLL SPY)
// ==========================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active-link',
                    link.getAttribute('href') === `#${id}`
                );
            });
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));


// ==========================
// TYPING EFFECT
// ==========================

const roles = ['Fullstack Developer', 'Laravel Developer', 'Web Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
    const current = roles[roleIndex];

    if (isDeleting) {
        typingEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeLoop, 350);
        return;
    }

    setTimeout(typeLoop, isDeleting ? 55 : 90);
}

setTimeout(typeLoop, 900);


// ==========================
// LANGUAGE TOGGLE
// ==========================

const languageToggle = document.getElementById('languageToggle');
let currentLanguage = 'id';

function changeLanguage() {
    currentLanguage = currentLanguage === 'id' ? 'en' : 'id';

    document.querySelectorAll('[data-id][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLanguage}`);
    });

    languageToggle.textContent = currentLanguage === 'id' ? 'EN' : 'ID';
    document.documentElement.lang = currentLanguage;
}

languageToggle.addEventListener('click', changeLanguage);


// ==========================
// PROJECT GALLERY THUMBNAILS
// ==========================

const galleries = {
    laskar: [
        'assets/silaskar_page/dashboard.page.png',
        'assets/silaskar_page/pendaftaran.page.png',
        'assets/silaskar_page/verifikasi.page.png'
    ],
    alat: [
        'assets/sipinjam_page/dashboard.png',
        'assets/sipinjam_page/peminjaman.png',
        'assets/sipinjam_page/pengembalian.png'
    ]
};

document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const galleryName = thumb.dataset.gallery;
        const index = Number(thumb.dataset.index);
        const card = thumb.closest('.project-card');
        const mainImage = card.querySelector('.gallery-main');
        const counter = card.querySelector('.image-counter');

        // fade out/in
        mainImage.style.opacity = '0';
        mainImage.style.transform = 'scale(0.98)';

        setTimeout(() => {
            mainImage.src = galleries[galleryName][index];
            mainImage.dataset.index = index;
            mainImage.style.opacity = '1';
            mainImage.style.transform = 'scale(1)';
        }, 180);

        mainImage.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
        counter.textContent = `${index + 1} / 3`;

        card.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});


// ==========================
// LIGHTBOX
// ==========================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounterEl = document.getElementById('lightboxCounter');

let activeGallery = 'laskar';
let activeIndex = 0;

function showLightbox() {
    const imgs = galleries[activeGallery];
    lightboxImage.src = imgs[activeIndex];
    lightboxCounterEl.textContent = `${activeIndex + 1} / ${imgs.length}`;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    const total = galleries[activeGallery].length;
    activeIndex = (activeIndex + direction + total) % total;
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        lightboxImage.src = galleries[activeGallery][activeIndex];
        lightboxCounterEl.textContent = `${activeIndex + 1} / ${total}`;
        lightboxImage.style.opacity = '1';
    }, 150);
}

lightboxImage.style.transition = 'opacity 0.15s ease';

document.querySelectorAll('.main-image').forEach(container => {
    container.addEventListener('click', () => {
        const img = container.querySelector('.gallery-main');
        activeGallery = img.dataset.gallery;
        activeIndex = Number(img.dataset.index);
        showLightbox();
    });
});

document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});


// ==========================
// PROJECT DETAIL MODAL
// ==========================

const projectDetails = {
    laskar: {
        title: 'SI LASKAR',
        number: 'PROJECT 01',
        description: 'Sistem informasi layanan sosial kelembagaan dan administrasi Lembaga Kesejahteraan Sosial untuk mendukung proses pendaftaran, verifikasi, dan pengelolaan data LKS di lingkungan Dinas Sosial Provinsi Jawa Barat.',
        technologies: ['Laravel', 'MySQL', 'Bootstrap'],
        features: [
            'Dashboard monitoring LKS secara real-time',
            'Sistem multi-role: LKS, Admin, dan Super Admin.',
            'Registrasi dan persetujuan akun.',
            'Pengunggahan dan pemeriksaan dokumen.',
            'Verifikasi berjenjang kabupaten/kota hingga provinsi.',
            'Integrasi Google OAuth dan Brevo.',
            'Perancangan database dengan 10 tabel MySQL.',
            'Dokumentasi teknis dan pengujian aplikasi.'
        ]
    },
    alat: {
        title: 'SIPINJAM',
        number: 'PROJECT 02',
        description: 'Aplikasi berbasis web untuk mengelola proses peminjaman dan pengembalian alat dengan pembagian akses antara admin, peminjam, dan petugas.',
        technologies: ['Laravel', 'MySQL', 'Bootstrap'],
        features: [
            'Autentikasi dengan 3 role pengguna.',
            'Pengelolaan data alat dan peminjam.',
            'Validasi ketersediaan stok saat peminjaman.',
            'Riwayat peminjaman serta laporan dan fitur cetak.'
        ]
    }
};

const projectModal = document.getElementById('projectModal');

document.querySelectorAll('.detail-btn').forEach(button => {
    button.addEventListener('click', () => {
        const key = button.dataset.project;
        const project = projectDetails[key];

        document.getElementById('modalProjectNumber').textContent = project.number;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;

        // Tech tags
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.textContent = tech;
            techContainer.appendChild(tag);
        });

        // Features list
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = '';
        if (project.features && project.features.length) {
            const label = document.createElement('span');
            label.className = 'modal-section-label';
            label.textContent = 'Fitur Utama';
            featuresContainer.appendChild(label);

            project.features.forEach(feat => {
                const item = document.createElement('div');
                item.className = 'modal-feature-item';
                item.innerHTML = `<span class="modal-feature-dot"></span><span>${feat}</span>`;
                featuresContainer.appendChild(item);
            });
        }

        projectModal.classList.add('show');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

function closeProjectModal() {
    projectModal.classList.remove('show');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.getElementById('closeModal').addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', e => {
    if (e.target === projectModal) closeProjectModal();
});


// ==========================
// KEYBOARD CONTROLS
// ==========================

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeLightbox();
        closeProjectModal();
    }

    if (lightbox.classList.contains('show')) {
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
    }
});


// ==========================
// BACK TO TOP
// ==========================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 450);
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ==========================
// NAVBAR MOBILE: auto-close on link click
// ==========================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const collapse = document.getElementById('navbarMenu');
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
    });
});
