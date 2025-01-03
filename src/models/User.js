import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userCollection='users'

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String,enum: ['user','admin'], default: 'user' }
});


userSchema.pre('save', function(next) {
    if (!this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});


userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;