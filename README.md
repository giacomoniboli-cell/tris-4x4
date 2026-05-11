# Tris 4x4

Versione 1.1.0

Gioco web statico per due giocatori, con tabellone 4x4, pedine nere e bianche, punteggio persistente durante la partita e pubblicazione su GitHub Pages.

## Gioca online

https://giacomoniboli-cell.github.io/tris-4x4/

## Regole

- Si gioca in due: nero contro bianco.
- La prima partita inizia sempre il nero.
- I giocatori alternano il turno scegliendo una casella libera.
- Vince chi allinea 4 pedine in orizzontale, verticale o diagonale.
- Dopo una vittoria, il round successivo viene iniziato dall'altro giocatore.
- Se nessun giocatore puo' piu' completare una linea da 4, la partita viene chiusa in pareggio forzato.
- Dopo un pareggio, il round successivo viene iniziato dall'altro giocatore rispetto al round appena concluso.
- Ogni vittoria vale 1 punto.

## Novita' della versione 1.1.0

- Popup a fine partita per assegnare la vittoria e avviare il round successivo.
- Popup quando la partita finisce in pareggio forzato.
- Cambio automatico del giocatore iniziale dopo vittoria o pareggio.
- `index.html` pronto per GitHub Pages.

## Comandi

- **Nuova partita** azzera il punteggio e ricomincia dal nero.
- **Reset tabellone** pulisce solo la griglia e avvia il round successivo.

## File principali

- `index.html`: pagina pubblicata da GitHub Pages.
- `tris-4x4.html`: file locale/originale del gioco.
- `VERSION`: versione corrente pubblicata su GitHub.
