/* Rastreamento para Google Ads e GA4.
   - Guarda gclid/gbraid/wbraid e UTMs por 90 dias (atribuição do lead).
   - Só carrega o gtag se houver ID configurado em src/data/site.mjs.
   - Dispara conversão nos cliques de WhatsApp e telefone.
   - Aviso de cookies (LGPD) com recusar/aceitar, ligado ao Consent Mode v2. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var T = S.tracking || {};
  var KEY = "muro_attr";
  var CONSENT = "muro_consent";
  var DAY = 864e5;

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  // 1) Atribuição
  var params = new URLSearchParams(location.search);
  var fields = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  var found = {};
  var has = false;
  fields.forEach(function (k) {
    var v = params.get(k);
    if (v) { found[k] = v.slice(0, 200); has = true; }
  });
  var attr = null;
  if (has) {
    found.ts = Date.now();
    found.landing = location.pathname;
    store(KEY, JSON.stringify(found));
    attr = found;
  } else {
    try {
      var saved = JSON.parse(load(KEY) || "null");
      if (saved && Date.now() - saved.ts < 90 * DAY) attr = saved;
    } catch (e) {}
  }

  function source() {
    if (!attr) return "";
    var src = attr.utm_source || "";
    if (attr.gclid || attr.gbraid || attr.wbraid || /google/i.test(src)) return "Google";
    if (/facebook|instagram|meta|^fb$|^ig$/i.test(src)) return "Instagram/Facebook";
    return src.slice(0, 30);
  }

  // 2) gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  var ids = [T.googleAdsId, T.ga4Id].filter(Boolean);

  function consentState(v) {
    var s = v === "denied" ? "denied" : "granted";
    return { ad_storage: s, ad_user_data: s, ad_personalization: s, analytics_storage: s };
  }

  if (ids.length) {
    window.gtag = gtag;
    var choice = load(CONSENT);
    gtag("consent", "default", consentState(choice));
    gtag("set", "ads_data_redaction", choice === "denied");
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ids[0]);
    document.head.appendChild(s);
    gtag("js", new Date());
    ids.forEach(function (id) { gtag("config", id); });
    if (!choice) document.addEventListener("DOMContentLoaded", banner);
  }

  function banner() {
    var b = document.createElement("div");
    b.className = "cookie";
    b.setAttribute("role", "region");
    b.setAttribute("aria-label", "Aviso de cookies");
    b.innerHTML =
      '<p>Usamos cookies para medir os resultados dos nossos anúncios. <a href="' +
      (document.querySelector('a[href$="privacidade/"]') || { getAttribute: function () { return "#"; } }).getAttribute("href") +
      '">Saiba mais</a></p><div><button type="button" data-c="denied">Recusar</button><button type="button" data-c="granted">Aceitar</button></div>';
    b.addEventListener("click", function (e) {
      var c = e.target.getAttribute && e.target.getAttribute("data-c");
      if (!c) return;
      store(CONSENT, c);
      gtag("consent", "update", consentState(c));
      b.remove();
    });
    document.body.appendChild(b);
  }

  // 3) Conversões
  function convert(kind) {
    var label = (T.conversionLabels || {})[kind];
    if (T.googleAdsId && label) {
      gtag("event", "conversion", { send_to: T.googleAdsId + "/" + label, transport_type: "beacon" });
    }
    if (T.ga4Id) {
      gtag("event", kind === "phone" ? "click_to_call" : "whatsapp_click", { transport_type: "beacon" });
    }
    // Para quem usa Google Tag Manager
    window.dataLayer.push({ event: "lead_click", lead_channel: kind, lead_source: source() || "direto" });
  }

  window.MuroTracking = { convert: convert, source: source };
})();
