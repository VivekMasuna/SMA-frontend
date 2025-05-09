import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Required for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8090;

// Serve static files from dist
const distPath = path.join(__dirname, 'dist');

// Middleware to set proper MIME for .js files
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.type('application/javascript');
    }
    next();
});

app.use(express.static(distPath));

// For SPA: serve index.html on unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
