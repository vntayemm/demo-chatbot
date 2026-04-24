(function () {
  function currentYear() {
    return new Date().getFullYear();
  }

  function navLink(href, icon, label) {
    return '<li class="nav-item"><a class="nav-link" href="' + href + '"><i class="bi ' + icon + ' me-1"></i>' + label + "</a></li>";
  }

  function renderHeader() {
    return (
      '<header class="fixed-top">' +
      '<nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary-subtle">' +
      '<div class="container">' +
      '<a class="navbar-brand fw-semibold" href="./index.html"><i class="bi bi-robot me-2"></i>Demo Chatbot</a>' +
      '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">' +
      '<span class="navbar-toggler-icon"></span>' +
      "</button>" +
      '<div class="collapse navbar-collapse" id="mainNav">' +
      '<ul class="navbar-nav ms-auto">' +
      navLink("./landing.html", "bi-house-door", "Landing") +
      navLink("./features.html", "bi-grid-3x3-gap", "Features") +
      navLink("./blogs.html", "bi-journal-text", "Blogs") +
      navLink("./articles.html", "bi-mortarboard", "Articles") +
      navLink("./news.html", "bi-megaphone", "News") +
      navLink("./faq.html", "bi-patch-question", "FAQ") +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</nav>" +
      "</header>"
    );
  }

  function renderFooter() {
    return (
      '<footer class="site-footer bg-dark mt-5 py-4">' +
      '<div class="container d-flex flex-column flex-md-row justify-content-between gap-2">' +
      "<div><strong>Demo Chatbot</strong><br>Production-ready chatbot package for enterprises.</div>" +
      "<div>Contact: sales@example.com<br>&copy; " + currentYear() + " Demo Chatbot Team</div>" +
      "</div>" +
      "</footer>"
    );
  }

  function applyLayout() {
    var body = document.body;
    var main = body.querySelector("main");
    if (!main) {
      main = document.createElement("main");
      while (body.firstChild) {
        main.appendChild(body.firstChild);
      }
      body.appendChild(main);
    }

    document.body.classList.add("bg-dark", "text-light");
    document.body.insertAdjacentHTML("afterbegin", renderHeader());
    document.body.insertAdjacentHTML("beforeend", renderFooter());
    main.classList.add("site-main");
    if (!main.querySelector(".hero-image")) {
      main.insertAdjacentHTML(
        "afterbegin",
        '<div class="mb-4"><img class="hero-image" src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80" alt="AI platform banner"></div>'
      );
    }
  }

  document.addEventListener("DOMContentLoaded", applyLayout);
})();
