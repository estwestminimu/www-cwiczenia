const express = require("express");
//path jest czescia node js runtima nie wymaa sciezki
// moduł do pracy ze ściżkami plików
const path = require("path");
const db = require("./db");//sciezka


const app = express();
const port = 3000; // nasłuchujemy na port 3000


//pozwala odczytywać dane z JSON z req.body - bez req.body byłoby undefine
//wymagane przy POST/PUT
//zapisuje wynik w req.body
//use obsługuje wszystkie metody HTTP
//odczyt danych w json
app.use(express.json())




//udostępnia pliki z folderu public
//musi byc wczesniej bo inaczej nie zadziala dla endpointow
//_dirname to pelna sciezka do katalogu
// express static udostepnia pliki statyczne - html css i js z podanego katalogu
// app.use dodaje middleware do całej aplikacji

//gotwowy plik z dysku
app.use(express.static(path.join(__dirname, "public")))

//middleware ma next


/*
path.join(...)
- Bezpiecznie łączy ścieżki (działa na Windows / Linux / Mac)
- Unika problemów typu C:\...\public vs /home/.../public
*/


// nie ma nextka wiec jest koncowy
app.get('/users', (req, res) =>
//error idzie pierwszy
{
    //db all pobiera wszystkie rekordy
    //rows to tablica użytkowników
    db.all(`SELECT * FROM users`, (err, rows) => {

        // błąd nie wędruje w górę
        //musi być osbłużony w lokalnie w kazdym 
        if (err) {
            //return jest ważny bo wtedy zatrzymuje dalsze wykonywani
            return res.status(500).json(
                {
                    "error :(": err.message
                })
        }
        //bo sql zwraca [] nie null
        if (rows.length === 0) {
            return res.status(404).json(
                {
                    "message": "No users found"
                })
        }
        //domyslnie ustawia status 200 ok
        return res.json(rows) 
    });




})
//req i res powstają autoamtycznie są przechowywane dla kazdego handlera
app.post("/users", (req, res) => {

    // PObieramy dane z body otrzymany z app.js
    /*
    const { name, email } = req.body? A: To destrukturyzacja.
     Zamiast pisać wszędzie req.body.name i req.body.email,
      wyciągasz te zmienne raz.
       Jest to czystsze i bardziej czytelne.
    */
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ "error": " Two parameters" })
    }

    //pytajniki mówią o tym, że nie dojdzie do sqlinjection
    //Najpierw parsuje się sql a potem podstawia dane jako zwykły tekst a nie kod sql
    //czyli nie przejdzie name= "RObert)'; DROP TABLE USERS"



    const sqlRequest = "INSERT INTO users (name, email) VALUES (?,?)"

    db.run(sqlRequest, [name, email], (err) => {

        if (err) {
            return res.status(500).json({
                "error :(": err.message
            })
        }
        return res.status(200).json({
            message: "Użytkownik dodany"
        })
    })
})

//id to paraemtr w url
app.get("/users/:id", (req, res) => //braowało id
//error idzie pierwszy
{
    //korzystamy z params bo get nie ma body dlateo nie moze byc req.body.id
    // nie robimy konwrsji na int bo sqlite zrobi kownersje autoamtycznie
    const { id } = req.params //bo nie bylo id w parametrze pobrany,
    const sqlRequest = "SELECT * FROM users WHERE id = ?"

    //db get pobiera jeden rekord- pierwszy, reszta ingorowana - pojedynczy uzytkownik z row
    db.get(sqlRequest, [id], (err, row) => {
        if (err) {
            return res.status(500).json
                ({
                    "error :(": err.message
                })
        }
        if (!row) {
            return res.status(404).json
                ({
                    "message": "User of id" + id + "not found"
                })
        }
        return res.status(200).json(row) //znowu poza funkcja
    });

})

//na samym końcu bo
/*
Bo:

wcześniej musi być skonfigurowane:

middleware

routing

listen uruchamia serwer
*/
// bez tego serwer się uruchomi i sie wylaczy bo endpoint istnieja w kodzie ale nikt ich nie nasluchuje
app.listen(port)
