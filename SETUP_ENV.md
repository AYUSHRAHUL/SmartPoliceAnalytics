# Quick Environment Setup

## Create `.env.local` file

Create a file named `.env.local` in the `SmartPoliceAnalytics-main` folder with the following content:

```bash
# MongoDB Connection
# Option 1: Use MongoDB Atlas (Recommended - Free tier available)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/police_analytics?retryWrites=true&w=majority

# Option 2: Use Local MongoDB (if installed)
# MONGODB_URI=mongodb://localhost:27017/police_analytics

# JWT Authentication
JWT_SECRET=dev-secret-key-change-in-production-min-32-chars-long
JWT_EXPIRES_IN=7d

# Application URL
APP_URL=http://localhost:3000

# Demo Mode
NEXT_PUBLIC_DEMO_MODE=0
```

## Quick Setup Steps:

1. **Create the file**: In the `SmartPoliceAnalytics-main` folder, create a new file named `.env.local`

2. **For MongoDB Atlas (Recommended)**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a free cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your database user credentials
   - Replace the connection string in `.env.local`

3. **Whitelist your IP in MongoDB Atlas**:
   - Go to Network Access in MongoDB Atlas
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your specific IP

4. **Save the file** and restart your dev server (`npm run dev`)

## For Local MongoDB:

If you have MongoDB installed locally:
```bash
MONGODB_URI=mongodb://localhost:27017/police_analytics
```

Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

