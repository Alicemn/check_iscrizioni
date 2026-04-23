# Check Iscrizioni

Dashboard minimale che mostra solo il numero totale degli iscritti letto da Supabase.

## Avvio locale

Serve Node `>= 20.6.0`.

```bash
npm start
```

Il server legge i segreti da `.env` e avvia l'app su `http://127.0.0.1:3000`.

## Variabili ambiente

Usa `.env.example` come riferimento:

- `SUPABASE_URL`
- `SUPABASE_KEY`

Il file `.env` e gli altri file ambiente sono esclusi da Git tramite `.gitignore`.

## Note per GitHub

Prima del push controlla che `git status` non mostri `.env`.
