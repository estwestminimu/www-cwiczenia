# www-cwiczenia

Node jes jednowątkowy model oparty na zdarzenia
obłsuguje wiele zadań jednocześnie bez tworzenia nowych w,ątkow


jeśli zapytanie trwa długo to node js nie blokuje event loop o ile mamy medoty asynchronicze jak all get run z callbackiem
czyli jeśli db all i get trwają długo to i tak mogą być przyjęte inne zżadania


**Serewer nie jest wielowątkowy** bo nie tworzymy nowe wątku dla każdego klienta  - wydajny przy dużej liczbie żądań jeśli każde wywołanie nie blokuje cpu


***
Event loop to mechanizm w Node.js (i w JavaScript w ogóle), który pozwala wykonywać wiele operacji asynchronicznych w jednym wątku bez blokowania całego programu. To właśnie dzięki niemu Node.js może obsługiwać setki żądań HTTP równocześnie, choć jest jednowątkowy.


Node.js działa w jednym głównym wątku, co oznacza:
- Tylko jedna instrukcja JavaScript jest wykonywana w danym momencie.
- Jeśli jakaś funkcja trwa długo (np. duża pętla obliczeniowa), wszystko inne w tym wątku stoi w miejscu.
```JS

console.log("Start");

setTimeout(() => {
  console.log("Timeout!");
}, 1000);

console.log("Koniec");

Start - SYNCHRONICZNE
Koniec - SYNCHRONICZNE
Timeout! - a-SYNCHRONICZNE
```


KOlejność ap get tów ma znaczenie bo expres wybiera pierwsze pasujące 
```js

app.get('/users/:id', handlerA)
app.get('/users/me', handlerB)

GET /users/me
zostaine obsluzony przez user/:id
```



Middleware albo kończy request,
albo przekazuje go dalej przez next() — nigdy oba naraz.



Jak Express decyduje, czy request ma trafić do express.static czy do API?

Odpowiedź:
Express:

sprawdza middleware po kolei

jeśli znajdzie plik → kończy request

jeśli nie → idzie dalej do routó


***
Pytanie:
Dlaczego POST, a nie PUT?

**Odpowiedź:**
POST:
- tworzy nowy zasób
- nie jest idempotentny

PUT:
- nadpisuje
- wymaga znanego ID


***
# require a import
import wymaga:
"type": "module" w package.js

require:
- działa synchronicznie
- jest prostszy w środowiskach backendowych
- historycznie dominuje w Node


# var const
**Bo const**:

- ma block scope
- nie pozwala na redeklarację
- zapobiega przypadkowej zmianie referencji

**var:**

- ma function scope
- jest podatny na hoisting bugs
- jest przestarzały


# . Dlaczego path.join(__dirname, "public"), a nie "./public"?
Odpowiedź:
Bo:
- "./public" zależy od katalogu uruchomienia
- __dirname zawsze wskazuje katalog pliku
- path.join gwarantuje kompatybilność OS
