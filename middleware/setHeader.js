const setHeader = (req, res, next) => {
    res.set({
        "Cache-Control": "no-store",
        "content-type": "application/json"
    })
    next()
}

    module.exports = {setHeader}