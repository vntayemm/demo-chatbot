/**
 * Cau hinh toolbar Mermaid (chinh tai day | Edit here to toggle buttons / timing).
 * Loaded before mermaid-toolbar.js — merge voi gia tri san co neu can.
 */
window.MERMAID_TOOLBAR_CONFIG = Object.assign(
  {
    /** Hien nut fullscreen */
    fullscreen: true,
    /** Hien nut tai SVG */
    downloadSvg: true,
    /** Hien nut copy ma nguon Mermaid (chi khi khoi code van con trong DOM sau khi ve) */
    copySource: false,
    /** Chay lai scan sau khi Mermaid ve xong (ms) */
    rescanDelaysMs: [200, 600, 1500, 3500],
    /** Nhan (hien thi) nut — co the doi sang VI */
    labels: {
      fullscreen: "Fullscreen",
      downloadSvg: "SVG",
      copySource: "Copy",
      close: "Close (Esc)",
    },
  },
  window.MERMAID_TOOLBAR_CONFIG || {}
);
