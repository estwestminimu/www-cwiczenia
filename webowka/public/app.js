async function loadUsers() {
    const res = await fetch("/users");

    //json odpowiedzi
    //słownik
    const users = await res.json();

    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(u => {
        const li = document.createElement("li");
        li.textContent = `${u.id}. ${u.name} (${u.email})`;
        list.appendChild(li);
    });
}

async function addUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
        alert("Wpisz imię i email!");
        return;
    }

    const res = await fetch("/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, email })
    });

    if (!res.ok) {
        alert("Błąd: " + (await res.text()));
        return;
    }

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";

    loadUsers();
}

async function getUserById() {
    const id = document.getElementById("searchId").value;
    if (!id) return;

    const res = await fetch(`/users/${id}`);
    const out = document.getElementById("singleUser");

    if (!res.ok) {
        out.textContent = "Nie znaleziono!";
        return;
    }

    const user = await res.json();
    out.textContent = JSON.stringify(user, null, 2);
}
