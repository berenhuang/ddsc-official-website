document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 阻止默认提交

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    
    const loading = document.querySelector(".loading");
    const errorMessage = document.querySelector(".error-message");
    const successMessage = document.querySelector(".sent-message");

    // 显示加载状态
    loading.style.display = "block";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    // 简单的邮箱格式验证
    if (!validateEmail(email)) {
      loading.style.display = "none";
      errorMessage.textContent = "Invalid email address!";
      errorMessage.style.display = "block";
      return;
    }

    if (name === "" || subject === "" || message === "") {
      loading.style.display = "none";
      errorMessage.textContent = "All fields are required!";
      errorMessage.style.display = "block";
      return;
    }

    // 📌 存储到 Local Storage（模拟数据库）
    saveContactMessage({ name, email, subject, message });

    // 📌 这里可以扩展，例如发送到 Firebase 或 Google Sheets
    setTimeout(() => {
      loading.style.display = "none";
      successMessage.style.display = "block";
      contactForm.reset(); // 清空输入框
    }, 1000);
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function saveContactMessage(data) {
    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    messages.push(data);
    localStorage.setItem("contactMessages", JSON.stringify(messages));
  }
});