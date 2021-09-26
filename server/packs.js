const express = require("express")

var router = express.Router()

router.get("/get/:id", (req,res)=>{
    res.json({
        status: "ok",
        package: res.params.id
    })
})

module.exports = router