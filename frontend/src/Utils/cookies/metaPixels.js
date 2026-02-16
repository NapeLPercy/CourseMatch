//Meta pixels
let metaLoaded = false;

export function loadMetaPixel(pixelId) {
  if (metaLoaded) return;
  metaLoaded = true;

  const inlineScript = document.createElement("script");
  inlineScript.innerHTML = `
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(inlineScript);

  console.log("[Meta Pixel] Loaded:", pixelId);
}

// Optional helpers (use later when you add events)
export function metaTrack(eventName, params = {}) {
  if (!window.fbq) return;
  window.fbq("track", eventName, params);
}

export function metaTrackCustom(eventName, params = {}) {
  if (!window.fbq) return;
  window.fbq("trackCustom", eventName, params);
}
