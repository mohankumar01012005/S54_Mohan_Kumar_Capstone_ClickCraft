const express = require("express")
const router = express.Router()

const { getTemplate, updateTemplateStats, getAllTemplates, createTemplate, Like, unLike } = require("../controllers/TemplateController")

router.post("/", createTemplate)
router.get("/all", getAllTemplates)
router.get("/:id", getTemplate)
router.put("/:id", updateTemplateStats)
router.put("/like/:id", Like)
router.put('/unlike/:id', unLike)

module.exports = router

