# HTTPS Setup for Local Development

Google OAuth requires HTTPS, even for local development. Here are two options:

## Option 1: Using mkcert (Recommended - Easier)

1. **Install mkcert:**

   ```bash
   # Windows (using Chocolatey)
   choco install mkcert

   # Or download from: https://github.com/FiloSottile/mkcert/releases
   ```

2. **Setup local CA:**

   ```bash
   mkcert -install
   ```

3. **Generate certificates:**

   ```bash
   mkdir ssl
   cd ssl
   mkcert localhost 127.0.0.1 ::1
   ```

4. **Rename files:**
   ```bash
   # Rename the generated files to match our server config
   ren localhost+2.pem localhost.crt
   ren localhost+2-key.pem localhost.key
   ```

## Option 2: Using OpenSSL (Manual)

1. **Generate SSL certificate:**
   ```bash
   npm run generate-ssl
   ```

## After Certificate Setup

1. **Start with HTTPS:**

   ```bash
   npm run dev:https
   ```

2. **Configure Google OAuth:**
   - Authorized JavaScript Origins: `https://localhost:3000`
   - Authorized Redirect URIs: `https://localhost:3000/auth/callback`

3. **Accept Certificate:**
   - Browser will show security warning
   - Click "Advanced" → "Proceed to localhost (unsafe)"
   - This is normal for self-signed certificates

## Troubleshooting

- If certificates don't work, try restarting your browser
- Clear browser cache if you have issues
- Make sure both frontend and backend are using HTTPS
