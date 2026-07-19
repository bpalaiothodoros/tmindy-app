<div align="center">

<img src="tmindy-logo-official.png" alt="tMindy" width="160" />

# tMindy

**Behavioral Trading Journal & AI Psychology Coach**

`DISCIPLINE · PSYCHOLOGY · EXECUTION · RISK`

</div>

---

Το **tMindy** δεν είναι απλό ημερολόγιο συναλλαγών — καταγράφει, αναλύει και βελτιώνει
τη **συμπεριφορά** του trader. Απαντά σε 3 ερωτήσεις: *Γιατί κέρδισα; Γιατί έχασα;
Τι κάνω λάθος επαναλαμβανόμενα;* — με έμφαση στην **πρόληψη πριν το trade**, όχι στη
μεταθανάτια ανάλυση.

## 📱 Χρήση

Ανοίγει σε κάθε browser (κινητό/υπολογιστή) — καμία εγκατάσταση.

- **Live (GitHub Pages):** `https://bpalaiothodoros.github.io/tmindy-app/`
- **Τοπικά:** άνοιξε το `index.html` στον browser.

Στο iPhone μπορείς να το προσθέσεις στην αρχική οθόνη (Safari → Μοιρασιά → «Προσθήκη στην αρχική οθόνη») και να το ανοίγεις σαν κανονικό app.

### AI Coach
Το AI Coach χρειάζεται **δικό σου Anthropic API key** (από [console.anthropic.com](https://console.anthropic.com)).
Πήγαινε στις **Ρυθμίσεις** μέσα στο app και βάλ' το — μένει **μόνο στη συσκευή σου**
(localStorage), δεν φεύγει πουθενά αλλού. Χωρίς key, όλα τα υπόλοιπα (journal, κανόνες,
στατιστικά, ψυχολογικά εργαλεία) δουλεύουν κανονικά.

## ✨ Τι περιλαμβάνει

| Περιοχή | Περιεχόμενο |
|---|---|
| **Πίνακας** | P&L, win rate, expectancy, Discipline Ring (Πειθαρχία/Ψυχολογία/Εκτέλεση/Ρίσκο), ανά session & asset |
| **Νέο Trade** | Live pre-trade gate (προειδοποιεί, δεν μπλοκάρει), autocomplete asset, auto risk % |
| **Trades** | Λίστα, κλείσιμο θέσης, AI ανάλυση ανά trade, tags |
| **Ψυχολογία** | Pre-market check, post-market review, εβδομαδιαία αυτοαξιολόγηση, εργαλείο πεποιθήσεων |
| **Κανόνες** | 7 default κανόνες + κεφάλαιο λογαριασμού + custom κανόνες |
| **AI Coach** | Εβδομαδιαίο report με το δικό σου API key |
| **Import** | AI-powered paste ιστορικού από οποιονδήποτε broker |
| **Ρυθμίσεις** | API key, μοντέλο, διαγραφή δεδομένων |

Δίγλωσσο **ΕΛ / EN**. Τα δεδομένα μένουν τοπικά στη συσκευή.

## 🎨 Brand

Μαύρο `#0A0A0A` + Χρυσό `#D8B24C` · Κέρδος `#26D0A3` · Ζημιά `#FF5C5C`
Γραμματοσειρές: Sora · Inter · JetBrains Mono · Roboto

## 🛠️ Ανάπτυξη

Το `index.html` είναι **προ-μεταγλωττισμένο** (React από CDN, χωρίς Babel στον browser —
για να μη «σπάει» σε iPhone). Πηγαίος κώδικας: `trading-journal-app.jsx`.

```bash
npm install      # μία φορά
npm run build    # μεταγλωττίζει το .jsx -> index.html
```

## Κατάσταση

**Phase 1** — αυτόνομο React app, χωρίς backend. Επόμενα: backend + βάση (Phase 2),
πραγματικοί broker connectors, timeframes, στατιστικά ανά περίοδο.
