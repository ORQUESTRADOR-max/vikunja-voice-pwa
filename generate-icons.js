const fs = require('fs');
// SVG Content
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1E3A8A" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#bg)" />
  <path d="M256 352c44.18 0 80-35.82 80-80V144c0-44.18-35.82-80-80-80s-80 35.82-80 80v128c0 44.18 35.82 80 80 80zm-48-208c0-26.51 21.49-48 48-48s48 21.49 48 48v128c0 26.51-21.49 48-48 48s-48-21.49-48-48V144zm144 128c0 52.92-42.98 96-96 96s-96-42.98-96-96h-32c0 67.29 52.71 122.38 112 127.45V448h32v-47.55c59.29-5.07 112-60.16 112-127.45h-32z" fill="#FFFFFF"/>
</svg>`;

// We will use a base64 encoded PNG for maximum compatibility directly in the manifest
