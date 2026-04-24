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

  /** Same entries as navbar "Kham pha" — reused in footer */
  function getExploreLinks() {
    return [
      { href: "./features.html", icon: "bi-grid-3x3-gap", label: "Features", newTab: false },
      { href: "./blogs.html", icon: "bi-journal-text", label: "Blogs", newTab: false },
      { href: "./articles.html", icon: "bi-mortarboard", label: "Articles / Khoa hoc", newTab: false },
      { href: "./news.html", icon: "bi-megaphone", label: "News", newTab: false },
      { href: "./faq.html", icon: "bi-patch-question", label: "FAQ", newTab: false },
      { href: DOCS_SITE_URL, icon: "bi-journal-bookmark", label: "Docs / Tai lieu (MkDocs)", newTab: true },
    ];
  }

  function navDropdownItem(href, icon, label, openInNewTab) {
    var extra = openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    return '<li><a class="dropdown-item" href="' + href + '"' + extra + '><i class="bi ' + icon + ' me-2"></i>' + label + "</a></li>";
  }

  function renderExploreDropdownItems() {
    return getExploreLinks()
      .map(function (item) {
        return navDropdownItem(item.href, item.icon, item.label, item.newTab);
      })
      .join("");
  }

  function footerExploreLink(item) {
    var extra = item.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    return (
      '<a class="link-secondary text-decoration-none d-inline-flex align-items-center gap-2 py-1" href="' +
      item.href +
      '"' +
      extra +
      '><i class="bi ' +
      item.icon +
      ' flex-shrink-0"></i><span>' +
      item.label +
      "</span></a>"
    );
  }

  function renderHeader() {
    var exploreMenu =
      '<li class="nav-item dropdown">' +
      '<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Kham pha</a>' +
      '<ul class="dropdown-menu dropdown-menu-end shadow">' +
      renderExploreDropdownItems() +
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
      navLink("./landing.html", "bi-house-door", "Landing") +
      navLink("./index.html", "bi-chat-dots", "Test chatbot") +
      exploreMenu +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</nav>" +
      "</header>"
    );
  }

  function footerLocalPolicyLink(href, label) {
    return '<a class="link-secondary text-decoration-none" href="' + href + '">' + label + "</a>";
  }

  function renderFooter() {
    var exploreBlock =
      "<div>" +
      "<strong class=\"d-block mb-1\">Explore / Khám phá</strong>" +
      '<nav class="d-flex flex-column" aria-label="Explore site sections">' +
      getExploreLinks()
        .map(function (item) {
          return footerExploreLink(item);
        })
        .join("") +
      "</nav>" +
      "</div>";
    var policyBlock =
      "<div>" +
      "<strong class=\"d-block mb-1\">Policies / Chính sách</strong>" +
      '<nav class="d-flex flex-column gap-1" aria-label="Legal policies">' +
      footerLocalPolicyLink("./terms-of-service.html", "Terms of Service") +
      footerLocalPolicyLink("./privacy-policy.html", "Privacy Policy") +
      footerLocalPolicyLink("./payment-policy.html", "Payment Policy") +
      "</nav>" +
      "</div>";
    return (
      '<footer class="bg-body-tertiary mt-5 py-4 small">' +
      '<div class="container">' +
      '<div class="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-4 justify-content-between">' +
      '<div class="col"><strong>Enterprise Chatbot | AI</strong><br>Production-ready chatbot package for enterprises.</div>' +
      '<div class="col">' +
      exploreBlock +
      "</div>" +
      '<div class="col">' +
      policyBlock +
      "</div>" +
      '<div class="col text-xl-end">' +
      "Contact: sales@example.com<br>&copy; " +
      currentYear() +
      " AI Team | GlobalDevHubs Co., Ltd</div>" +
      "</div>" +
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
