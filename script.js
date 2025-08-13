const express = require('express')
const fs = require('fs').promises
const path = require('path')
const { readData } = require('./middleware/readData')
const { setHeader } = require('./middleware/setHeader')
const { checkMail } = require('./middleware/checkMail')
const { checkPass } = require('./middleware/checkPass')
const { checkLogin } = require('./middleware/checkLogin')

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
    res.set({
        'Cache-Control': 'no-store',
        'Content-type': 'text/html'
    })
    res.status(200)
    res.sendFile(path.join(__dirname, 'pages', 'index.html'))
})

app.get('/api/users', setHeader, readData, async (req, res) => {
    const { name } = req.query
    const { users } = res.locals
    const { sort } = req.query
    res.status(200)

    if (name) {
        const filterByName = users.filter(user => user.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
        res.json(filterByName)
    } else if (sort && sort === 'minage') {
        const sortedArr = users.toSorted((a, b) => a.age - b.age)
        res.json(sortedArr)
    } else if (sort && sort === 'maxage') {
        const sortedArr = users.toSorted((a, b) => b.age - a.age)
        res.json(sortedArr)
    } else {
        res.json(users)
    }
})

app.get('/api/users/:id', setHeader, readData, async (req, res) => {
    const { users } = res.locals
    const { id } = req.params
    const person = users.find(user => user.id == id)
    if (!person) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(person);
})

app.post('/api/users', [setHeader, readData, checkMail, checkPass], async (req, res) => {
    const { users } = res.locals
    users.push(req.body)
    await fs.unlink(path.join(__dirname, 'db', 'users.json'))
    await fs.appendFile(path.join(__dirname, 'db', 'users.json'), JSON.stringify(users))
    res.status(200).json(users)
})

app.post('/login', setHeader, checkLogin, (req, res) => {
    res.status(200).json({ welcome: "Duq hajoxutyamb mutq gorceciq" })
})
app.listen(3000)
