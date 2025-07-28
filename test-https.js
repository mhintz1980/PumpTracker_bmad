const https = require('https');
const fs = require('fs');
const path = require('path');

// Test if certificates exist and are readable
const sslPath = path.join(__dirname, 'ssl');
const keyPath = path.join(sslPath, 'localhost127.0.0.1+1-key.pem');
const certPath = path.join(sslPath, 'localhost127.0.0.1+1.pem');

console.log('🔍 Testing SSL certificate setup...');
console.log(`📁 SSL directory: ${sslPath}`);
console.log(`🔑 Key file: ${keyPath}`);
console.log(`📜 Cert file: ${certPath}`);

if (fs.existsSync(keyPath)) {
    console.log('✅ Private key file exists');
} else {
    console.log('❌ Private key file not found');
}

if (fs.existsSync(certPath)) {
    console.log('✅ Certificate file exists');
} else {
    console.log('❌ Certificate file not found');
}

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    try {
        const key = fs.readFileSync(keyPath);
        const cert = fs.readFileSync(certPath);
        console.log('✅ Certificate files are readable');
        console.log('🚀 Ready to start HTTPS server!');
        console.log('');
        console.log('Next steps:');
        console.log('1. Run: npm run dev:https');
        console.log('2. Open: https://localhost:3000');
        console.log('3. Accept the security warning in your browser');
        console.log('4. Configure Google OAuth with: https://localhost:3000');
    } catch (error) {
        console.log('❌ Error reading certificate files:', error.message);
    }
} else {
    console.log('❌ Certificate setup incomplete');
}