#!/bin/bash

# Birthday Project - Auto Deploy Script
# No port needed in URL after this runs

set -e  # Stop script if any command fails

echo "🚀 Starting Birthday deployment..."

# 1. Update system and install dependencies
echo "📦 Installing Nginx, Git, Node.js, and PM2..."
sudo apt update
sudo apt install -y nginx git curl

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# 2. Clone or update the repository
sudo mkdir -p /var/www
cd /var/www
if [ -d "birthday" ]; then
    echo "📁 Repository exists, pulling latest changes..."
    sudo chown -R $(whoami) birthday
    cd birthday
    git pull
else
    echo "📥 Cloning birthday repository..."
    git clone https://github.com/PREXZYVILLATECH/birthday.git
    cd birthday
fi

# 3. Install Node dependencies
echo "📦 Installing npm packages..."
npm install

# 4. Create PM2 ecosystem file (FIXED VERSION)
echo "⚙️ Creating PM2 config..."
rm -f ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'birthday',
    script: 'npx',
    args: 'http-server -p 8081',
    cwd: '/var/www/birthday',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
EOF

# 5. Stop old process if running, then start with PM2
pm2 stop birthday 2>/dev/null || true
pm2 delete birthday 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 6. Configure Nginx as reverse proxy (FIXED - removes port & handles routing correctly)
echo "🌐 Setting up Nginx reverse proxy..."

# Remove old birthday config if exists
sudo rm -f /etc/nginx/sites-available/birthday
sudo rm -f /etc/nginx/sites-enabled/birthday

# Create new birthday config
sudo tee /etc/nginx/sites-available/birthday > /dev/null << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name nicky.prexzyvilla.site;
    
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

# 7. Enable the Nginx site
sudo ln -sf /etc/nginx/sites-available/birthday /etc/nginx/sites-enabled/

# 8. Make sure API config doesn't steal the default port
if [ -f /etc/nginx/sites-available/apis.prexzyvilla.site ]; then
    sudo sed -i 's/listen 80 default_server;/listen 80;/g' /etc/nginx/sites-available/apis.prexzyvilla.site 2>/dev/null || true
    sudo sed -i 's/listen 80 default_server;/listen 80;/g' /etc/nginx/sites-available/apis.prexzyvilla.site 2>/dev/null || true
fi

# 9. Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx

# 10. Open firewall
sudo ufw allow 80/tcp 2>/dev/null || true
sudo ufw allow 443/tcp 2>/dev/null || true

echo "✅ Deployment complete!"
echo "🌍 Visit: http://nicky.prexzyvilla.site"
echo ""
echo "📊 To add SSL/HTTPS later (optional):"
echo "   sudo apt install certbot python3-certbot-nginx -y"
echo "   sudo certbot --nginx -d nicky.prexzyvilla.site"
echo ""
echo "📊 Useful commands:"
echo "   pm2 status          - Check if running"
echo "   pm2 logs birthday   - View logs"
echo "   sudo nginx -t       - Test Nginx config"
