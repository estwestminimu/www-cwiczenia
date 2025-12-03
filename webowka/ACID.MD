#  ACID
###  ACID = Atomicity, Consistency, Isolation, Durability.


#### A  Atomicity (atomowość)

Transakcja to wszystko albo nic.
```js
Dodaj pieniadze do uzytkownika A
usun pieniadze z uzytkownika B
```
Jeśli jedna sie nie uda to obie sa cofane


#### C  Consistency (spójność)
Po każdej transakcji baza musi pozostać w poprawnym stanie.

```js
Jeśli pole "wiek" użytkownika ma być liczbą dodatnią, baza nie pozwoli na zapis -5.
```




#### I  Isolation (izolacja)

Transakcje nie przeszkadzają sobie nawzajem, nawet jeśli zachodzą równocześnie.
```js
Dwóch ludzi jednocześnie kupuje ostatni produkt → baza zadba, aby tylko jedna transakcja go dostała, bez „wyścigów”.
```


#### D  Durability (trwałość)

Po zapisaniu transakcji jej wynik jest trwały  nie zniknie nawet po:

```js
restarcie serwera
awarii prądu
błędzie aplikacji
Baza zapisuje dane tak, by nie mogły się „cofnąć”.
```