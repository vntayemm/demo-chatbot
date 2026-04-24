(function () {
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function formatTime(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch (e) {
      return iso;
    }
  }

  function getStorageKey(pageKey) {
    return "community:" + pageKey;
  }

  function loadState(pageKey) {
    var raw = localStorage.getItem(getStorageKey(pageKey));
    if (!raw) {
      return { likes: 0, comments: [] };
    }
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.comments)) {
        return { likes: 0, comments: [] };
      }
      return { likes: parsed.likes || 0, comments: parsed.comments };
    } catch (e) {
      return { likes: 0, comments: [] };
    }
  }

  function saveState(pageKey, state) {
    localStorage.setItem(getStorageKey(pageKey), JSON.stringify(state));
  }

  function uid() {
    return "id-" + Math.random().toString(36).slice(2, 10) + "-" + Date.now();
  }

  function render(root, pageKey, state) {
    var commentsHtml = state.comments
      .map(function (c) {
        var replies = (c.replies || [])
          .map(function (r) {
            return (
              '<div class="border-start ps-3 ms-2 mt-2">' +
              '<div class="small text-secondary"><strong>' +
              escapeHtml(r.name || "Anonymous") +
              "</strong> • " +
              formatTime(r.createdAt) +
              "</div>" +
              '<div class="mt-1">' +
              escapeHtml(r.content || "") +
              "</div>" +
              "</div>"
            );
          })
          .join("");

        return (
          '<div class="border-top pt-3 mt-3" data-id="' +
          c.id +
          '">' +
          '<div class="small text-secondary"><strong>' +
          escapeHtml(c.name || "Anonymous") +
          "</strong> • " +
          formatTime(c.createdAt) +
          "</div>" +
          '<div class="mt-1">' +
          escapeHtml(c.content || "") +
          "</div>" +
          '<button class="btn btn-sm btn-outline-secondary mt-2" data-action="toggle-reply" data-id="' +
          c.id +
          '">Reply</button>' +
          '<div class="mt-2" id="reply-wrap-' +
          c.id +
          '" style="display:none;">' +
          '<input class="form-control form-control-sm mb-2" id="reply-name-' +
          c.id +
          '" placeholder="Your name" />' +
          '<textarea class="form-control form-control-sm mb-2" id="reply-content-' +
          c.id +
          '" placeholder="Write a reply..."></textarea>' +
          '<button class="btn btn-sm btn-primary" data-action="submit-reply" data-id="' +
          c.id +
          '">Send reply</button>' +
          "</div>" +
          '<div class="mt-2">' +
          replies +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    root.innerHTML =
      '<section class="mt-5 pt-4 border-top border-secondary-subtle">' +
      '<h2 class="h5 fw-semibold mb-3">Comments</h2>' +
      '<div class="d-flex gap-2 align-items-center mb-3">' +
      '<button id="cm-like-btn" class="btn btn-outline-primary btn-sm">Like</button>' +
      '<span id="cm-like-count" class="text-secondary small">' +
      state.likes +
      " likes</span>" +
      "</div>" +
      '<div class="mb-3">' +
      '<input id="cm-name" class="form-control mb-2" placeholder="Your name" />' +
      '<textarea id="cm-comment" class="form-control mb-2" placeholder="Write a comment..."></textarea>' +
      '<button id="cm-submit" class="btn btn-primary btn-sm">Post comment</button>' +
      "</div>" +
      '<div>' +
      commentsHtml +
      "</div>" +
      "</section>";

    var likeBtn = root.querySelector("#cm-like-btn");
    likeBtn.addEventListener("click", function () {
      state.likes += 1;
      saveState(pageKey, state);
      render(root, pageKey, state);
    });

    var submitBtn = root.querySelector("#cm-submit");
    submitBtn.addEventListener("click", function () {
      var nameInput = root.querySelector("#cm-name");
      var commentInput = root.querySelector("#cm-comment");
      var name = (nameInput.value || "").trim();
      var content = (commentInput.value || "").trim();
      if (!content) {
        return;
      }
      state.comments.unshift({
        id: uid(),
        name: name || "Anonymous",
        content: content,
        createdAt: nowIso(),
        replies: []
      });
      saveState(pageKey, state);
      render(root, pageKey, state);
    });

    root.querySelectorAll('[data-action="toggle-reply"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var wrap = root.querySelector("#reply-wrap-" + id);
        if (!wrap) return;
        wrap.style.display = wrap.style.display === "none" ? "block" : "none";
      });
    });

    root.querySelectorAll('[data-action="submit-reply"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var nameEl = root.querySelector("#reply-name-" + id);
        var contentEl = root.querySelector("#reply-content-" + id);
        var name = (nameEl.value || "").trim();
        var content = (contentEl.value || "").trim();
        if (!content) {
          return;
        }
        var found = state.comments.find(function (c) {
          return c.id === id;
        });
        if (!found) {
          return;
        }
        found.replies = found.replies || [];
        found.replies.push({
          id: uid(),
          name: name || "Anonymous",
          content: content,
          createdAt: nowIso()
        });
        saveState(pageKey, state);
        render(root, pageKey, state);
      });
    });
  }

  function init() {
    var root = document.getElementById("community-root");
    if (!root) {
      return;
    }
    var pageKey = root.getAttribute("data-page-key");
    if (!pageKey) {
      pageKey = location.pathname || "default-page";
    }
    var state = loadState(pageKey);
    render(root, pageKey, state);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
