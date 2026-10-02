# CraftKart

Static site (HTML + CSS + JS + React from CDN). No build step needed.

## Folder order
```
craftkart/
├── index.html            1. page (must stay at the ROOT for Vercel)
├── css/style.css         2. styles
├── js/
│   ├── data.js           3. products, prices, BOGO flags (edit here)
│   └── utils.js          4. helpers: money(), load()
├── react/                5. components, loaded in number order
│   ├── 01-setup.js
│   ├── 02-Art.js
│   ├── 03-Pic.js
│   ├── 04-useCountdown.js
│   ├── 05-Card.js
│   ├── 06-App.js
│   └── 07-main.js        (renders the app)
└── images/               6. product photos (jpg, names as in data.js)
```

## Deploy to Vercel
1. Push the CONTENTS of this folder to GitHub, so `index.html` is at the repo root.
2. In Vercel: Add New Project, import the repo.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Deploy.

## Notes
- Promo code: CRAFT10 (10% off). Free delivery over Rs 999.
- Cart, wishlist and filters persist via localStorage.
- Only use photos you took, or ones whose owner gave permission.
