// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// // Registration
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     // Hash the password and create a new user
//     const user = new User({ username, email, password });
//     await user.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     res.status(500).send('Error registering user');
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     console.log("admin",username,password)
//     // Find the user by email
//     const user = await User.findOne({ username });
    
//     if (!user) {
//       console.log("user",user)
//       res.status(401).send('User not found');
//       return;
//     }
//     // Check the password (you should compare the hashed password here)
//     if (user.password !== password) {
      
//       res.status(401).send('Incorrect password');
//       return;
//     }
//     // Generate a JWT token and send it in the response
//     // const token = generateJWTForUser(user);
//     var token = jwt.sign({ username: user.username }, 'shhhhh');

//     res.status(200).json({ token });
//   } catch (error) {
   
//     res.status(500).send('Error during login');
//   }
// });

// module.exports = router;












const express = require('express')
// const path = require('path')
const router = express.Router();
// const bodyParser = require('body-parser')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


router.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

router.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

router.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

module.exports = router;