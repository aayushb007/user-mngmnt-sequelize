const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const AuthMiddleware = require('../middleware/auth');

const Auth = new AuthMiddleware();

// const { generateToken, hashPassword, comparePassword ,verifyToken } = require('../auth/auth');

const User = require('../models/user');
const Address = require('../models/address');
router.post('/', async (req, res) => {
  try {
    const { name, email, password, addressId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword); // Hash the password before saving it to the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      addressId,
    });
    res.json({ user , message: req.t("USER_CREATE_SUCCESS")});
  } catch (err) {
    res.json({ error: err.message });
  }
});

 router.get('/',Auth.checkToken, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // default to page 1 if not specified
      const pageSize = parseInt(req.query.limit) || 10; // default to 10 items per page if not specified
  
      const offset = (page - 1) * pageSize;
      const users = await User.findAll({
        include: [{
            model: Address,as:'address'
        }],
        offset,
        limit: pageSize,
       
      });
      const totalCount = await User.count();
      res.json({ users ,page, totalCount});
    } catch (err) {
      res.json({ error: err.message });
    }
 });

 router.get('/:id', async (req, res) => {
  try {
    const userId  = req.params.id;
    const users = await User.findByPk(userId,{
      include: [{
          model: Address,as:'address'
      }],
    });
    res.json({ users });
  } catch (err) {
    res.json({ error: err.message });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'yourSecretKey', { expiresIn: '1h' });
    res.json({ token, email ,user  });
  } catch (err) {
    res.json({ error: err.message });
  }
});



 router.put('/:id', async (req, res) => {
  try {
   const user = await User.findByPk(req.params.id);
   await user.update(req.body);
  res.json({ msg: 'User Updated'});

  } catch (err) {
      res.json({ error: err.message });
  }
})
router.delete('/:id', async (req, res) => {
  try {
     const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json({ msg: 'user Deleted'});
  } catch (err) {
      res.json({ error: err.message });
  }
})



module.exports = router;
  