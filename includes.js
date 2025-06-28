document.addEventListener("DOMContentLoaded", function () {
  const loadHTML = async (id, file, callback) => {
    const target = document.getElementById(id);
    if (target) {
      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error("Fetch failed");
        const html = await response.text();
        target.innerHTML = html;
        if (typeof callback === "function") callback();
      } catch (err) {
        console.error(`Failed to load ${file}:`, err);
      }
    }
  };

  // Header + nav toggle logic after load
  loadHTML("header", "header.html", () => {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  });

  // Footer (no callback needed)
  loadHTML("footer", "footer.html");
});
