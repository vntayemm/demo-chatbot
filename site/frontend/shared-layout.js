(function () {
  var THEME_KEY = "site-theme";

  function currentYear() {
    return new Date().getFullYear();
  }

  function navLink(href, icon, label) {
    return '<li class="nav-item"><a class="nav-link" href="' + href + '"><i class="bi ' + icon + ' me-1"></i>' + label + "</a></li>";
  }

  // MkDocs site_url in mkdocs.yml (change if repo or Pages URL changes)
  var DOCS_SITE_URL = "https://vntayemm.github.io/demo-chatbot/";

  function navDropdownItem(href, icon, label, openInNewTab) {
    var extra = openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    return '<li><a class="dropdown-item" href="' + href + '"' + extra + '><i class="bi ' + icon + ' me-2"></i>' + label + "</a></li>";
  }

  function renderHeader() {
    var exploreMenu =
      '<li class="nav-item dropdown">' +
      '<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Kham pha</a>' +
      '<ul class="dropdown-menu dropdown-menu-end shadow">' +
      navDropdownItem("./features.html", "bi-grid-3x3-gap", "Features") +
      navDropdownItem("./blogs.html", "bi-journal-text", "Blogs") +
      navDropdownItem("./articles.html", "bi-mortarboard", "Articles / Khoa hoc") +
      navDropdownItem("./news.html", "bi-megaphone", "News") +
      navDropdownItem("./faq.html", "bi-patch-question", "FAQ") +
      navDropdownItem(DOCS_SITE_URL, "bi-journal-bookmark", "Docs / Tai lieu (MkDocs)", true) +
      "</ul>" +
      "</li>";
    return (
      '<header class="fixed-top">' +
      '<nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom shadow-sm">' +
      '<div class="container">' +
      '<a class="navbar-brand fw-semibold" href="./index.html"><i class="bi bi-robot me-2"></i>Enterprise Chatbot | AI</a>' +
      '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">' +
      '<span class="navbar-toggler-icon"></span>' +
      "</button>" +
      '<div class="collapse navbar-collapse" id="mainNav">' +
      '<ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">' +
      navLink("./landing.html", "bi-house-door", "Home page") +
      navLink("./index.html", "bi-chat-dots", "Test chatbot") +
      exploreMenu +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</nav>" +
      "</header>"
    );
  }

  function renderFooter() {
    return (
      '<footer class="bg-body-tertiary mt-5 py-4 small">' +
      '<div class="container d-flex flex-column flex-md-row justify-content-between gap-2">' +
      "<div><strong>Enterprise Chatbot | AI</strong><br>Production-ready chatbot package for enterprises.</div>" +
      "<div>Contact: sales@example.com<br>&copy; " + currentYear() + " AI Team | GlobalDevHubs Co., Ltd</div>" +
      "</div>" +
      "</footer>"
    );
  }

  function resolveInitialTheme() {
    var storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function renderThemeToggle(theme) {
    var isDark = theme === "dark";
    var icon = isDark ? "bi-sun-fill" : "bi-moon-stars-fill";
    var label = isDark ? "Light" : "Dark";
    return (
      '<button id="theme-toggle" class="btn btn-primary rounded-pill shadow position-fixed bottom-0 end-0 m-3" type="button" aria-label="Toggle color theme" style="z-index:1080;">' +
      '<i class="bi ' +
      icon +
      ' me-1"></i>' +
      label +
      "</button>"
    );
  }

  function bindThemeToggle() {
    var toggleButton = document.getElementById("theme-toggle");
    if (!toggleButton) {
      return;
    }
    toggleButton.addEventListener("click", function () {
      var currentTheme = document.documentElement.getAttribute("data-bs-theme") || "light";
      var nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      toggleButton.outerHTML = renderThemeToggle(nextTheme);
      bindThemeToggle();
    });
  }

  function applyLayout() {
    var theme = resolveInitialTheme();
    applyTheme(theme);

    var body = document.body;
    var main = body.querySelector("main");
    if (!main) {
      main = document.createElement("main");
      while (body.firstChild) {
        main.appendChild(body.firstChild);
      }
      body.appendChild(main);
    }

    document.body.insertAdjacentHTML("afterbegin", renderHeader());
    document.body.insertAdjacentHTML("beforeend", renderFooter());
    document.body.insertAdjacentHTML("beforeend", renderThemeToggle(theme));
    if (main.hasAttribute("data-show-hero") && !main.querySelector(".hero-image")) {
      main.insertAdjacentHTML(
        "afterbegin",
        '<div class="mb-4"><img class="img-fluid w-100 rounded border hero-image" src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80" alt="AI platform banner"></div>'
      );
    }

    bindThemeToggle();
  }

  document.addEventListener("DOMContentLoaded", applyLayout);
})();
