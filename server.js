const express = require('express');
const connectDb = require('./config/db.js');

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

// MiddleWare
app.use(express.json({ extended: false }));

app.get('/', (req, res) => { res.send('API HOORAY!!!'); });

app.use('/api/users', require('./routers/api/users'));
app.use('/api/auth', require('./routers/api/auth'));
app.use('/api/profile', require('./routers/api/profile'));
app.use('/api/post', require('./routers/api/post'));

app.listen(PORT, () => { console.log(`server is running on port ${PORT}`); });
