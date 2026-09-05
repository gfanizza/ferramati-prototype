# Ferramati — Prototype-test: Mappa pagine e funzionalità

## Panoramica

Prototipo HTML statico multilingua (IT / EN / RO) del sito Ferramati International. Contiene un design system centralizzato, componenti JS per animazioni hero e menu mobile, e un'area tecnica riservata con login/dashboard.

Tutte le pagine sono in `noindex, nofollow` (prototipo, non indicizzato).

---

## Struttura lingue

| Lingua | Root path | Note |
|--------|-----------|------|
| EN (default) | `/index.html` | Homepage internazionale, lingua di default |
| IT | `/it/index.html` | Versione completa, con area tecnica e pagine legali |
| RO | `/ro/index.html` | Versione ridotta (listing pages, no dettaglio prodotti) |

---

## Flusso di navigazione (versione IT — più completa)

### 1. Homepage (`/it/index.html`)
- Hero split-layout con headline e CTA ("Richiedi preventivo" / "Consulta i prodotti")
- Sezione sedi operative (Fasano, Verdello, Timișoara, Oradea)
- Sezione soluzioni (anchor `#soluzioni`)
- Logo carousel clienti
- Language switcher IT / EN / RO
- Header con navigazione principale + CTA "Area tecnica"
- Mobile menu (hamburger → overlay full-screen)

### 2. Chi siamo (`/it/chi-siamo.html`)
- Presentazione del gruppo Ferramati International
- Storia aziendale, 25+ anni di esperienza
- 4 stabilimenti produttivi (Italia + Romania)
- Dati e numeri chiave

### 3. Catalogo Prodotti (`/it/prodotti/index.html`)
- Listing di tutti i prodotti con card navigabili
- Pagine di dettaglio prodotto:
  - **Ferro sagomato** (`ferro-sagomato.html`) — taglio, piega, sagomatura c.a.
  - **Lastre tralicciate** (`lastre-tralicciate.html`) — solai prefabbricati
  - **Doppie lastre** (`doppie-lastre.html`) — pareti e solai
  - **FERCASS** (`fercass.html`) — casseforme a perdere
  - **EPS** (`eps.html`) — elementi in polistirene espanso
  - **Sistema STEP** (`sistema-step.html`) — sistema costruttivo integrato

### 4. Realizzazioni (`/it/realizzazioni/index.html`)
- Portfolio / case study di cantieri completati
- Filtro per tipologia (residenziale, industriale, commerciale, infrastrutture)
- 9 schede progetto di dettaglio:
  - Centro Commerciale Lecce
  - Complesso Residenziale Milano
  - Ospedale Regionale Oradea
  - Parcheggio Multipiano Bergamo
  - Polo Logistico Bari
  - Residenze Universitarie Padova
  - Stabilimento Produttivo Timișoara
  - Torre Direzionale Roma
  - Viadotto Stradale Puglia

### 5. News (`/it/news/index.html`)
- Listing articoli / comunicati aziendali
- Articolo di dettaglio esempio:
  - Ampliamento stabilimento Verdello (`ampliamento-stabilimento-verdello.html`)

### 6. Contatti (`/it/contatti.html`)
- Form richiesta preventivo / supporto tecnico
- Informazioni sedi (indirizzi, telefono, email)
- Mappa sedi

### 7. Area Tecnica (riservata)
- **Landing / Registrazione** (`/it/area-tecnica/index.html`)
  - Presentazione dei servizi (schede tecniche, certificazioni, guide di posa)
  - Form di registrazione/login per professionisti
- **Dashboard** (`/it/area-tecnica/dashboard.html`)
  - Area personale post-login
  - Accesso a documentazione tecnica, schede prodotto, certificazioni
  - Pulsante "Esci" in header
- **Invia elaborati** (`/it/area-tecnica/invia-elaborati.html`)
  - Form per upload di elaborati tecnici (disegni, computi, documentazione)
  - Invio diretto all'ufficio tecnico Ferramati

### 8. Pagine legali e utility
- **Privacy Policy** (`/it/privacy-policy.html`)
- **Cookie Policy** (`/it/cookie-policy.html`)
- **Condizioni di vendita** (`/it/condizioni-vendita.html`)
- **Lavora con noi** (`/it/lavora-con-noi.html`) — posizioni aperte + candidatura spontanea

---

## Versione EN (English) — `/en/`

| Pagina | File | Corrispettivo IT |
|--------|------|------------------|
| About | `about.html` | Chi siamo |
| Products (listing) | `products/index.html` | Prodotti |
| Projects (listing) | `projects/index.html` | Realizzazioni |
| News (listing) | `news/index.html` | News |
| Contact | `contact.html` | Contatti |

Nota: versione EN non include dettaglio prodotti singoli, area tecnica né pagine legali.

---

## Versione RO (Română) — `/ro/`

| Pagina | File | Corrispettivo IT |
|--------|------|------------------|
| Homepage | `index.html` | Homepage |
| Despre noi | `despre-noi.html` | Chi siamo |
| Produse (listing) | `produse/index.html` | Prodotti |
| Realizări (listing) | `realizari/index.html` | Realizzazioni |
| Știri (listing) | `stiri/index.html` | News |
| Contacte | `contacte.html` | Contatti |

Nota: versione RO non include dettaglio prodotti singoli, area tecnica né pagine legali.

---

## Assets condivisi (`/assets/`)

### CSS
| File | Funzione |
|------|----------|
| `design-system.css` | Token di design, tipografia, griglie, componenti base |
| `hero-engineering.css` | Stili hero homepage EN (engineering-oriented) |
| `logo-carousel.css` | Carosello loghi clienti |
| `mobile-menu.css` | Menu mobile overlay |
| `area-tecnica.css` | Layout e componenti area tecnica riservata |

### JavaScript
| File | Funzione |
|------|----------|
| `hero-animations.js` | Animazioni hero (parallax, reveal) |
| `mobile-menu.js` | Toggle apertura/chiusura menu mobile |
| `area-tecnica.js` | Logica form registrazione/login e interazioni dashboard |

---

## Componenti trasversali (tutte le pagine)

- **Header** — Logo, nav principale, language switcher, CTA area tecnica, hamburger mobile
- **Mobile menu** — Overlay full-screen con nav, lingua, CTA
- **Breadcrumb** — Presente nelle pagine interne (prodotti, realizzazioni, area tecnica)
- **Footer** — (non ispezionato nel dettaglio, presente in tutte le pagine)
- **robots.txt** — File a root per blocco indicizzazione prototipo
