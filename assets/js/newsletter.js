document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.getElementById("newsletter-form");

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 阻止默认提交

    const emailInput = document.getElementById("newsletter-email").value.trim();
    const loading = document.querySelector(".loading");
    const errorMessage = document.querySelector(".error-message");
    const successMessage = document.querySelector(".sent-message");

    // 显示加载状态
    loading.style.display = "block";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    // 简单的邮箱格式验证
    if (!validateEmail(emailInput)) {
      loading.style.display = "none";
      errorMessage.textContent = "Invalid email address!";
      errorMessage.style.display = "block";
      return;
    }

    // 📌 存储到 Local Storage（模拟数据库）
    saveEmailToLocal(emailInput);

    // 📌 这里可以扩展，例如发送到 Firebase 或 Google Sheets
    setTimeout(() => {
      loading.style.display = "none";
      successMessage.style.display = "block";
      newsletterForm.reset(); // 清空输入框
    }, 1000);
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function saveEmailToLocal(email) {
    let subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));
    }
  }
});