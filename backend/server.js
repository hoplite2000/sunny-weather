import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.json({ extended: false }));

const __dirname = path.resolve();

app.get('/api/appid', (req, res) => {
    try {
        res.status(200);
        res.json(process.env.APP_ID);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json('Server Error');
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });