# Node & Dragons

>"Il classico che incontra le nuove tecnologie"

## Struttura
La struttura del gioco è semplice:
- processo di inizializzazione del campo;
- processo asincrono di inizializzazione del giocatore sul server
- processo asincrono di ricezione dei giocatori collegati
- processo asincrono di refresh delle coordinate dei giocatori

## Mappa
La mappa è suddivisa in 3 livelli:
### MDG (Map Definition Ground)
L'MDG della mappa è la parte basilare, dove si definisce il tipo di terreno della mappa
(erba, ghiaia, roccia, ecc ecc..).
Inoltre definisce ciò che sta subito sopra al terreno (muretto, scala, inizio dell'albero, ecc) che dovrebbe essere lo stesso punto in cui viene poi definito il punto di collisione (esclusa la scala).
### MDC (Map Definition Collision)
L'MDC definisce le collisioni, ovvero quando il personaggio deve essere bloccato.
questa parte della mappa non è visibile all'utente.
### MDF (Map Definitrion Foreground)
L'MDF definisce ciò che deve essere in cima ai livelli (fine dell'albero ad esempio) che deve coprire il giocatore se ci si passa sopra.

La mappa viene richiamata in modo asincrono per permettere all'applicativo di cominciare a richiamare il server per la sincronizzazione dei giocatori e delle loro coordinate.
