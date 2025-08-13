const path = require('path')
const fs = require('fs').promises

const readData = async (req, res, next) => {
   try {
      const users = await fs.readFile(path.join(__dirname, '..', 'db', 'users.json'), 'utf-8')
      res.locals.users = JSON.parse(users)
      next()
   } catch (err) {
      res.status(404).send('<h1>Page not found</h1>')
   }
}

module.exports = { readData }