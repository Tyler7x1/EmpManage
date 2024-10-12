const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emp_id: {
        type: Number,
        required: true,
        unique: true
    }
});

// Create user model
const userModel = mongoose.model('User', userSchema);

let empIdArray = [];

// Function to create a new user
const createUser = async function (userName, userEmail, userPassword, userEmp_id) {
    try {
        // Check if user already exists by email or emp_id
        const existingUser = await userModel.findOne({ $or: [{ email: userEmail }, { emp_id: userEmp_id }] });
        if (existingUser) {
            throw new Error('User with this email or employee ID already exists');
        }

        const newUser = new userModel({
            name: userName,
            email: userEmail,
            password: userPassword,
            emp_id: userEmp_id
        });

        const savedUser = await newUser.save();
        if (savedUser) {
            empIdArray.push(userEmp_id);  // Add emp_id to array
            console.log(`User ${userName} with employee ID ${userEmp_id} added to database`);
        }
        return savedUser;
    } catch (error) {
        console.error('Error creating user: ', error.message);
        throw error;  //Error is re-thrown for proper handling
    }
};

// Function to update password by email
const updatePasswordByEmail = async function (userEmail, pass) {
    try {
        const result = await userModel.updateOne({ email: userEmail }, { password: pass });
        if (result.modifiedCount === 0) {
            throw new Error('No user found with this email or password update failed');
        }
        return result;
    } catch (error) {
        console.error('Error updating password by email: ', error.message);
        throw error;
    }
};

// Function to update password by emp_id
const updatePasswordByEmpId = async function (userEmp_id, pass) {
    try {
        const result = await userModel.updateOne({ emp_id: userEmp_id }, { password: pass });
        if (result.modifiedCount === 0) {
            throw new Error('No user found with this employee ID or password update failed');
        }
        return result;
    } catch (error) {
        console.error('Error updating password by emp_id: ', error.message);
        throw error;
    }
};

// Function to find a user by name
const findUserByName = async function (userName) {
    try {
        return await userModel.findOne({ name: userName });
    } catch (error) {
        console.error('Error finding user by name: ', error.message);
        throw error;
    }
};

// Function to find a user by email
const findUserByEmail = async function (userEmail) {
    try {
        return await userModel.findOne({ email: userEmail });
    } catch (error) {
        console.error('Error finding user by email: ', error.message);
        throw error;
    }
};

// Function to find a user by emp_id
const findUserById = async function (userId) {
    try {
        return await userModel.findOne({ emp_id: userId });
    } catch (error) {
        console.error('Error finding user by emp_id: ', error.message);
        throw error;
    }
};

// Function to find all users
const findAllUsers = async function () {
    try {
        return await userModel.find({});
    } catch (error) {
        console.error('Error finding all users: ', error.message);
        throw error;
    }
};

// Function to delete user by emp_id
const deleteUserById = async function (userId) {
    try {
        const result = await userModel.deleteOne({ emp_id: userId });
        if (result.deletedCount === 0) {
            throw new Error('No user found with this employee ID');
        }
        return result;
    } catch (error) {
        console.error('Error deleting user: ', error.message);
        throw error;
    }
};

module.exports = {
    userModel,
    createUser,
    updatePasswordByEmail,
    updatePasswordByEmpId,
    findUserByName,
    findUserByEmail,
    findUserById,
    findAllUsers,
    deleteUserById
};
