const path = require('path')
const fs = require('fs').promises

const checkMail = async (req, res, next) => {
    try {
        const users = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'db', 'users.json'), 'utf-8'))
        const email = req.body.email
        const sameEmail = users.find(user => user.email.toLowerCase() === email.toLowerCase())
        if (sameEmail) {
            return res.status(400).json({ error: "This email has already registered" })
        }
        next()
    } catch (err) {
        res.status(404).send("<h1>There is a problem</h1>")
    }
}

module.exports = { checkMail }