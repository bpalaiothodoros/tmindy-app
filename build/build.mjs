/*
 * tMindy build — μεταγλωττίζει το trading-journal-app.jsx σε ΕΝΑ αυτόνομο index.html.
 *
 * ΓΙΑΤΙ ΕΤΣΙ: στο παρελθόν το app έδειχνε λευκή οθόνη σε iPhone επειδή προσπαθούσε
 * να μεταγλωττίσει JSX ΜΕΣΑ στη συσκευή (Babel στον browser). Εδώ κάνουμε τη
 * μεταγλώττιση ΕΔΩ, μία φορά, και το κινητό παίρνει έτοιμη JavaScript. React/ReactDOM
 * φορτώνονται από CDN. Χωρίς runtime Babel.
 *
 * Τρέξιμο:  npm run build   (χρειάζεται: npm install)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import babel from "@babel/core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SRC = join(ROOT, "trading-journal-app.jsx");
const OUT = join(ROOT, "index.html");

let src = readFileSync(SRC, "utf8");

// 1) Αφαιρούμε το import από "react" — το React έρχεται ως global από το CDN.
//    Παίρνουμε τα hooks απευθείας από το ίδιο το import statement, ώστε να μην ξεχαστεί
//    κανένα (το bug "useRef is not defined" προερχόταν ακριβώς από χαμένο hook).
const importMatch = src.match(/import\s+React\s*,\s*\{([^}]*)\}\s*from\s*["']react["'];?/);
if (!importMatch) throw new Error("Δεν βρέθηκε το import React από 'react' στο source.");
const hooks = importMatch[1].split(",").map((h) => h.trim()).filter(Boolean).join(", ");
src = src.replace(importMatch[0], `const { ${hooks} } = React;`);

// 2) Mount στο #root.
src += `\n\nconst __tmindyRoot = ReactDOM.createRoot(document.getElementById("root"));\n__tmindyRoot.render(React.createElement(TradingJournalApp));\n`;

// 3) Μεταγλώττιση JSX -> JS (χωρίς polyfills — σκέτος syntax transform).
const compiled = babel.transformSync(src, {
  filename: "trading-journal-app.jsx",
  presets: [
    ["@babel/preset-env", { targets: "defaults, iOS >= 13.4", modules: false }],
    ["@babel/preset-react", { runtime: "classic" }],
  ],
  comments: false,
  compact: false,
}).code;

const REACT = "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js";
const REACTDOM = "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js";

const html = `<!doctype html>
<html lang="el">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>tMindy — Behavioral Trading Journal</title>
<meta name="description" content="tMindy — AI-powered trading journal & behavioral psychology coach." />
<meta name="theme-color" content="#0A0A0A" />
<link rel="manifest" href="manifest.webmanifest" />
<link rel="icon" href="tmindy-logo-official.png" />
<link rel="apple-touch-icon" href="tmindy-logo-official.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="tMindy" />
<style>
  html, body { margin: 0; padding: 0; background: #0A0A0A; color: #F5F1E6; -webkit-text-size-adjust: 100%; }
  #root { min-height: 100vh; }
  .tmindy-boot { display:flex; align-items:center; justify-content:center; min-height:100vh; font-family: sans-serif; color:#D8B24C; font-weight:700; letter-spacing:2px; }
</style>
<script src="${REACT}" crossorigin></script>
<script src="${REACTDOM}" crossorigin></script>
</head>
<body>
<div id="root"><div class="tmindy-boot">tMindy…</div></div>
<script>
${compiled}
</script>
</body>
</html>
`;

writeFileSync(OUT, html);
console.log("✓ Έγινε build -> index.html (" + (html.length / 1024).toFixed(0) + " KB)");
