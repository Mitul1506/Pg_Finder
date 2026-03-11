const Pg = require("../models/PgModel")

// CREATE PG
exports.createPg = async (req, res) => {
  try {
    const pg = await Pg.create(req.body)
    res.status(201).json(pg)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET ALL PG
exports.getAllPg = async (req, res) => {
  try {
    const pgs = await Pg.find().populate("landlordId")
    res.json(pgs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET PG BY ID
exports.getPgById = async (req, res) => {
  try {
    const pg = await Pg.findById(req.params.id)
    res.json(pg)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// UPDATE PG
exports.updatePg = async (req, res) => {
  try {
    const pg = await Pg.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(pg)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// DELETE PG
exports.deletePg = async (req, res) => {
  try {
    await Pg.findByIdAndDelete(req.params.id)
    res.json({ message: "PG deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}