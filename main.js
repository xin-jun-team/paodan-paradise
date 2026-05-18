// ══ 導覽列自動標記當前頁 ══
function initNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.topnav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === path);
  });
}

// ══ 浮動側欄 Modal ══
function initFloatSidebar() {
  document.querySelectorAll('.float-btn[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.modal);
      if (modal) modal.classList.add('open');
    });
  });

  document.querySelectorAll('.float-modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });
    modal.querySelector('.modal-close')?.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.float-modal.open').forEach(m => m.classList.remove('open'));
    }
  });
}

// ══ Hero 視差滾動 ══
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  }, { passive: true });
}

// ══ 下拉選單 click-toggle ══
function initDropdowns() {
  document.querySelectorAll('.topnav-dropdown').forEach(dd => {
    dd.querySelector(':scope > .topnav-link').addEventListener('click', e => {
      // 有 href 的直接跳轉，不開 dropdown
      if (e.currentTarget.getAttribute('href')) return;
      e.stopPropagation();
      const isOpen = dd.classList.contains('open');
      document.querySelectorAll('.topnav-dropdown.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) dd.classList.add('open');
    });
  });
  // 點選單外部關閉
  document.addEventListener('click', () => {
    document.querySelectorAll('.topnav-dropdown.open').forEach(o => o.classList.remove('open'));
  });
  // 選單內連結點擊後關閉
  document.querySelectorAll('.dropdown-menu a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelectorAll('.topnav-dropdown.open').forEach(o => o.classList.remove('open'));
    });
  });
}

// ══ 回到頂部 ══
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ══ 返回遊戲特色浮動按鈕 ══
function initBackToFeature() {
  const link = document.querySelector('.sticky-back a');
  if (!link) return;
  const btn = document.createElement('button');
  btn.id = 'backToFeature';
  btn.title = '返回遊戲特色';
  btn.textContent = '← 特色';
  btn.addEventListener('click', () => { location.href = link.href; });
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
}

// ══ 啟動 ══
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initDropdowns();
  initFloatSidebar();
  initParallax();
  initBackToTop();
  initBackToFeature();
});
