# 🐾 Premier Pets Clinic

A four-page, conversion-focused website for Premier Pets Clinic — a veterinary practice in Doha, Qatar. Built with plain HTML, CSS and JavaScript to the clinic's bronze & rose-gold brand guidelines (v1.0). No build step, no external dependencies — fonts are self-hosted.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero with booking CTA, trust strip, services preview, team preview, testimonials |
| `services.html` | Services — plain-English cards with booking links, FAQ |
| `about.html` | About & team — clinic story, values, vet cards with credentials |
| `contact.html` | Contact & booking — appointment form (with inline success state), hours, map, first-visit guide |

All pages share an identical sticky header (with an always-visible **Book Appointment** button) and footer.

## Brand

- **Colors:** ivory `#F1ECE6` / paper `#FAF7F2` backgrounds, espresso `#2B1B10` text, bronze `#6B4130` primary accent, rose gold `#A37B68` secondary accent, champagne `#D4B9A8` hairlines and borders.
- **Type:** Cormorant Garamond (headlines, wide-tracked caps), Lora (body/interface), Noto Naskh Arabic (Arabic). Self-hosted in `assets/fonts/` (all SIL OFL licensed).
- **Bilingual:** the wordmark and key touchpoints carry both English and Arabic, per the guidelines.

## Structure

```
index.html            # Home
services.html         # Services & Pricing
about.html            # About & Team
contact.html          # Contact & Booking
assets/
  styles.css          # Shared design system & components
  site.js             # Shared interactions (menu, reveal, booking form)
  fonts.css           # @font-face declarations
  fonts/              # Self-hosted woff2 files
  logo.jpg            # Primary brand lockup
```

## Running locally

Open `index.html` in any browser, or serve the folder:

```
python3 -m http.server 8000
```

The booking form has no backend — it shows an inline confirmation on submit. Service cards link to `contact.html?service=…` to pre-select the service in the form.

## Before going live

Search the HTML for `TODO: replace with real detail` — these mark placeholders that need real content: written street address, Facebook page link, WhatsApp country code, team names/photos and clinic photos.
