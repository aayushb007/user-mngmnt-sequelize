const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');

const Feature = require('../models/feature');
const FeatureUser = require('../models/featureUser');
router.post('/', async (req, res) => {
 try {
    const {title,
        description,
        taskId,
        status,
        assignTo,
        startDate,
        dueDate} = req.body;
    const feature = await Feature.create({
        title,
        taskId,
        description,
        status,
        assignTo,
        startDate,
        dueDate,
      });
      if (assignTo && assignTo.length > 0) {
        const users = await User.findAll({ where: { id: assignTo } });
        console.log(users);
        for (const user of users) {
            await FeatureUser.create({ FeatureId: feature.id, UserId: user.id });
          }  
    }

    return  res.status(201).json(feature);
 } catch (err) {
    res.json({ error: err.message });
    
 }
})
router.get('/', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // default to page 1 if not specified
      const pageSize = parseInt(req.query.limit) || 10; // default to 10 items per page if not specified
  
      const offset = (page - 1) * pageSize;
        const features = await Feature.findAll(
            {
            include: [
                {
                  model: Task,
                  as: 'task',
                  attributes: [ 'title'],
                },{
                  model: User,
                  attributes:[ 'name'],
                  through:{
                    model : FeatureUser,
                    attributes:[ "userId"]
                  }
                },],
                offset,
                limit: pageSize,
        }
        );
        const totalCount = await Feature.count();
        res.status(201).json({features,page,totalCount});
    
    } catch (err) {
        res.json({ error: err.message });
    }
       
})
router.get('/:id', async (req, res) => {
    try {
        const featureId  = req.params.id;
        const feature = await Feature.findByPk(featureId, {
          include: [
               {
                model: Task,
                  as: 'task',
                  attributes: [ 'title' , 'status'],
               },
             ], 
          });
          if (!feature) {
            return res.status(404).json({ error: 'Feature not found' });
          }
          res.json({ feature})
    } catch (err) {
        res.json({ error: err.message });
    }  
})
router.put('/:id', async (req, res) => {
    try {
     const feature = await Feature.findByPk(req.params.id);
     await feature.update(req.body);
    res.json({ msg: 'Feature Updated'});

    } catch (err) {
        res.json({ error: err.message });
    }
})
router.delete('/:id', async (req, res) => {
    try {
       const feature = await Feature.findByPk(req.params.id);
    await feature.destroy();
    res.json({ msg: 'Feature Deleted'});
    } catch (err) {
        res.json({ error: err.message });
    }
})




module.exports = router;