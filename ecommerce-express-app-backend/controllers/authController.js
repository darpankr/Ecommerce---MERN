


const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log({ name, email, password }); // 🔍 Add this

        const existingUser = await User.findOne({ where: {email}});
        if (existingUser) return res.status(400).json({ error: "User already exist"});

        const hashedPassword = await bycrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2hr' }
        );
        res.status(201).json({ message: "User registered successfully", token, user: { id: user.id, name: user.name, email: user.email, role: user.role}});
    } catch (error) {
        console.error("Register error:", error); // 👈 Important for debugging
        res.status(500).json({ error: "Server Error"});
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        console.log(password)

        const user = await User.findOne({ where: { email }});
        if (!user) return res.status(400).json({ error: "Invalid Cred"});

        const userData = user.get({plain: true})

        const isMatch = await bycrypt.compare(String(password), String(userData.password));
        if (!isMatch) return res.status(400).json({ error: "Invalid Cred"});

        const token = jwt.sign({ id: userData.id, name: userData.name, email: userData.email, role: userData.role }, process.env.JWT_SECRET, {expiresIn: '2hr'});

        res.json({ token, user: { id: userData.id, name: userData.name, email: userData.email, role: userData.role}});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "Server Error"})
    }
}


//all data user
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if(!users) return res.status(404).json({ message: "No users found"});

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users"})
    }
}

//delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(!user) return res.status(404).json({ message: "No user found"});

        user.destroy();
        res.json({ message: "User Deleted"})
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data"});
    }
}

//GETPROFILE
exports.getProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'role']
        });
        if(!user) {
            res.status(404).json({ error: "User Not found" });
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}

//UPDATE USER PROFILE

exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, password } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10); // ✅ correct hashing

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
};