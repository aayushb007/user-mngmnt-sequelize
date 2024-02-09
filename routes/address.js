const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Address = require('../models/address');
router.post('/', async (req, res) => {
    try {
      const { city, state, country } = req.body;
      
  
      const address = await Address.create({
        city,
        state,
        country,
      });
    
      res.json(address  );
    } catch (err) {
      res.json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const address = await Address.findAll()
      res.json(address  );
    } catch (err) {
      res.json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    res.json(address  );
  } catch (err) {
    res.json({ error: err.message });
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    await address.destroy();
    res.json({ msg: 'Adress Deleted'});
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    await address.update(req.body);
    res.json({ msg: 'Adress Updated'});
  } catch (err) {
    res.json({ error: err.message });
  }
});


module.exports = router;
  