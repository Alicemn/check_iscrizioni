# Check Iscrizioni

Sito statico che mostra solo il numero totale degli iscritti.

Il conteggio viene aggiornato da GitHub Actions usando le repository secrets `SUPABASE_URL` e `SUPABASE_KEY`, che generano il file [count.json](/Users/alice.mioni/Documents/CornettoCritico/check_iscrizioni/count.json).

## Avvio locale

Non serve Node. Basta servire la cartella con un server statico oppure aprire il sito pubblicato su GitHub Pages.

In locale il sito legge `count.json`.

## Variabili ambiente

Le secrets non vengono lette dal browser. Vengono usate solo dal workflow GitHub Actions [update-count.yml](/Users/alice.mioni/Documents/CornettoCritico/check_iscrizioni/.github/workflows/update-count.yml).

- `SUPABASE_URL`
- `SUPABASE_KEY`

Il file `.env` non serve piu per il deploy GitHub.

## GitHub Secrets

Il workflow:

- usa `SUPABASE_URL` e `SUPABASE_KEY`
- interroga Supabase
- aggiorna `count.json`
- fa commit automatico su `main`

## Note per GitHub

Per vedere il sito aggiornato su GitHub Pages devi pubblicare la branch `main` o la cartella corretta nelle impostazioni Pages.
