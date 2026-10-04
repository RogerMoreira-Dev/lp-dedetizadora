// Ícones em SVG feitos à mão (sem dependências). Herdam a cor do texto (currentColor).

const svg = (body, { size = 24, view = "0 0 24 24", cls = "", stroke = true, sw = 2 } = {}) =>
  `<svg class="${cls}" width="${size}" height="${size}" viewBox="${view}" aria-hidden="true" focusable="false"${
    stroke
      ? ` fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`
      : ` fill="currentColor"`
  }>${body}</svg>`;

export const icon = {
  whatsapp: (size = 22) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.7l4.8-1.3A9.8 9.8 0 1 0 12 2.2z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M9.1 7.4c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.2 3.5 5.5 4.8 2.7 1.1 3.3.9 3.9.8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4l-2.1-1c-.3-.1-.5-.2-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2.1z" fill="currentColor"/></svg>`,
  phone: (size = 20) =>
    svg(
      `<path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>`,
      { size, stroke: false }
    ),
  arrow: (size = 20) => svg(`<path d="M7 17 17 7M8 7h9v9"/>`, { size }),
  check: (size = 18) => svg(`<path d="m5 12.5 4.2 4.2L19 7"/>`, { size, sw: 2.4 }),
  shield: (size = 20) => svg(`<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.9 7.5-9.5V6L12 3z"/><path d="m8.8 12.2 2.3 2.3 4.3-4.6"/>`, { size }),
  clock: (size = 20) => svg(`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>`, { size }),
  doc: (size = 20) => svg(`<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>`, { size }),
  alert: (size = 22) => svg(`<path d="M12 3 2.5 20h19L12 3z"/><path d="M12 10v4.5M12 17.5v.2"/>`, { size }),
  // Marca: parede de tijolos (muro)
  logo: (size = 30) =>
    `<svg width="${Math.round(size * 1.25)}" height="${size}" viewBox="0 0 25 20" aria-hidden="true" focusable="false" fill="currentColor"><rect x="0" y="0" width="11.5" height="5.6" rx="1.4"/><rect x="13.5" y="0" width="11.5" height="5.6" rx="1.4"/><rect x="0" y="7.2" width="5" height="5.6" rx="1.4"/><rect x="7" y="7.2" width="11" height="5.6" rx="1.4"/><rect x="20" y="7.2" width="5" height="5.6" rx="1.4"/><rect x="0" y="14.4" width="11.5" height="5.6" rx="1.4"/><rect x="13.5" y="14.4" width="11.5" height="5.6" rx="1.4"/></svg>`,
};

// Pictogramas das pragas, vista de cima (64x64).
const pest = (body) =>
  `<svg class="pest" viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const pests = {
  baratas: pest(
    `<path d="M30.5 10.5C27 4 19 3 12.5 7M33.5 10.5C37 4 45 3 51.5 7"/>
     <circle cx="32" cy="12.5" r="3.4"/>
     <ellipse cx="32" cy="21" rx="9.5" ry="5.6"/>
     <path d="M32 27c-6.5 0-10.5 6-10.5 13.5S25.5 55 32 55s10.5-7 10.5-14.5S38.5 27 32 27z"/>
     <path d="M32 27v27"/>
     <path d="M23.5 23 15 19.5 11 23M22 33l-10-1-5.5 5M22.5 44l-9 6-1.5 8"/>
     <path d="M40.5 23 49 19.5 53 23M42 33l10-1 5.5 5M41.5 44l9 6 1.5 8"/>`
  ),
  ratos: pest(
    `<path d="M13 39c0-8 8-12 18-11.5 5 .3 9 1.6 13 3.4l12.5 6.2c.9.5.9 1.4 0 1.9L44 44.6c-5 2.5-12 3.6-19 2.8C17.5 46.6 13 44 13 39z"/>
     <circle cx="41" cy="27.5" r="5"/>
     <circle cx="48.5" cy="35.8" r="1.2" fill="currentColor"/>
     <path d="M13.5 40C6 41 3.5 47 7 51.5c3.5 4.5 10 3 13.5 5.5"/>
     <path d="M24 47.5 22.5 53M37 46.5l1.5 6"/>
     <path d="M57 38.5l4.5-1.5M57 39.5l4 2"/>`
  ),
  cupins: pest(
    `<path d="M29.3 8.5 27.5 3.5M34.7 8.5l1.8-5"/>
     <path d="M28.5 10.5c-4-3.5-9-3-12 .5M35.5 10.5c4-3.5 9-3 12 .5"/>
     <ellipse cx="32" cy="14.5" rx="5.6" ry="6.4"/>
     <ellipse cx="32" cy="25.5" rx="4.6" ry="3.8"/>
     <path d="M32 29.5c-5.5 0-9 6-9 13s3.5 14 9 14 9-7 9-14-3.5-13-9-13z"/>
     <path d="M24.2 38.5c5 1.6 10.6 1.6 15.6 0M23.3 45c5.5 1.6 11.9 1.6 17.4 0M24.5 51.3c4.8 1.4 10.2 1.4 15 0"/>
     <path d="M27.5 24 19 19.5l-4 2M27.4 26.5l-10.4 3-4 5M28 28.5l-8 7.5-1 6"/>
     <path d="M36.5 24 45 19.5l4 2M36.6 26.5l10.4 3 4 5M36 28.5l8 7.5 1 6"/>`
  ),
  "aranha-marrom": pest(
    `<ellipse cx="32" cy="25" rx="6" ry="7"/>
     <path d="M32 32c-4.8 0-8.5 4.6-8.5 10.5S27.2 54 32 54s8.5-5.6 8.5-11.5S36.8 32 32 32z"/>
     <path d="M29.5 21.5c1.5 1.6 3.5 1.6 5 0" />
     <path d="M27 20 17 8.5 10.5 12M26.4 23.5 11 16.5 3.5 22M26.4 27 11.5 33 4 31M27.5 30 17.5 40.5 13 55"/>
     <path d="M37 20 47 8.5l6.5 3.5M37.6 23.5 53 16.5l7.5 5.5M37.6 27l14.9 6 7.5-2M36.5 30 46.5 40.5 51 55"/>`
  ),
  empresas: pest(
    `<path d="M8 56V24l14 8v-8l14 8v-8l14 8v24z"/>
     <path d="M8 56h48M16 46h4M28 46h4M40 46h4"/>
     <path d="M50 32V10h6v22"/>`
  ),
};
