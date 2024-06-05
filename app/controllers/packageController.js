const Packages = require('../models/packageModel.js')

exports.getDashboard = async (req, res) => {
    try {
        const packages = await Packages.findAll()
        res.status(200).render('main', {packages})
    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}

exports.addPackage = async (req, res) => {
    try {
        const {name, description, perPersonPrice, transPrice, hotelPrice} = req.body

        await Packages.create({name, description, perPersonPrice, transPrice, hotelPrice})

        res.status(201).send({
            message : "Upload Data Success"
        })
    } catch (error) {
        
    }
}