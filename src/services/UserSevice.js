import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cart from '../models/cartModel.js';

class UserService {
    async getAllUsers() {
        return await User.find();
    }
    
    async getUser(id) {
        return await User.findById(id).populate('cart');
    }

    async createUser(userData) {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        const newCart = new Cart();
        await newCart.save();

        const newUser = new User({ ...userData, password: hashedPassword, cart: newCart._id });
        return await newUser.save();
    }

    async updateUser(id, userData) {
        if (userData.password) {
            userData.password = bcrypt.hashSync(userData.password, 10);
        }
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

    async getUserById(id) {
        return await User.findById(id).populate('cart');
    }

    async getUserByEmail(email) {
            return await User.findOne({ email });
            }
}



export default new UserService();


