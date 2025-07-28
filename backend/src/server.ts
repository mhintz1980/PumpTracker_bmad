import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
const corsOrigin = process.env.HTTPS === 'true' ? 'https://localhost:3000' : 'http://localhost:3000';
app.use(cors({
    origin: process.env.CORS_ORIGIN || corsOrigin
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Pump Tracker API'
    });
});

// API routes placeholder
app.get('/api', (req, res) => {
    res.json({
        message: 'Pump Tracker API',
        version: '1.0.0'
    });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server with HTTPS support for development
if (process.env.HTTPS === 'true') {
    const sslPath = path.join(__dirname, '../../ssl');
    const keyPath = path.join(sslPath, 'localhost127.0.0.1+1-key.pem');
    const certPath = path.join(sslPath, 'localhost127.0.0.1+1.pem');

    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
        const options = {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
        };

        https.createServer(options, app).listen(PORT, () => {
            console.log(`🚀 HTTPS Server running on port ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔒 HTTPS enabled`);
            console.log(`🌐 CORS enabled for: ${corsOrigin}`);
        });
    } else {
        console.log('❌ SSL certificates not found. Run "npm run generate-ssl" first.');
        console.log('🔄 Falling back to HTTP...');
        app.listen(PORT, () => {
            console.log(`🚀 HTTP Server running on port ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 CORS enabled for: ${corsOrigin}`);
        });
    }
} else {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🌐 CORS enabled for: ${corsOrigin}`);
    });
}