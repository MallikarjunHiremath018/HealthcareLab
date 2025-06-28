document.addEventListener("DOMContentLoaded", () => {
  // COMMENT SYSTEM
  const scriptURL = "https://script.google.com/macros/s/AKfycbzS44R-DgwNn4tlHoWHWblPx9EFXqmqsR9idlJWX4Vxdobh-0CDXn4RXgTkQh9N0vHr/exec";

  const form = document.getElementById("commentForm");
  const nameField = document.getElementById("name");
  const commentField = document.getElementById("comment");
  const commentList = document.getElementById("commentList");
  const toggleBtn = document.getElementById("toggleCommentsBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let allComments = [];
  let showingAll = false;

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = nameField.value.trim();
      const comment = commentField.value.trim();
      if (!name || !comment) return;

      await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ name, comment }),
      });

      nameField.value = "";
      commentField.value = "";
      loadComments();
    });
  }

  async function loadComments() {
    const res = await fetch(scriptURL);
    const data = await res.json();
    allComments = data.reverse();
    renderComments();
  }

  function renderComments() {
    const visible = showingAll ? allComments : allComments.slice(0, 3);

    commentList.innerHTML = visible.map(c => {
      const date = new Date(c.timestamp);
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      return `
        <div class="comment-box">
          <div class="comment-header">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" class="avatar">
            <span class="comment-name">${c.name}</span>
          </div>
          <div class="comment-text">"${c.comment}"</div>
          <div class="comment-date">${formattedDate}</div>
        </div>
      `;
    }).join('');

    if (allComments.length > 3) {
      toggleBtn.style.display = "inline-block";
      toggleBtn.innerText = showingAll ? "Show Less" : "View All Comments";
    } else {
      toggleBtn.style.display = "none";
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      showingAll = !showingAll;
      renderComments();
    });
  }

  if (prevBtn && nextBtn && commentList) {
    prevBtn.addEventListener("click", () => {
      commentList.scrollBy({ left: -320, behavior: 'smooth' });
    });

    nextBtn.addEventListener("click", () => {
      commentList.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  loadComments();
});
