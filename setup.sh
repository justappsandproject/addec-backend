#!/bin/bash
# Quick setup script for Abuja Detty December Backend

echo "🚀 Setting up Abuja Detty December Backend..."

# Create uploads directory
mkdir -p uploads
touch uploads/.gitkeep

echo "✅ Backend setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. cd backend"
echo "2. npm install"
echo "3. cp env.example .env"
echo "4. Edit .env with your configuration"
echo "5. Start MongoDB: mongod"
echo "6. npm run dev"
echo ""
echo "📚 See SETUP.md for detailed instructions"