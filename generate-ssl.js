const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create SSL directory if it doesn't exist
const sslDir = path.join(__dirname, 'ssl');
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir);
}

// Generate self-signed certificate for localhost
try {
  console.log('Generating SSL certificate for localhost...');
  
  // Generate private key
  execSync(`openssl genrsa -out ${path.join(sslDir, 'localhost.key')} 2048`, { stdio: 'inherit' });
  
  // Generate certificate signing request
  execSync(`openssl req -new -key ${path.join(sslDir, 'localhost.key')} -out ${path.join(sslDir, 'localhost.csr')} -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`, { stdio: 'inherit' });
  
  // Generate self-signed certificate
  execSync(`openssl x509 -req -days 365 -in ${path.join(sslDir, 'localhost.csr')} -signkey ${path.join(sslDir, 'localhost.key')} -out ${path.join(sslDir, 'localhost.crt')}`, { stdio: 'inherit' });
  
  console.log('✅ SSL certificate generated successfully!');
  console.log('📁 Certificate files created in ./ssl/ directory');
  console.log('🔒 You can now use https://localhost:3000 for development');
  console.log('⚠️  You may need to accept the self-signed certificate in your browser');
  
} catch (error) {
  console.error('❌ Error generating SSL certificate:', error.message);
  console.log('💡 Alternative: Use mkcert for easier local SSL setup');
  console.log('   Install mkcert: https://github.com/FiloSottile/mkcert');
  console.log('   Then run: mkcert localhost');
}