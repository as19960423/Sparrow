@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: "Inter", "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  --color-brand: #FF6321;
  --color-dark: #1D1D1F;
  --color-offwhite: #FAFAFA;
}

@layer base {
  body {
    font-family: var(--font-sans);
  }
}

/* Custom fade-in and smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Scrollbar customizations */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 999px;
}
.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}
