const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const Item = require('../models/Item');
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = {};

        if (req.query.category) {
            query.category = req.query.category;
        }

        const items = await Item.find(query).populate('category', 'title');
        res.send(items);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Item.findById(req.params.id).populate('user', 'name phone username');
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({error: 'Item not found'});
        }
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    if (!req.body.title || !req.body.price || !req.body.category) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const itemData = {
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        user: req.user._id,
    };

    if (req.file) {
        itemData.image = '/uploads/' + req.file.filename;
    }

    if (req.body.description) {
        itemData.description = req.body.description;
    }

    const item = new Item(itemData);

    try {
        await item.save();
        res.send(item);
    } catch (e) {
        res.status(400).send({error: 'Data not valid'});
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('user', '_id');
        console.log('item', item.user._id);
        console.log('reqq', req.user._id);

        if (req.user._id === item.user._id) {
            return res.status(403).send({error: 'User is no defined'});
        }
        console.log('равно');
        if (item) {
            await Item.findByIdAndDelete(req.params.id);
            return res.send(`Product '${item.title} removed'`);
        }
        return res.status(404).send({error: 'Item not found'});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;