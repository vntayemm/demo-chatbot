/**
 * Cau hinh toolbar Mermaid (chinh tai day | Edit here to toggle buttons / timing).
 * Loaded before mermaid-toolbar.js — merge voi gia tri san co neu can.
 */
window.MERMAID_TOOLBAR_CONFIG = Object.assign(
  {
    /** Hien nut fullscreen */
    fullscreen: true,
    /** Hien nut tai SVG (icon download) */
    downloadSvg: true,
    /**
     * Hien nut copy: uu tien ma Mermaid (luu som vao data-mermaid-source);
     * neu khong co thi copy chuoi SVG vao clipboard.
     */
    copySource: true,
    /** Nut fit / zoom (giong Mermaid Live) */
    zoomFit: true,
    zoomInOut: true,
    /** An toolbar khi khong hover; hien khi hover block hoac focus trong (ban phim) */
    toolbarHoverReveal: true,
    /** Chay lai scan sau khi Mermaid ve xong (ms) */
    rescanDelaysMs: [200, 600, 1500, 3500],
    /** Nhan (hien thi) nut — co the doi sang VI */
    labels: {
      fullscreen: "Fullscreen",
      downloadSvg: "Download SVG",
      copySource: "Copy diagram (source or SVG)",
      close: "Close (Esc)",
      zoomFit: "Fit to view",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
    },
  },
  window.MERMAID_TOOLBAR_CONFIG || {}
);
