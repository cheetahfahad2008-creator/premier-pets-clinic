# 🐾 Premier Pets Clinic

A four-page, conversion-focused website for Premier Pets Clinic — a veterinary practice in Doha, Qatar. Built with plain HTML, CSS and JavaScript to the clinic's black & gold brand guidelines (v1.0, June 2026). No build step, no external dependencies — fonts are self-hosted.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero with booking CTA, trust strip, services preview, team preview, testimonials |
| `services.html` | Services — plain-English cards with booking links, FAQ |
| `about.html` | About & team — clinic story, values, vet cards with credentials |
| `contact.html` | Contact & booking — appointment form (with inline success state), hours, map, first-visit guide |

All pages share an identical sticky header (with an always-visible **Book Appointment** button) and footer.

## Brand

- **Colors:** alabaster `#F6F5F2`, onyx `#16151A`, graphite `#54515A`, gold `#BE9B45`, gold light `#E3C56E` — gold reserved for hairlines, the caduceus mark and small accents.
- **Type:** Cinzel (headings), Jost (body/interface), El Messiri (Arabic). Self-hosted in `assets/fonts/` (all SIL OFL licensed).
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

Search the HTML for `TODO: replace with real detail` — these mark placeholders that need real content: street address, social links, WhatsApp country code, team names/photos, clinic photos and the map embed.
