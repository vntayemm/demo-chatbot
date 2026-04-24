(function () {
  var REPO_URL = "https://github.com/vntayemm/demo-chatbot";
  var RAW_BASE_URL = "https://raw.githubusercontent.com/vntayemm/demo-chatbot/main/docs/";

  function getBasePath() {
    if (window.__md_scope && window.__md_scope.pathname) {
      return window.__md_scope.pathname;
    }
    return "/";
  }

  function normalizePath(pathname) {
    var basePath = getBasePath();
    var path = pathname;
    if (path.indexOf(basePath) === 0) {
      path = path.slice(basePath.length);
    } else {
      path = path.replace(/^\/+/, "");
    }
    path = path.replace(/\/+$/, "");
    if (path === "") {
      return "index.md";
    }
    if (path.endsWith(".html")) {
      return path.replace(/\.html$/, ".md");
    }
    return path + ".md";
  }

  function toRawMarkdownUrl() {
    var markdownPath = normalizePath(window.location.pathname);
    return RAW_BASE_URL + markdownPath;
  }

  function copyToClipboard(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }
    return Promise.reject(new Error("Clipboard API unavailable"));
  }

  function showToast(message) {
    var toast = document.createElement("div");
    toast.className = "page-actions-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(function () {
      toast.classList.add("show");
    }, 10);
    window.setTimeout(function () {
      toast.classList.remove("show");
      window.setTimeout(function () {
        toast.remove();
      }, 200);
    }, 1800);
  }

  function actionItem(label, id) {
    return '<button class="page-actions-item" type="button" data-action="' + id + '">' + label + "</button>";
  }

  function renderActions() {
    return (
      '<div class="page-actions-wrap">' +
      '<button class="page-actions-trigger" type="button" aria-expanded="false" aria-controls="page-actions-menu">Page Actions</button>' +
      '<div id="page-actions-menu" class="page-actions-menu" hidden>' +
      actionItem("Copy Page URL", "copy-page") +
      actionItem("Copy Raw Markdown URL", "copy-raw") +
      actionItem("Open in ChatGPT", "open-chatgpt") +
      actionItem("Open in Claude", "open-claude") +
      actionItem("Open Source on GitHub", "open-github") +
      "</div>" +
      "</div>"
    );
  }

  function bindActions(container) {
    var trigger = container.querySelector(".page-actions-trigger");
    var menu = container.querySelector(".page-actions-menu");
    if (!trigger || !menu) {
      return;
    }

    trigger.addEventListener("click", function () {
      var isHidden = menu.hasAttribute("hidden");
      if (isHidden) {
        menu.removeAttribute("hidden");
        trigger.setAttribute("aria-expanded", "true");
      } else {
        menu.setAttribute("hidden", "");
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", function (event) {
      if (!container.contains(event.target)) {
        menu.setAttribute("hidden", "");
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    menu.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      var action = target.getAttribute("data-action");
      if (!action) {
        return;
      }

      var pageUrl = window.location.href;
      var rawUrl = toRawMarkdownUrl();
      var query = encodeURIComponent("Summarize this page: " + pageUrl);

      if (action === "copy-page") {
        copyToClipboard(pageUrl).then(function () {
          showToast("Copied page URL");
        });
      } else if (action === "copy-raw") {
        copyToClipboard(rawUrl).then(function () {
          showToast("Copied raw markdown URL");
        });
      } else if (action === "open-chatgpt") {
        window.open("https://chatgpt.com/?q=" + query, "_blank", "noopener");
      } else if (action === "open-claude") {
        window.open("https://claude.ai/new?q=" + query, "_blank", "noopener");
      } else if (action === "open-github") {
        window.open(REPO_URL + "/blob/main/docs/" + normalizePath(window.location.pathname), "_blank", "noopener");
      }

      menu.setAttribute("hidden", "");
      trigger.setAttribute("aria-expanded", "false");
    });
  }

  function initPageActions() {
    if (document.querySelector(".page-actions-wrap")) {
      return;
    }
    document.body.insertAdjacentHTML("beforeend", renderActions());
    var wrap = document.querySelector(".page-actions-wrap");
    if (wrap) {
      bindActions(wrap);
    }
  }

  document.addEventListener("DOMContentLoaded", initPageActions);
})();
