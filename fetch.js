//POST FOR REGISTER
fetch('http://localhost:3000/api/users', {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
        id: 21,
        name: "David Manucharyan",
        age: 25,
        email: "david@gmail.com",
        password: "david200024"
    })
})
    .then(res => res.json())
    .then(data => console.log(data))

//POST FOR LOGIN
fetch('http://localhost:3000/login', {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
        email: "bob.smith@example.com",
        password: "bobPass2023"
    })
})
    .then(res => res.json())
    .then(data => console.log(data))


//DELETE
fetch('http://localhost:3000/api/users/4', {
    method: 'DELETE'
})
    .then(res => res.json())
    .then(data => console.log(data))