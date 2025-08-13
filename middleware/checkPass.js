const fs = require('fs').promises
const path = require('path')

const checkPass = async (req, res, next) => {
    try {
        const users = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'db', 'users.json'), 'utf-8'))
        const pass = req.body.password
        const samePass = users.find(user => user.password === pass)
        if (samePass) {
            return res.status(404).json({ error: "This password has already registered" })
        }
        next()
    } catch (err) {
        res.status(404).send('<h1>Something wrong</h1>')
    }
}

module.exports = { checkPass }