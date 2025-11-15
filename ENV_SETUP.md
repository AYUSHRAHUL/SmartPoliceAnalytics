# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# MongoDB Connection
# For local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/police-analytics
# For MongoDB Atlas (recommended):
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/police-analytics?retryWrites=true&w=majority

# JWT Authentication
# Generate a secure random string (32+ characters recommended)
# Use: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d

# Analytics Service (Optional)
# Only needed if running the separate Python analytics service
ANALYTICS_SERVICE_URL=http://localhost:5000

# Demo Mode
# Set to 1 to enable demo mode with fake data fallbacks when API fails
NEXT_PUBLIC_DEMO_MODE=1

# Environment
NODE_ENV=development
```

## Quick Setup

1. Copy the template above into a new file named `.env.local`
2. Replace `MONGODB_URI` with your MongoDB connection string
3. Generate a secure `JWT_SECRET` using:
   ```bash
   openssl rand -base64 32
   ```
4. Save the file

## MongoDB Atlas Setup (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string and replace the placeholder in `.env.local`

## Local MongoDB Setup

If using local MongoDB:
```bash
MONGODB_URI=mongodb://localhost:27017/police-analytics
```

## Production Environment Variables

For production (Vercel, etc.), set these in your deployment platform:
- `MONGODB_URI` - Your production MongoDB connection string
- `JWT_SECRET` - A strong, randomly generated secret
- `JWT_EXPIRES_IN` - Token expiration (e.g., `7d`, `30d`)
- `NODE_ENV=production`
- `NEXT_PUBLIC_DEMO_MODE=0` (disable demo mode in production)

