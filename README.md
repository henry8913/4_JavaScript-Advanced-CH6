
<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Iosevka&size=30&color=d4af37&center=true&vCenter=true&width=800&height=60&lines=🚗+HyperCar+Hub&repeat=false" alt="🚗 HyperCar Hub">
</h1>

**HyperCar Hub** è una semplice demo di piattaforma e-commerce per la visualizzazione e l'acquisto simulato di auto di lusso. Questo progetto è stato creato a scopo didattico per mostrare l'implementazione di funzionalità di base di un e-commerce con tecnologie web.

<p align="center">
  <img src="img/cover_a.jpg" alt="Cover" width="100%" />
</p>

Questo progetto dimostra l'applicazione di **JavaScript Avanzato** e l'integrazione con **API esterne**. JavaScript è un linguaggio dinamico e in continua evoluzione, essenziale per lo sviluppo di applicazioni web moderne. In questa demo vengono esplorati concetti avanzati e tecniche fondamentali per scrivere codice efficiente, scalabile e interattivo, costruendo un'applicazione moderna connessa al cloud e API esterne utilizzando AJAX.

### Concetti implementati:
- **Design Patterns in JavaScript**: Strutture modulari per organizzare il codice in modo manutenibile
- **ES6 e successivi**: Utilizzo di funzionalità moderne come let/const, arrow functions, template literals
- **Programmazione Asincrona**: Gestione di operazioni CRUD con chiamate API
- **AJAX e Promises**: Interazione con l'API di Striveschool per gestire prodotti dinamicamente
- **Autenticazione API**: Implementazione di token JWT per proteggere le richieste API
- **Persistenza Dati**: Salvataggio e recupero da localStorage per mantenere lo stato dell'applicazione

---

## 📌 Funzionalità Principali
- 🏎️ **Catalogo auto di lusso**: Visualizzazione dettagliata di veicoli esclusivi
- 🛒 **Carrello avanzato**: Gestione completa degli acquisti con aggiornamento real-time
- 💳 **Checkout sicuro**: Processo di pagamento intuitivo e protetto
- 🔍 **Schede prodotto dettagliate**: Informazioni complete su ogni veicolo
- 🛠️ **Backoffice amministrativo**: Gestione dei prodotti per amministratori
- 📱 **Design responsive**: Ottimizzato per ogni dispositivo, da mobile a desktop
- 🔄 **Aggiornamento dinamico**: Interazione utente fluida senza ricaricamento pagina

---

## 🎯 Caratteristiche Tecniche
- ✨ **Interfaccia semplice**: Design base con tema scuro e accenti dorati
- 🖼️ **Galleria prodotti**: Visualizzazione prodotti in formato griglia
- 📦 **Gestione stato**: Salvataggio temporaneo del carrello con localStorage
- 🔄 **Pagine dinamiche**: Caricamento semplice di prodotti tramite JavaScript
- 💼 **Gestione prodotti**: Funzioni base per aggiungere e visualizzare prodotti
- 🔐 **Validazione dati**: Controlli basilari sui form di input
- 🧩 **Struttura semplice**: Codice organizzato in modo comprensibile

---

## 🚀 Tecnologie Utilizzate
- **HTML5** - Struttura semantica delle pagine
- **CSS3** - Stile moderno con variabili CSS e flexbox/grid
- **JavaScript (ES6+)** - Logica client-side e manipolazione DOM
- **Bootstrap 5** - Framework CSS per layout responsive
- **Font Awesome 6.0** - Iconografia moderna ed elegante
- **localStorage** - Persistenza dati lato client

---

## 📂 Struttura del Progetto
```
├── 📁 css/                # Fogli di stile
│   └── style.css          # Stile principale
├── 📁 js/                 # Script JavaScript
│   ├── script.js          # Logica principale
│   └── cart.js            # Gestione carrello
├── 📁 pages/              # Pagine secondarie
│   ├── cart.html          # Pagina carrello
│   ├── checkout.html      # Pagina checkout
│   └── thank-you.html     # Conferma ordine
├── 📁 data/               # Dati e API
│   ├── postman.js         # Script per chiamate API Postman
│   ├── total-products.js  # Script per calcolare il totale dei prodotti
│   └── cars.json          # Database prodotti
├── 📁 img/                # Immagini e asset
├── 📄 index.html          # Home page
├── 📄 product.html        # Pagina dettaglio prodotto
├── 📄 product.js          # Script specifico prodotto
├── 📄 backoffice.html     # Interfaccia amministrativa
└── 📄 backoffice.js       # Logica amministrativa
```

---

## ⚙️ Funzionalità Dettagliate
- **Home Page**: 
  - Showcase prodotti in evidenza
  - Hero section impattante
  - Sezioni informative (Chi siamo, Servizi, Recensioni)
  - Galleria interattiva
  
- **Sistema E-Commerce**:
  - Aggiunta al carrello con notifica
  - Gestione quantità prodotti
  - Calcolo totali in tempo reale
  - Processo checkout multi-step
  - Conferma ordine con dettagli
  
- **Backoffice**:
  - Aggiunta nuovi prodotti
  - Visualizzazione prodotti esistenti
  - Modifica e cancellazione prodotti
  - Interfaccia amministrativa intuitiva

- **UX ottimizzata**:
  - Transizioni fluide tra pagine
  - Feedback visivi per le azioni utente
  - Layout responsive per tutti i dispositivi
  - Navigazione intuitiva

---

## 🔄 Possibili Miglioramenti
Essendo una demo, il progetto ha diverse limitazioni che potrebbero essere migliorate:
- [ ] Miglioramento della responsività su tutti i dispositivi
- [ ] Aggiunta di filtri di base per la ricerca
- [ ] Implementazione di una gestione utenti semplificata
- [ ] Miglioramento della validazione dei form
- [ ] Aggiunta di più prodotti demo
- [ ] Ottimizzazione del caricamento delle pagine

---

## 🔌 API e Autenticazione
Il progetto utilizza le API di Striveschool per la gestione dei prodotti. Tutte le operazioni CRUD (Create, Read, Update, Delete) sono implementate tramite chiamate API autenticate:

- **Endpoint**: `https://striveschool-api.herokuapp.com/api/product/`
- **Autenticazione**: Token JWT Bearer
- **Operazioni supportate**:
  - `GET`: Recupero di tutti i prodotti o di un prodotto specifico
  - `POST`: Creazione di un nuovo prodotto
  - `PUT`: Aggiornamento di un prodotto esistente
  - `DELETE`: Eliminazione di un prodotto

I prodotti visualizzati nel catalogo sono stati caricati tramite API e sono persistenti nel database remoto. L'area amministrativa (backoffice) permette la gestione completa dei prodotti con autenticazione richiesta per tutte le operazioni.

## ⚠️ Nota importante
Questo è un progetto dimostrativo creato esclusivamente a scopo didattico. Le funzionalità di pagamento sono simulate e non vengono elaborati pagamenti reali. Le auto mostrate sono solo esempi e non rappresentano prodotti realmente in vendita.

## 🤝 Contributi
Questo progetto è una semplice demo, ma suggerimenti per migliorarlo sono sempre ben accetti.

---

## 👤 Autore
Progetto demo creato da [Henry](https://github.com/henry8913) per scopi didattici.

## 📝 Licenza
Distribuito sotto la licenza [MIT](https://github.com/henry8913/4_JavaScript-Advanced-CH6/blob/main/LICENSE.txt). Consulta il file `LICENSE` per maggiori dettagli. Questo progetto demo è disponibile per uso educativo.
