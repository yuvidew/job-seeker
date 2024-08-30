const User = require('../model/user.info.model');

const addUserInfo = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ msg: 'Name and email are required!' });
    }

    try {
        const newUser = new User({
            name,
            email
        });
        const result = await newUser.save();

        if (result) {
            return res.status(201).json({
                msg: "User information is successfully added!",
                user: result
            });
        }
        
        return res.status(400).json({ msg: 'Failed to add the information!' });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ msg: 'Email already exists!' });
        }

        console.error(error);
        res.status(500).json({ msg: 'Server error, please try again later!' });
    }
}

const addResume = async (req , res) => {
    const { id } = req.params; 
    const { resume } = req.body; 

    if (!id || !resume) {
        return res.status(400).json({ msg: 'User ID and resume are required!' });
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found!' });
        }

        user.resume = resume; 

        await user.save(); 

        res.status(201).json({ msg: 'Resume updated successfully!' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ msg: 'Duplicate entry, please try again!' });
        }

        res.status(500).json({ msg: 'Server error, please try again later!' });
    }
}

module.exports = {
    addUserInfo,
    addResume
}
