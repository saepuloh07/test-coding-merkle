const express = require(`express`);
const router = express.Router();

const guestModel = require("../models/guest-mdl")
const { staticAuth } = require("../middleware/auth")

router.post('/public/create', async (req, res) => {
    const guest = new guestModel({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        note: req.body.note
    })

    try{
        const result = await guest.save();
        res.status(200).json(result)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.get('/public/getAll', async (req, res) => {
    try{
        const data = await guestModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/public/getOne/:id', async (req, res) => {
    try{
        const data = await guestModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/admin/getAll', staticAuth, async (req, res) => {
    try{
        const data = await guestModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/admin/getOne/:id', staticAuth, async (req, res) => {
    try{
        const data = await guestModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.put('/admin/update/:id', staticAuth, async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await guestModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete('/admin/delete/:id', staticAuth, async (req, res) => {
    try{
        const id = req.params.id;
        const data = await guestModel.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;