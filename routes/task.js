const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Address = require('../models/address');
const Task = require('../models/task');
const User = require('../models/user');
const Feature = require('../models/feature');
router.post('/', async (req, res) => {
    try {
        const {featureId,userId, taskType, title, description, status, startDate, dueDate} = req.body;
        // const feature = await Feature.findByPk(featureId);
        // if (!feature) {
        //   return res.status(404).json({ message: 'Feature not found' });
        // }
         // Trim the status value to the maximum allowed length
         const trimmedStatus = status.substring(0, 20);
         const task = await Task.create({
          featureId,
          userId,
          taskType,
          title,
          description,
          status : trimmedStatus,
          startDate,
          dueDate,
        });
        return res.json(task);
      } catch (error) {
        res.json(error);
        
      }
});

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // default to page 1 if not specified
      const pageSize = parseInt(req.query.limit) || 10; // default to 10 items per page if not specified
  
      const offset = (page - 1) * pageSize;
      const task = await Task.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: [ 'name'],
          },],
           offset,
        limit: pageSize,
        order:[
          ['id','DESC']
        ]
      })
      const totalCount = await Task.count();
      res.json({task, page, totalCount});
    } catch (err) {
      res.json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
  try {
   const task = await Task.findByPk(req.params.id);
  
  res.json({task, msg: 'task Updated'});

  } catch (err) {
      res.json({ error: err.message });
  }
})


router.put('/:id', async (req, res) => {
  try {
     const task = await Task.findByPk(req.params.id);
     await task.update(req.body);
    res.json({ msg: 'task Updated'});

  } catch (err) {
      res.json({ error: err.message });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
    res.json({ msg: 'task Deleted'});
  } catch (err) {
      res.json({ error: err.message });
  }
})


module.exports = router;
  