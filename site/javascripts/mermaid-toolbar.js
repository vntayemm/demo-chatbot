/**
 * Toolbar for all rendered Mermaid diagrams (Material for MkDocs).
 * Config: mermaid-toolbar-config.js (window.MERMAID_TOOLBAR_CONFIG).
 */
(function () {
  var cfg =
    window.MERMAID_TOOLBAR_CONFIG ||
    {
      fullscreen: true,
      downloadSvg: true,
      copySource: true,
      zoomFit: true,
      zoomInOut: true,
      toolbarHoverReveal: true,
      rescanDelaysMs: [200, 600, 1500, 3500],
      labels: {
        fullscreen: "Fullscreen",
        downloadSvg: "Download SVG",
        copySource: "Copy diagram (source or SVG)",
        close: "Close (Esc)",
        zoomFit: "Fit",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
      },
    };

  var diagramCounter = 0;
  var labels = cfg.labels || {};
  var useCssZoom =
    typeof CSS !== "undefined" &&
    CSS.supports &&
    CSS.supports("zoom", "1");

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

  /** Luu ma Mermaid truoc khi theme xoa khoi code block. */
  function preserveMermaidSources() {
    document.querySelectorAll("pre.mermaid").forEach(function (pre) {
      if (pre.dataset.mermaidSource) {
        return;
      }
      var code = pre.querySelector("code");
      if (code) {
        var t = code.textContent;
        if (t && String(t).trim()) {
          pre.dataset.mermaidSource = String(t).trim();
        }
      }
    });
  }

  /** Copy ma nguon neu co; khong thi copy SVG markup. */
  function copyDiagramClipboard(pre, svg) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }
    var fromData = pre.dataset.mermaidSource;
    var code = pre.querySelector("code");
    var fromCode = code ? code.textContent : "";
    var text = (fromData && String(fromData).trim()) || (fromCode && String(fromCode).trim()) || "";
    if (text) {
      navigator.clipboard.writeText(text).catch(function () {});
      return;
    }
    var clone = svg.cloneNode(true);
    if (!clone.getAttribute("xmlns")) {
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }
    var xml = new XMLSerializer().serializeToString(clone);
    navigator.clipboard.writeText(xml).catch(function () {});
  }

  function findSvgInMermaidBlock(pre) {
    return pre.querySelector("svg");
  }

  function readNaturalSize(svg) {
    try {
      var b = svg.getBBox();
      if (b.width > 1 && b.height > 1) {
        return { w: b.width, h: b.height };
      }
    } catch (e) {}
    var w = svg.clientWidth || svg.width && svg.width.baseVal && svg.width.baseVal.value;
    var h = svg.clientHeight || svg.height && svg.height.baseVal && svg.height.baseVal.value;
    return { w: w || 320, h: h || 200 };
  }

  function svgIcon(viewBox, innerAppend) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", viewBox || "0 0 24 24");
    s.setAttribute("width", "14");
    s.setAttribute("height", "14");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("class", "mermaid-toolbar-icon");
    if (typeof innerAppend === "function") {
      innerAppend(s);
    }
    return s;
  }

  function iconFit() {
    return svgIcon("0 0 24 24", function (s) {
      var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      r.setAttribute("x", "4");
      r.setAttribute("y", "4");
      r.setAttribute("width", "16");
      r.setAttribute("height", "16");
      r.setAttribute("fill", "none");
      r.setAttribute("stroke", "currentColor");
      r.setAttribute("stroke-width", "1.5");
      r.setAttribute("stroke-dasharray", "3 2");
      s.appendChild(r);
    });
  }

  function iconZoomIn() {
    return svgIcon("0 0 24 24", function (s) {
      var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", "10");
      c.setAttribute("cy", "10");
      c.setAttribute("r", "5.5");
      c.setAttribute("fill", "none");
      c.setAttribute("stroke", "currentColor");
      c.setAttribute("stroke-width", "1.5");
      s.appendChild(c);
      var h = document.createElementNS("http://www.w3.org/2000/svg", "line");
      h.setAttribute("x1", "8");
      h.setAttribute("y1", "10");
      h.setAttribute("x2", "12");
      h.setAttribute("y2", "10");
      h.setAttribute("stroke", "currentColor");
      h.setAttribute("stroke-width", "1.8");
      h.setAttribute("stroke-linecap", "round");
      s.appendChild(h);
      var v = document.createElementNS("http://www.w3.org/2000/svg", "line");
      v.setAttribute("x1", "10");
      v.setAttribute("y1", "8");
      v.setAttribute("x2", "10");
      v.setAttribute("y2", "12");
      v.setAttribute("stroke", "currentColor");
      v.setAttribute("stroke-width", "1.8");
      v.setAttribute("stroke-linecap", "round");
      s.appendChild(v);
      var hnd = document.createElementNS("http://www.w3.org/2000/svg", "line");
      hnd.setAttribute("x1", "14");
      hnd.setAttribute("y1", "14");
      hnd.setAttribute("x2", "19");
      hnd.setAttribute("y2", "19");
      hnd.setAttribute("stroke", "currentColor");
      hnd.setAttribute("stroke-width", "2");
      hnd.setAttribute("stroke-linecap", "round");
      s.appendChild(hnd);
    });
  }

  function iconZoomOut() {
    return svgIcon("0 0 24 24", function (s) {
      var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", "10");
      c.setAttribute("cy", "10");
      c.setAttribute("r", "5.5");
      c.setAttribute("fill", "none");
      c.setAttribute("stroke", "currentColor");
      c.setAttribute("stroke-width", "1.5");
      s.appendChild(c);
      var h = document.createElementNS("http://www.w3.org/2000/svg", "line");
      h.setAttribute("x1", "7.5");
      h.setAttribute("y1", "10");
      h.setAttribute("x2", "12.5");
      h.setAttribute("y2", "10");
      h.setAttribute("stroke", "currentColor");
      h.setAttribute("stroke-width", "1.8");
      h.setAttribute("stroke-linecap", "round");
      s.appendChild(h);
      var hnd = document.createElementNS("http://www.w3.org/2000/svg", "line");
      hnd.setAttribute("x1", "14");
      hnd.setAttribute("y1", "14");
      hnd.setAttribute("x2", "19");
      hnd.setAttribute("y2", "19");
      hnd.setAttribute("stroke", "currentColor");
      hnd.setAttribute("stroke-width", "2");
      hnd.setAttribute("stroke-linecap", "round");
      s.appendChild(hnd);
    });
  }

  function iconFullscreen() {
    return svgIcon("0 0 24 24", function (s) {
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute(
        "d",
        "M9 3H4v5M15 3h5v5M9 21H4v-5M15 21h5v-5M3 9V4M21 9V4M3 15v5M21 15v5"
      );
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", "currentColor");
      p.setAttribute("stroke-width", "1.5");
      p.setAttribute("stroke-linecap", "round");
      s.appendChild(p);
    });
  }

  function iconDownloadSvg() {
    return svgIcon("0 0 24 24", function (s) {
      var base = document.createElementNS("http://www.w3.org/2000/svg", "path");
      base.setAttribute(
        "d",
        "M4 17v2h16v-2M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5"
      );
      base.setAttribute("fill", "none");
      base.setAttribute("stroke", "currentColor");
      base.setAttribute("stroke-width", "1.75");
      base.setAttribute("stroke-linecap", "round");
      base.setAttribute("stroke-linejoin", "round");
      s.appendChild(base);
    });
  }

  function iconCopy() {
    return svgIcon("0 0 24 24", function (s) {
      var a = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      a.setAttribute("x", "8");
      a.setAttribute("y", "8");
      a.setAttribute("width", "11");
      a.setAttribute("height", "11");
      a.setAttribute("rx", "1.5");
      a.setAttribute("fill", "none");
      a.setAttribute("stroke", "currentColor");
      a.setAttribute("stroke-width", "1.5");
      s.appendChild(a);
      var b = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      b.setAttribute("x", "5");
      b.setAttribute("y", "5");
      b.setAttribute("width", "11");
      b.setAttribute("height", "11");
      b.setAttribute("rx", "1.5");
      b.setAttribute("fill", "none");
      b.setAttribute("stroke", "currentColor");
      b.setAttribute("stroke-width", "1.5");
      s.appendChild(b);
    });
  }

  function makeIconButton(title, iconNode, onClick) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mermaid-toolbar-btn mermaid-toolbar-btn--icon";
    btn.setAttribute("aria-label", title);
    btn.title = title;
    btn.appendChild(iconNode);
    btn.addEventListener("click", onClick);
    return btn;
  }

  function attachToolbar(pre) {
    if (pre.dataset.mermaidToolbarAttached) {
      return;
    }
    var svg = findSvgInMermaidBlock(pre);
    if (!svg) {
      return;
    }
    var hasBar =
      cfg.fullscreen !== false ||
      cfg.downloadSvg !== false ||
      cfg.copySource !== false ||
      cfg.zoomFit !== false ||
      cfg.zoomInOut !== false;
    if (!hasBar) {
      pre.dataset.mermaidToolbarAttached = "1";
      return;
    }
    pre.dataset.mermaidToolbarAttached = "1";
    diagramCounter += 1;
    var idx = diagramCounter;

    var bar = document.createElement("div");
    bar.className = "mermaid-toolbar";
    if (cfg.toolbarHoverReveal !== false) {
      bar.classList.add("mermaid-toolbar--hover-reveal");
    }
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Mermaid diagram tools");

    var wrap = document.createElement("div");
    wrap.className = "mermaid-zoom-viewport";
    var inner = document.createElement("div");
    inner.className = "mermaid-zoom-inner";

    pre.insertBefore(bar, pre.firstChild);
    while (bar.nextSibling) {
      inner.appendChild(bar.nextSibling);
    }
    wrap.appendChild(inner);
    pre.appendChild(wrap);

    var natural = readNaturalSize(svg);
    var currentScale = 1;

    function applyScale(s) {
      currentScale = Math.max(0.15, Math.min(5, s));
      inner.style.transform = "";
      inner.style.transformOrigin = "";
      inner.style.width = "";
      inner.style.height = "";
      if (useCssZoom) {
        inner.style.zoom = String(currentScale);
        return;
      }
      inner.style.zoom = "";
      inner.style.transform = "scale(" + currentScale + ")";
      inner.style.transformOrigin = "top left";
    }

    applyScale(1);

    function measureNatural() {
      var again = readNaturalSize(svg);
      if (again.w > 1 && again.h > 1) {
        natural = again;
      }
    }

    requestAnimationFrame(function () {
      measureNatural();
      applyScale(currentScale);
    });

    function fitToView() {
      measureNatural();
      var pad = 12;
      var aw = Math.max(40, wrap.clientWidth - pad);
      var ah = Math.max(80, wrap.clientHeight - pad);
      if (natural.w <= 0 || natural.h <= 0) {
        return;
      }
      var s = Math.min(aw / natural.w, ah / natural.h, 5);
      s = Math.max(0.15, s);
      applyScale(s);
    }

    if (cfg.zoomFit !== false) {
      bar.appendChild(
        makeIconButton(labels.zoomFit || "Fit to view", iconFit(), function () {
          fitToView();
        })
      );
    }

    if (cfg.zoomInOut !== false) {
      bar.appendChild(
        makeIconButton(labels.zoomOut || "Zoom out", iconZoomOut(), function () {
          applyScale(currentScale / 1.2);
        })
      );
      bar.appendChild(
        makeIconButton(labels.zoomIn || "Zoom in", iconZoomIn(), function () {
          applyScale(currentScale * 1.2);
        })
      );
    }

    if (cfg.fullscreen !== false) {
      bar.appendChild(
        makeIconButton(labels.fullscreen || "Fullscreen", iconFullscreen(), function () {
          openFullscreen(svg);
        })
      );
    }

    if (cfg.downloadSvg !== false) {
      bar.appendChild(
        makeIconButton(
          labels.downloadSvg || "Download SVG",
          iconDownloadSvg(),
          function () {
            downloadSvg(svg, idx);
          }
        )
      );
    }

    if (cfg.copySource !== false) {
      bar.appendChild(
        makeIconButton(
          labels.copySource || "Copy diagram (source or SVG)",
          iconCopy(),
          function () {
            copyDiagramClipboard(pre, svg);
          }
        )
      );
    }

    if (bar.childNodes.length === 0) {
      return;
    }
  }

  function scan() {
    preserveMermaidSources();
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

  preserveMermaidSources();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      preserveMermaidSources();
      scheduleRescans();
    });
  } else {
    scheduleRescans();
  }

  document.addEventListener("readystatechange", function () {
    if (document.readyState === "complete") {
      preserveMermaidSources();
      scan();
    }
  });
})();
