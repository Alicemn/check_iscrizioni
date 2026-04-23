# Check Iscrizioni

Dashboard minimale che mostra solo il numero totale degli iscritti letto da Supabase.

## Avvio locale

Serve Node `>= 20.6.0`.

```bash
npm start
```

Il server legge i segreti da `.env` e avvia l'app su `http://127.0.0.1:3000`.

In GitHub Actions puo anche leggere un file `.runtime-secrets.json` generato dalle repository secrets.

## Variabili ambiente

Usa `.env.example` come riferimento:

- `SUPABASE_URL`
- `SUPABASE_KEY`

Il file `.env` e gli altri file ambiente sono esclusi da Git tramite `.gitignore`.

## GitHub Secrets

Le repository secrets non sono leggibili direttamente dal codice a runtime. Per questo il repository include il workflow [runtime-secrets.yml](/Users/alice.mioni/Documents/CornettoCritico/check_iscrizioni/.github/workflows/runtime-secrets.yml), che crea un file `.runtime-secrets.json` a partire da:

- `SUPABASE_URL`
- `SUPABASE_KEY`

Se presente, `server.js` usa prima `.runtime-secrets.json`; in locale, se il file non esiste, usa `.env`.

## Note per GitHub

Prima del push controlla che `git status` non mostri `.env`.
