# A Little World Made for You ♥

A romantic, interactive birthday website built with React + Vite + Framer Motion.

## Run it
```bash
npm install
npm run dev        # open the local link it prints
npm run build      # production build -> /dist (upload to Netlify / Vercel / GitHub Pages)
```

## Personalise it (everything is in ONE file)
Open `src/data/config.js` and change:
- `herName`, `fromName`
- `heroImage` – paste an image link or `/images/hero.jpg`
- `memories` – photos, dates and diary text (add as many as you like)
- `letter` – the greeting, paragraphs and closing
- `candles`, `wishMessage`, `music`

Put your own photos in `public/images/` and reference them as `/images/your-photo.jpg`.

## Folder structure
```
little-world-birthday/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── images/                 <- put your photos here (memory-1.svg ... placeholders)
└── src/
    ├── main.jsx                <- entry
    ├── App.jsx                 <- welcome gift -> main page
    ├── data/
    │   └── config.js           <- ✏️ all your text, names, photos
    ├── hooks/
    │   └── useTypewriter.js
    ├── styles/
    │   └── global.css          <- colors, fonts, shared styles
    └── components/
        ├── Welcome/            <- animated gift box
        ├── Hero/               <- Happy Birthday + typed name + background image
        ├── MemoryBook/         <- interactive diary with 3D page flips
        ├── LoveLetter/         <- envelope that opens to the letter
        ├── BirthdayCake/       <- cake, tap to blow out the candles
        └── common/             <- FloatingHearts, Reveal, SectionTitle, SideNav, MusicToggle
```