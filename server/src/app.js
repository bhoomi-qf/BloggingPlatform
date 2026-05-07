const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/users');
const bcrypt = require('bcrypt');

const app = express();

const routes = require('./route');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Blogging Platform API');
});

app.use('/api/', routes);

(async () => {
    setTimeout(async () => {
        const existingUser = await User.findOne({ email: 'admin@gmail.com', role: 'admin' });
        console.log('Existing user:', existingUser);
        const hasedPassword = bcrypt.hashSync('Admin@1234', 10);

        if (!existingUser) {
            const adminUser = new User({
                name: 'Admin',
                email: 'admin@gmail.com',
                password: hasedPassword,
                role: 'admin'
            });
            adminUser.save()
                .then(() => console.log('Admin user created'))
                .catch(err => console.error('Error creating admin user:', err));
        } else {
            console.log('Admin user already exists');
        }
    }, 1000);
})();

module.exports = app;