(function () {
  "use strict";
  var S = window.SITE || {};
  var TR = window.MuroTracking || { convert: function () {}, source: function () { return ""; } };
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  var params = new URLSearchParams(location.search);

  /* Aviso curto na tela */
  var toastEl = $("[data-toast]");
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 5000);
  }

  /* Cidade pela URL: ?cidade=Pinhais (casa o anúncio com a página) */
  var cityParam = (params.get("cidade") || "").trim();
  if (cityParam && /^[A-Za-zÀ-ÿ .'-]{2,40}$/.test(cityParam)) {
    var city = cityParam
      .replace(/\s+/g, " ")
      .toLowerCase()
      .replace(/(^|[\s-])([a-zà-ÿ])/g, function (m, a, b) { return a + b.toUpperCase(); })
      .replace(/ (De|Do|Da|Dos|Das) /g, function (m) { return m.toLowerCase(); });
    $$("[data-city]").forEach(function (el) { el.textContent = city; });
    if (S.city && city !== S.city) document.title = document.title.split(S.city).join(city);
  }

  /* WhatsApp */
  var SERVICOS = {
    "Baratas": "dedetização de baratas",
    "Ratos": "desratização",
    "Cupins": "descupinização",
    "Aranha-marrom": "controle de aranha-marrom",
  };
  function waUrl(text) {
    var base = S.whatsapp ? "https://wa.me/" + String(S.whatsapp).replace(/\D/g, "") : "https://wa.me/";
    return base + "?text=" + encodeURIComponent(text);
  }
  function viaLine() {
    var src = TR.source();
    return src ? "(Vim pelo " + src + ")" : "";
  }

  var form = $("[data-quote]");
  var presetInput = form && $('input[name="praga"]:checked', form);
  var preset = presetInput ? presetInput.value : "";
  var preferredLabel = $("body.lp") && /empresas/.test(location.pathname) ? "controle de pragas para empresa" : "";

  function defaultMessage() {
    var servico = SERVICOS[preset] || preferredLabel || "dedetização";
    return ["Olá! Vim pelo site e quero um orçamento de " + servico + ".", viaLine()].filter(Boolean).join("\n");
  }

  $$("[data-wa]").forEach(function (a) {
    a.href = waUrl(defaultMessage());
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", function () {
      a.href = waUrl(defaultMessage());
      demoNotice();
    });
  });

  function demoNotice() {
    if (!S.whatsapp) toast("Demonstração: o WhatsApp abre com a mensagem pronta para você escolher o contato. Na página do cliente, vai direto para o número da empresa.");
  }

  function openNew(url) {
    var a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /* Orçamento em 30 segundos: monta a mensagem e mostra a prévia */
  if (form) {
    var preview = $("[data-preview]", form);
    var build = function () {
      var fd = new FormData(form);
      var praga = fd.get("praga");
      var local = fd.get("local");
      var bairro = String(fd.get("bairro") || "").trim().slice(0, 40);
      var lines = ["Olá! Quero um orçamento de " + (SERVICOS[praga] || "dedetização") + "."];
      if (praga) lines.push("Praga: " + praga);
      if (local) lines.push("Imóvel: " + local);
      if (bairro) lines.push("Bairro: " + bairro);
      var via = viaLine();
      if (via) lines.push(via);
      return lines.join("\n");
    };
    var update = function () { preview.textContent = build(); };
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      TR.convert("whatsapp");
      openNew(waUrl(build()));
      demoNotice();
    });
  }

  /* Telefone */
  $$("[data-tel]").forEach(function (a) {
    var digits = String(S.phone || "").replace(/\D/g, "");
    if (digits) {
      a.href = "tel:+" + (digits.indexOf("55") === 0 ? digits : "55" + digits);
    } else {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        toast("Demonstração: na página do cliente, este botão liga direto para a empresa.");
      });
    }
  });

  /* Conversões nos cliques */
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("a[data-convert]");
    if (!el) return;
    var kind = el.getAttribute("data-convert");
    if (kind === "phone" && !S.phone) return;
    TR.convert(kind);
  });

  /* Topo com fundo ao rolar */
  var top = $("[data-top]");
  var onScroll = function () { if (top) top.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Barra fixa no celular aparece depois que os botões do topo saem da tela */
  var mbar = $("[data-mbar]");
  var heroCtas = $(".hero .cta-row");
  if (mbar && heroCtas && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      var en = entries[0];
      mbar.classList.toggle("show", !en.isIntersecting && en.boundingClientRect.top < 0);
    }).observe(heroCtas);
  } else if (mbar) {
    mbar.classList.add("show");
  }

  /* Ano no rodapé */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
