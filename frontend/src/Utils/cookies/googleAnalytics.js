let gaLoaded = false;
//Google analytics
export function loadGA(measurementId) {
  if (gaLoaded) return;
  gaLoaded = true;

  // 1) Load gtag.js
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(gtagScript);

  // 2) Init + config (your snippet)
  const inlineScript = document.createElement("script");
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(inlineScript);

  console.log("[GA] Loaded:", measurementId);
}

// Optional: pageview helper for SPA routing later
export function gaPageView(path) {
  if (!window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}