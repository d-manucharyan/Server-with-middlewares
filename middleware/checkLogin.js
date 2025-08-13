const fs = require('fs').promises
const path = require('path')

const checkLogin = async (req, res, next) => {
    try {
        const users = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'db', 'users.json'), 'utf-8'))
        const { email, password } = req.body
        const user = users.find(u => u.email === email && u.password === password)
        if (!user) {
            return res.status(404).json({ error: "Wrong email or password" })
        }
        next()
    } catch(err) {
        res.status(404).send("<h1>Something went wrong</h1>")
    }

}

module.exports = {checkLogin}