const fs = require('fs').promises
const path = require('path')

const deleteUser = async (req, res, next) => {
    const users = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'db', 'users.json'), 'utf-8'))
    const {id} = req.params
    const foundUser = users.find(u => u.id == id)
    if(!foundUser) {
        return res.status(404).json({Error: "There is no user with this id"})
    }
    next()
}

module.exports = {deleteUser}