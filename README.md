# Tris 4×4 — Studio 3D

Versione 2.0.0. Tabellone tridimensionale con prospettiva, spessore, pedine in rilievo e visuale regolabile. HTML, CSS 3D e JavaScript senza dipendenze: funziona anche offline.

Apri `index.html` nel browser. Usa i cursori Rotazione e Inclinazione oppure Vista dall’alto per cambiare prospettiva. Le caselle sono accessibili anche con Tab e Invio.

## Regole originali
Due giocatori, nero e bianco, su un solo tabellone 4×4. Il nero apre la prima partita. Vince chi allinea quattro pedine in orizzontale, verticale o diagonale. Quando tutte le linee contengono entrambi i colori, il round termina in pareggio forzato.

Ogni vittoria vale un punto. Dopo una vittoria apre l’altro giocatore rispetto al vincitore; dopo un pareggio si alterna il giocatore iniziale. Il pulsante Prossimo round permette di osservare il risultato prima di continuare. Reset tabellone mantiene i punti e cambia il giocatore iniziale nei round in corso; Nuova partita azzera i punti e riparte dal nero. I punti restano solo finché la pagina è aperta.

La trasformazione è visiva: non aggiunge livelli o caselle alle regole originali.

## Verifica
`node test.cjs`

Il workflow GitHub Pages originale è conservato. Le modifiche locali non sono pubblicate finché non vengono caricate sul repository.
