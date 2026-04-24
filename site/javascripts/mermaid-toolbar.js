/**
 * Toolbar for all rendered Mermaid diagrams (Material for MkDocs).
 * Config: see mermaid-toolbar-config.js (window.MERMAID_TOOLBAR_CONFIG).
 */
(function () {
  var cfg =
    window.MERMAID_TOOLBAR_CONFIG ||
    {
      fullscreen: true,
      downloadSvg: true,
      copySource: false,
      rescanDelaysMs: [200, 600, 1500, 3500],
      labels: {
        fullscreen: "Fullscreen",
        downloadSvg: "SVG",
        copySource: "Copy",
        close: "Close (Esc)",
      },
    };

  var diagramCounter = 0;
  var labels = cfg.labels || {};

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
    closeBtn.textContent = labels.close || "Close (Esc)";

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

  function copyMermaidSource(pre) {
    var code = pre.querySelector("code");
    var text = code ? code.textContent : "";
    if (!text && pre.dataset.mermaidSource) {
      text = pre.dataset.mermaidSource;
    }
    if (!text) {
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () {});
    }
  }

  /**
   * Tim SVG sau khi Mermaid render (co the nam trong div con).
   */
  function findSvgInMermaidBlock(pre) {
    return pre.querySelector("svg");
  }

  function attachToolbar(pre) {
    if (pre.dataset.mermaidToolbarAttached) {
      return;
    }
    var svg = findSvgInMermaidBlock(pre);
    if (!svg) {
      return;
    }
    pre.dataset.mermaidToolbarAttached = "1";
    diagramCounter += 1;
    var idx = diagramCounter;

    var bar = document.createElement("div");
    bar.className = "mermaid-toolbar";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Mermaid diagram tools");

    if (cfg.fullscreen !== false) {
      var btnFs = document.createElement("button");
      btnFs.type = "button";
      btnFs.textContent = labels.fullscreen || "Fullscreen";
      btnFs.addEventListener("click", function () {
        openFullscreen(svg);
      });
      bar.appendChild(btnFs);
    }

    if (cfg.downloadSvg !== false) {
      var btnDl = document.createElement("button");
      btnDl.type = "button";
      btnDl.textContent = labels.downloadSvg || "SVG";
      btnDl.title = "Download diagram as SVG";
      btnDl.addEventListener("click", function () {
        downloadSvg(svg, idx);
      });
      bar.appendChild(btnDl);
    }

    if (cfg.copySource) {
      var btnCp = document.createElement("button");
      btnCp.type = "button";
      btnCp.textContent = labels.copySource || "Copy";
      btnCp.title = "Copy Mermaid source";
      btnCp.addEventListener("click", function () {
        copyMermaidSource(pre);
      });
      bar.appendChild(btnCp);
    }

    if (bar.childNodes.length === 0) {
      return;
    }

    pre.insertBefore(bar, pre.firstChild);
  }

  function scan() {
    document.querySelectorAll("pre.mermaid").forEach(attachToolbar);
  }

  var obs = new MutationObserver(function () {
    scan();
  });
  obs.observe(document.documentElement, { subtree: true, childList: true });

  function scheduleRescans() {
    var delays = cfg.rescanDelaysMs || [300, 1500];
    delays.forEach(function (ms) {
      setTimeout(scan, ms);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRescans);
  } else {
    scheduleRescans();
  }

  document.addEventListener("readystatechange", function () {
    if (document.readyState === "complete") {
      scan();
    }
  });
})();
