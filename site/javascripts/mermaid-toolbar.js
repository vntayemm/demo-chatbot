/**
 * Fullscreen + download SVG for Mermaid diagrams (Material for MkDocs).
 * PNG: use OS screenshot, print-to-PDF, or open the SVG in an editor — not generated here (no heavy canvas deps).
 */
(function () {
  var diagramCounter = 0;

  function downloadSvg(svgEl, index) {
    var clone = svgEl.cloneNode(true);
    if (!clone.getAttribute("xmlns")) {
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }
    var xml = new XMLSerializer().serializeToString(clone);
    var blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "mermaid-diagram-" + index + ".svg";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function openFullscreen(svgEl) {
    var overlay = document.createElement("div");
    overlay.className = "mermaid-fs-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "mermaid-fs-close";
    closeBtn.textContent = "Close (Esc)";

    var inner = document.createElement("div");
    inner.className = "mermaid-fs-inner";
    inner.appendChild(svgEl.cloneNode(true));

    function close() {
      overlay.remove();
      document.removeEventListener("keydown", onKey);
    }

    function onKey(ev) {
      if (ev.key === "Escape") {
        close();
      }
    }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (ev) {
      if (ev.target === overlay) {
        close();
      }
    });
    document.addEventListener("keydown", onKey);

    overlay.appendChild(closeBtn);
    overlay.appendChild(inner);
    document.body.appendChild(overlay);
  }

  function attachToolbar(pre) {
    if (pre.dataset.mermaidToolbarAttached) {
      return;
    }
    var svg = pre.querySelector(":scope > svg");
    if (!svg) {
      return;
    }
    pre.dataset.mermaidToolbarAttached = "1";
    diagramCounter += 1;
    var idx = diagramCounter;

    var bar = document.createElement("div");
    bar.className = "mermaid-toolbar";

    var btnFs = document.createElement("button");
    btnFs.type = "button";
    btnFs.textContent = "Fullscreen";
    btnFs.addEventListener("click", function () {
      openFullscreen(svg);
    });

    var btnDl = document.createElement("button");
    btnDl.type = "button";
    btnDl.textContent = "SVG";
    btnDl.title = "Download diagram as SVG";
    btnDl.addEventListener("click", function () {
      downloadSvg(svg, idx);
    });

    bar.appendChild(btnFs);
    bar.appendChild(btnDl);
    pre.insertBefore(bar, svg);
  }

  function scan() {
    document.querySelectorAll("pre.mermaid").forEach(attachToolbar);
  }

  var obs = new MutationObserver(function () {
    scan();
  });
  obs.observe(document.documentElement, { subtree: true, childList: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(scan, 300);
      setTimeout(scan, 1500);
    });
  } else {
    setTimeout(scan, 300);
    setTimeout(scan, 1500);
  }
})();
