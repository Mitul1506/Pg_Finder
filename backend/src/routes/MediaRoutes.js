const router = require("express").Router()

const upload = require("../middleware/UploadMiddleware")

const {
uploadImage,
getAllMedia
} = require("../controllers/MediaController")

router.post("/upload",upload.single("image"),uploadImage)

router.get("/",getAllMedia)

module.exports = router