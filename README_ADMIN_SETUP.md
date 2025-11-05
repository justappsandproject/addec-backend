# Default Admin Account Setup

## Default Admin Credentials

**Email:** `admin@abujadettydecember.com`  
**Password:** `admin123`

⚠️ **Important:** Change this password after your first login!

## Creating the Default Admin Account

### Method 1: Using the Script (Recommended)

1. **For MongoDB Atlas:** Whitelist your IP address in MongoDB Atlas Network Access settings
   - Go to MongoDB Atlas Dashboard → Network Access
   - Click "Add IP Address" 
   - Add your current IP or use `0.0.0.0/0` for development (⚠️ not secure for production)

2. Make sure MongoDB is running:
   ```bash
   # If using local MongoDB
   mongod
   
   # Or if using MongoDB Atlas/Cloud, ensure your connection string is in .env
   ```

3. Run the admin creation script:
   ```bash
   cd backend
   npm run create-admin
   ```

### Method 2: Using the Registration API

You can also create an admin account using the API:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@abujadettydecember.com",
    "password": "admin123"
  }'
```

### Method 3: Using MongoDB Directly

If you prefer to create the user directly in MongoDB:

```javascript
// In MongoDB shell or MongoDB Compass
use abuja-detty-december

db.users.insertOne({
  email: "admin@abujadettydecember.com",
  password: "$2a$10$hashed_password_here", // bcrypt hash of "admin123"
  name: "Admin User",
  role: "admin",
  createdAt: new Date()
})
```

**Note:** You would need to generate the bcrypt hash for the password manually. It's easier to use Method 1 or 2.

## Troubleshooting

### MongoDB Connection Error

If you get a connection error when running `npm run create-admin`:

**For MongoDB Atlas:**
1. Whitelist your IP address:
   - Go to MongoDB Atlas Dashboard → Network Access
   - Click "Add IP Address"
   - Add your current IP or `0.0.0.0/0` for development
   - Wait a few minutes for changes to propagate

2. Verify the connection string in your `.env` file is correct

**For Local MongoDB:**
1. Check if MongoDB is running:
   ```bash
   # Check MongoDB status (macOS/Linux)
   ps aux | grep mongod
   ```

2. Start MongoDB:
   ```bash
   # macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. Verify the connection string in your `.env` file matches your MongoDB setup.

### "User Already Exists" Error

If you see this error, the admin account has already been created. Simply use the credentials to log in.

## After First Login

1. Log in with the default credentials
2. Navigate to admin settings (if implemented)
3. Change the password to a secure one
4. Consider creating additional admin accounts with individual emails

## Security Notes

- The default password is simple and known publicly
- Never deploy to production with the default password
- Use strong, unique passwords in production
- Consider implementing two-factor authentication for admin accounts
- Regularly audit admin accounts and remove unused ones

## Support

If you encounter issues creating the admin account, check:
1. MongoDB connection status
2. Environment variables in `.env` file
3. Backend server logs for detailed error messages
