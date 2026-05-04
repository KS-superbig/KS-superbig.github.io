// Profile页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
  console.log('Profile page loaded');
  initProfile();
});

function initProfile() {
  // 获取所有按钮和部分
  const buttons = document.querySelectorAll(".card-buttons button");
  const sections = document.querySelectorAll(".card-section");
  const card = document.querySelector(".card");

  // 按钮点击处理函数
  const handleButtonClick = (e) => {
    const targetSection = e.target.getAttribute("data-section");
    const section = document.querySelector(targetSection);
    
    // 根据目标部分决定是否添加 is-active 类
    targetSection !== "#about" 
      ? card.classList.add("is-active") 
      : card.classList.remove("is-active");
    
    // 设置卡片状态
    card.setAttribute("data-state", targetSection);
    
    // 移除所有部分和按钮的活动状态
    sections.forEach((s) => s.classList.remove("is-active"));
    buttons.forEach((b) => b.classList.remove("is-active"));
    
    // 激活当前按钮和对应部分
    e.target.classList.add("is-active");
    section.classList.add("is-active");
  };

  // 为每个按钮添加点击事件监听器
  buttons.forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
  });

  console.log('Profile interactions initialized');
  initPhotoWall();
}

function initPhotoWall() {
  const overlay   = document.getElementById('lightbox');
  const lightImg  = document.getElementById('lightbox-img');
  const closeBtn  = document.getElementById('lightbox-close');

  // 点击图片 -> 打开 lightbox
  document.querySelectorAll('.photo-wall-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      // 换成高分辨率版本（去掉 w= 参数）
      lightImg.src = src.replace(/\?.*$/, '') + '?w=1200&q=90';
      overlay.classList.add('active');
    });
  });

  // 关闭按钮
  closeBtn.addEventListener('click', closeLightbox);

  // 点击遮罩关闭
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeLightbox();
  });

  // ESC 关闭
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    overlay.classList.remove('active');
    // 动画结束后清空 src，避免残留
    overlay.addEventListener('transitionend', () => {
      if (!overlay.classList.contains('active')) lightImg.src = '';
    }, { once: true });
  }
}