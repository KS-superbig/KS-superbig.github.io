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
}