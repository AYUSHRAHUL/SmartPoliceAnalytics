# 🚔 Smart Police Analytics Dashboard

> **A comprehensive full-stack platform for recognizing and visualizing police officers' good work with AI-powered scoring, real-time leaderboards, automated reports, and advanced data analytics for Odisha State Police Department.**





[![Open Live Demo]( https://hackathon-zeta-lovat-36.vercel.app/)] 

 

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Routing & Navigation](#routing--navigation)
- [Implementation Details](#implementation-details)
- [Unique Features](#unique-features)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Smart Police Analytics Dashboard is a state-of-the-art web application designed to transform raw police performance data into actionable intelligence. Built specifically for **Odisha State Police Department**, the platform provides:

- **Automated Data Processing** from CCTNS modules (Special Drives, Convictions, Detections)
- **Real-time Analytics** with district-wise and drive-wise performance metrics
- **AI/ML Insights** for predicting underperforming districts and generating natural language summaries
- **Automated Recognition** system with gamified leaderboards
- **Official Report Generation** in PDF and Excel formats
- **GIS Integration** for location-based visualization
- **Mobile-Responsive** interface for supervisory officers

---

## 🛠 Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2.15 | React framework with App Router for SSR/SSG |
| **React** | 18.3.1 | UI library with hooks and concurrent features |
| **TypeScript** | 5.6.2 | Type-safe JavaScript for better development experience |
| **Tailwind CSS** | 3.4.14 | Utility-first CSS framework for rapid UI development |
| **Recharts** | 2.12.7 | Composable charting library for data visualization |
| **Framer Motion** | 11.2.10 | Production-ready motion library for animations |
| **React Leaflet** | 4.2.1 | React components for Leaflet maps (GIS visualization) |
| **Lucide React** | 0.344.0 | Beautiful & consistent icon toolkit |
| **Zod** | 3.23.8 | TypeScript-first schema validation |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js API Routes** | 14.2.15 | Serverless API endpoints (no separate backend needed) |
| **Mongoose** | 8.6.3 | MongoDB object modeling for Node.js |
| **MongoDB** | Atlas/Compass | NoSQL database for flexible data storage |
| **JWT (jsonwebtoken)** | 9.0.2 | Secure token-based authentication |
| **Bcryptjs** | 2.4.3 | Password hashing for secure authentication |
| **Multer** | 2.0.2 | File upload middleware for data ingestion |

### Data Processing & Reports

| Technology | Version | Purpose |
|------------|---------|---------|
| **ExcelJS** | 4.4.0 | Excel file generation (.xlsx) |
| **PDFKit** | 0.15.0 | PDF document generation |
| **PDF-Parse** | 2.4.5 | PDF text extraction for data ingestion |
| **CSV-Parse** | 6.1.0 | CSV file parsing for data import |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 8.57.0 | Code linting and quality assurance |
| **TypeScript ESLint** | 7.16.1 | TypeScript-specific linting rules |
| **TSX** | 4.20.6 | TypeScript execution for scripts |
| **TS-Node** | 10.9.2 | TypeScript execution environment |

---

## ✨ Key Features

### 1. **Automated Data Processing** 📥
- **Multi-format Support**: Excel (.xlsx), CSV, PDF file uploads
- **CCTNS Integration**: Automatic ingestion from Special Drives, Convictions, and Detections modules
- **Data Cleaning & Validation**: Automatic data transformation and error handling
- **Manual Entry Forms**: User-friendly forms for direct data entry
- **Import History Tracking**: Complete audit trail of all data imports

### 2. **Visualization & Analytics** 📊
- **District-wise Performance**: Comprehensive metrics across all 30 Odisha districts
- **Drive-wise Analytics**: Special drive performance tracking (NBW, Firearms, Narcotics, etc.)
- **Trend Analysis**: Month-wise and drive-wise trend visualization
- **Top Performers**: Automatic identification of leading districts and police stations
- **Interactive Charts**: Bar charts, line charts, and pie charts using Recharts

### 3. **AI/ML Insights** 🤖
- **Performance Prediction**: ML-based prediction of underperforming districts
- **Natural Language Summaries**: Auto-generated text summaries (e.g., "This month, Ganjam led in narcotics enforcement with 18 arrests")
- **Anomaly Detection**: Identification of unusual patterns in data
- **Recommendation Engine**: Data-driven suggestions for improvement

### 4. **Recognition & Reporting** 🏆
- **Automated Recognition**: "Good Work Done" reports highlighting exceptional performance
- **Gamified Leaderboard**: Badges, achievements, and rankings
- **Export Capabilities**: PDF and Excel exports in official formats
- **Multi-period Reports**: Daily, weekly, monthly, quarterly, and yearly reports
- **Custom Report Generation**: Flexible report builder with filters

### 5. **Special Drives Management** 🎯
- **9 Drive Types**: 
  - Pending NBWs (Non-Bailable Warrants)
  - Illegal Firearms
  - Sand Mining
  - Missing Persons
  - Case Pendency Reduction
  - Preventive Measures
  - Excise Act Enforcement
  - OPG Act Enforcement
  - Narcotics Drug Enforcement
- **Structured Tables**: Clean, well-formatted tables matching official requirements
- **Real-time Updates**: Live data synchronization across all modules

### 6. **GIS Integration** 🗺️
- **Interactive Maps**: Leaflet-based maps showing all 30 Odisha districts
- **District Markers**: Clickable markers with performance popups
- **Heat Maps**: Visual representation of performance intensity
- **Location-based Analytics**: Geographic insights for better decision-making

### 7. **Role-Based Access Control** 🔐
- **Three User Roles**:
  - **Officer**: View own performance and leaderboard
  - **Admin**: Manage officers, view analytics, generate reports
  - **SuperAdmin**: Full system access including user management
- **Secure Authentication**: JWT tokens with HTTP-only cookies
- **Route Protection**: Middleware-based access control

### 8. **Mobile Responsive** 📱
- **Responsive Design**: Optimized for all screen sizes
- **Mobile Navigation**: Floating action button (FAB) with slide-up menu
- **Touch-friendly UI**: Large buttons and optimized layouts
- **Progressive Web App**: Can be installed on mobile devices

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (or **yarn** 1.22.0+)
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git** for version control

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-police-analytics.git
cd smart-police-analytics
```

#### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`.

#### 3. Environment Configuration

Create a `.env.local` file in the project root:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/police-analytics?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRES_IN=7d

# Application URL
APP_URL=http://localhost:3000

# Optional: Analytics Service (if using Python microservice)
ANALYTICS_SERVICE_URL=http://localhost:5000

# Demo Mode (set to 1 to enable fallback demo data)
NEXT_PUBLIC_DEMO_MODE=0
```

**Important**: Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

#### 4. Database Seeding

Choose one of the following seeding options:

**Option A: Basic Seed (Creates SuperAdmin)**
```bash
npm run seed
```
This creates:
- SuperAdmin user (username: `superadmin`, password: `admin123`)
- Default KPI weights
- Basic configuration

**Option B: Odisha State Data (Recommended)**
```bash
npm run seed:odisha
```
This creates:
- 1000 officers distributed across all 30 Odisha districts
- 2500 CCTNS data entries
- 500 recognition records
- Special drives data for all districts

**Option C: Generic Fake Data**
```bash
npm run seed:fake
```
Creates 500 officers with random data.

**Option D: Special Drives Only**
```bash
npm run seed:drives
```
Creates special drives data for all districts.

#### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### 6. Login

Navigate to `http://localhost:3000/login` and use:
- **Username**: `superadmin`
- **Password**: `admin123`

---

## ⚙️ Configuration

### Environment Variables Explained

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes | - |
| `JWT_SECRET` | Secret key for JWT token signing | ✅ Yes | - |
| `JWT_EXPIRES_IN` | Token expiration time | ❌ No | `7d` |
| `APP_URL` | Base URL of the application | ❌ No | `http://localhost:3000` |
| `ANALYTICS_SERVICE_URL` | Python analytics service URL | ❌ No | - |
| `NEXT_PUBLIC_DEMO_MODE` | Enable demo mode with fallback data | ❌ No | `0` |

### MongoDB Setup

1. **Create MongoDB Atlas Account**: Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Choose free tier (M0)
3. **Create Database User**: Set username and password
4. **Whitelist IP**: Add `0.0.0.0/0` for development (restrict in production)
5. **Get Connection String**: Copy connection string and replace credentials

### Next.js Configuration

The `next.config.js` file includes:
- **Server Actions**: Body size limit set to 50MB for large file uploads
- **API Routes**: Body parser size limit of 50MB
- **React Strict Mode**: Enabled for better development experience

---

## 📁 Project Structure

```
smart-police-analytics/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── dashboard/           # Main dashboard
│   │   ├── leaderboard/         # Rankings & leaderboard
│   │   ├── analytics/           # Analytics & insights
│   │   ├── districts/           # District-wise analytics
│   │   ├── drives/              # Drive performance
│   │   ├── special-drives/      # Special drives reports
│   │   ├── map/                 # GIS map view
│   │   ├── recognitions/        # Recognition history
│   │   ├── reports/             # Report generation
│   │   ├── data-ingestion/     # Data upload & import
│   │   └── admin/               # Admin panel
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── officers/            # Officer CRUD
│   │   ├── analytics/           # Analytics endpoints
│   │   ├── data-ingestion/      # Data import APIs
│   │   └── reports/             # Report generation APIs
│   ├── login/                   # Login page
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                  # React components
│   ├── layout/                  # Layout components
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── TopNav.tsx           # Top navigation bar
│   │   ├── MobileNav.tsx        # Mobile navigation
│   │   └── ProtectedShell.tsx   # Protected route wrapper
│   ├── dashboard/               # Dashboard components
│   ├── leaderboard/             # Leaderboard components
│   ├── analytics/               # Analytics components
│   ├── special-drives/          # Special drives tables
│   ├── gis/                     # Map components
│   ├── data-ingestion/          # Data upload components
│   └── ui/                      # Reusable UI components
├── lib/                         # Utility libraries
│   ├── models/                  # Mongoose models
│   │   ├── Officer.ts           # Officer schema
│   │   ├── Admin.ts             # Admin schema
│   │   ├── Recognition.ts       # Recognition schema
│   │   ├── SpecialDrive.ts      # Special drives schemas
│   │   ├── CCTNSData.ts         # CCTNS data schema
│   │   └── ImportLog.ts         # Import log schema
│   ├── services/                # Business logic
│   │   ├── rankings.ts          # Ranking calculations
│   │   ├── districtAnalytics.ts # District analytics
│   │   ├── trendAnalysis.ts     # Trend analysis
│   │   ├── aiInsights.ts        # AI/ML insights
│   │   ├── specialDrives.ts     # Special drives service
│   │   └── specialDriveReports.ts # Report generation
│   ├── auth.ts                  # Authentication utilities
│   ├── roles.ts                 # Role-based access control
│   ├── db.ts                    # MongoDB connection
│   └── http.ts                  # HTTP response helpers
├── scripts/                     # Utility scripts
│   ├── seed.ts                  # Basic seed script
│   ├── seedFakeData.ts          # Fake data generator
│   ├── seedOdishaData.ts        # Odisha state data
│   └── seedSpecialDrives.ts     # Special drives data
├── public/                      # Static assets
├── middleware.ts                # Next.js middleware
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies & scripts
└── README.md                    # This file
```

---

## 🧭 Routing & Navigation

### Public Routes

| Route | Description | Component |
|-------|-------------|-----------|
| `/` | Landing page with features showcase | `app/page.tsx` |
| `/login` | Authentication page | `app/login/page.tsx` |

### Protected Dashboard Routes

All routes under `/dashboard/*` require authentication.

| Route | Description | Access Level |
|-------|-------------|--------------|
| `/dashboard` | Main overview dashboard | All roles |
| `/leaderboard` | Officer rankings & gamified leaderboard | All roles |
| `/analytics` | Performance analytics & insights | All roles |
| `/districts` | District-wise performance analysis | All roles |
| `/drives` | Special drive performance | All roles |
| `/special-drives` | Special drives reports & tables | All roles |
| `/map` | GIS map visualization | All roles |
| `/recognitions` | Recognition history & badges | All roles |
| `/reports` | Report generation (PDF/Excel) | Admin, SuperAdmin |
| `/data-ingestion` | Data upload & import | Admin, SuperAdmin |
| `/admin` | Admin control panel | Admin, SuperAdmin |

### API Routes

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/login` | POST | User authentication | ❌ No |
| `/api/auth/logout` | POST | User logout | ✅ Yes |
| `/api/officers` | GET | List all officers | ✅ Yes |
| `/api/officers/[id]` | GET | Get officer details | ✅ Yes |
| `/api/analytics/districts` | GET | District performance data | ✅ Yes |
| `/api/analytics/drives` | GET | Drive performance data | ✅ Yes |
| `/api/analytics/trends` | GET | Trend analysis data | ✅ Yes |
| `/api/analytics/insights` | GET | AI insights & predictions | ✅ Yes |
| `/api/data-ingestion/upload` | POST | Upload data file | ✅ Yes (Admin+) |
| `/api/special-drives/[type]` | GET/POST | Special drives CRUD | ✅ Yes |
| `/api/reports/good-work` | GET | Generate "Good Work" report | ✅ Yes (Admin+) |
| `/api/reports/special-drives/[type]` | GET | Export special drive report | ✅ Yes |

### Route Protection

The `middleware.ts` file protects all dashboard and API routes:

```typescript
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leaderboard/:path*",
    "/analytics/:path*",
    "/districts/:path*",
    "/drives/:path*",
    "/special-drives/:path*",
    "/map/:path*",
    "/reports/:path*",
    "/data-ingestion/:path*",
    "/admin/:path*",
    "/api/:path*"
  ]
};
```

---

## 🔧 Implementation Details

### Authentication Flow

1. **Login**: User submits credentials → Server validates → JWT token generated
2. **Token Storage**: JWT stored in HTTP-only cookie (secure, not accessible via JavaScript)
3. **Route Access**: Middleware checks token validity on each request
4. **Role Verification**: Role extracted from token, access granted based on permissions
5. **Logout**: Cookie cleared, token invalidated

### Data Ingestion Process

1. **File Upload**: User uploads Excel/CSV/PDF file
2. **File Parsing**: 
   - Excel: Parsed using ExcelJS
   - CSV: Parsed using csv-parse
   - PDF: Text extracted using pdf-parse
3. **Data Transformation**: Raw data transformed based on module type (Special Drives, Convictions, Detections)
4. **Validation**: Data validated using Zod schemas
5. **Database Storage**: Valid data stored in MongoDB
6. **KPI Update**: Officer KPIs automatically updated
7. **Import Log**: Complete audit trail created

### Special Drives Implementation

**9 Drive Types** with dedicated Mongoose schemas:

1. **NBW Drive**: Tracks Non-Bailable Warrant execution
2. **Firearms Drive**: Illegal weapons seizure tracking
3. **Sand Mining Drive**: Environmental crime enforcement
4. **Missing Persons Drive**: Person tracing operations
5. **Case Pendency Drive**: Case closure tracking
6. **Preventive Measures**: Proactive crime prevention
7. **Excise Act**: Liquor law enforcement
8. **OPG Act**: Organized crime prevention
9. **Narcotics Enforcement**: Drug seizure and arrests

Each drive type has:
- Dedicated data model
- Table visualization component
- Report generation (PDF/Excel)
- Data entry form
- API endpoints for CRUD operations

### AI/ML Insights Implementation

1. **Data Aggregation**: District and officer data aggregated
2. **Trend Analysis**: Month-wise and drive-wise trends calculated
3. **Performance Prediction**: 
   - Statistical analysis of historical data
   - Identification of declining trends
   - Risk scoring for districts
4. **Natural Language Generation**:
   - Template-based summary generation
   - Dynamic data insertion
   - Context-aware descriptions

### Report Generation

**PDF Reports**:
- Generated using PDFKit
- Landscape orientation for wide tables
- Formatted headers and footers
- Automatic totals calculation

**Excel Reports**:
- Generated using ExcelJS
- Multiple worksheets support
- Formatted cells with colors
- Auto-calculated totals row
- Official format compliance

---

## 🌟 Unique Features

### 1. **State-Specific Focus**
- **Odisha State Integration**: Pre-configured with all 30 Odisha districts
- **District Coordinates**: GIS map includes all district locations
- **Localized Data**: Odisha-specific names and districts in seed data

### 2. **Comprehensive Special Drives System**
- **9 Drive Types**: Most comprehensive special drives tracking system
- **Structured Tables**: Matches official government report formats
- **Real-time Updates**: Live synchronization across all modules
- **Export Ready**: One-click PDF/Excel export in official formats

### 3. **Automated Data Processing**
- **Multi-format Support**: Excel, CSV, PDF all supported
- **Intelligent Parsing**: Automatic field mapping and transformation
- **Error Handling**: Detailed error logs with row-level tracking
- **Import History**: Complete audit trail of all imports

### 4. **Gamified Recognition System**
- **Badge System**: Gold, Silver, Bronze badges
- **Achievement Tracking**: Monthly and category-based achievements
- **Leaderboard**: Multiple ranking categories
- **Visual Feedback**: Animated badges and progress indicators

### 5. **Mobile-First Design**
- **Responsive Layout**: Optimized for all screen sizes
- **Mobile Navigation**: FAB (Floating Action Button) with slide-up menu
- **Touch Optimized**: Large buttons and touch-friendly interactions
- **Progressive Web App**: Can be installed on mobile devices

### 6. **GIS Integration**
- **Interactive Maps**: Leaflet-based maps with district markers
- **Performance Visualization**: Color-coded markers based on performance
- **Clickable Popups**: Detailed district information on marker click
- **Zoom Controls**: Pan and zoom for better exploration

### 7. **AI-Powered Insights**
- **Predictive Analytics**: ML-based district performance prediction
- **Natural Language Summaries**: Human-readable insights
- **Anomaly Detection**: Automatic identification of unusual patterns
- **Recommendation Engine**: Data-driven improvement suggestions

---

## 📡 API Endpoints

### Authentication

```typescript
POST /api/auth/login
Body: { username: string, password: string }
Response: { success: boolean, token: string, user: User }

POST /api/auth/logout
Response: { success: boolean }
```

### Officers

```typescript
GET /api/officers
Query: ?district=string&department=string
Response: { success: boolean, data: Officer[] }

GET /api/officers/[id]
Response: { success: boolean, data: Officer }
```

### Analytics

```typescript
GET /api/analytics/districts
Response: { success: boolean, data: DistrictPerformance[] }

GET /api/analytics/drives
Response: { success: boolean, data: DrivePerformance[] }

GET /api/analytics/trends?metric=cases&period=month
Response: { success: boolean, data: TrendData[] }

GET /api/analytics/insights
Response: { success: boolean, predictions: Prediction[], summary: string }
```

### Data Ingestion

```typescript
POST /api/data-ingestion/upload
Body: FormData (file, source, module)
Response: { success: boolean, importLogId: string }

GET /api/data-ingestion/imports
Response: { success: boolean, data: ImportLog[] }
```

### Special Drives

```typescript
GET /api/special-drives/[type]?district=string
Response: { success: boolean, data: DriveData[] }

POST /api/special-drives/[type]
Body: DriveData
Response: { success: boolean, data: DriveData }
```

### Reports

```typescript
GET /api/reports/good-work?format=pdf&period=month
Response: PDF file download

GET /api/reports/special-drives/[type]?format=xlsx
Response: Excel file download
```

---

## 🗄️ Data Models

### Officer Model

```typescript
{
  badgeId: string;           // Unique identifier
  name: string;
  department: string;
  designation: string;
  district: string;
  caseClosed: number;
  cyberResolved: number;
  feedbackScore: number;
  awarenessPrograms: number;
  emergencyResponses: number;
  totalScore: number;
  lastUpdated: Date;
}
```

### Special Drive Models

Each drive type has a dedicated schema with district-specific fields. For example, **NBW Drive**:

```typescript
{
  district: string;
  totalNBWPendingStart: number;
  nbwReceived: number;
  nbwExecutedDuringDrive: number;
  nbwOtherwiseDisposed: number;
  totalDisposed: number;
  nbwPendingEnd: number;
  nbwExecutedSTGR: number;
  nbwExecutedST: number;
  nbwExecutedGR: number;
  nbwExecutedOther: number;
  driveDate: Date;
}
```

### Recognition Model

```typescript
{
  officerId: ObjectId;
  month: string;            // Format: "YYYY-MM"
  badge: "Gold" | "Silver" | "Bronze";
  message: string;
  recognizedBy: string;
  date: Date;
}
```

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**: Ensure code is in a GitHub repository
2. **Import to Vercel**: 
   - Visit [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your repository
3. **Environment Variables**: Add all variables from `.env.local`
4. **Deploy**: Click "Deploy"

### MongoDB Atlas Setup

1. Create cluster on MongoDB Atlas
2. Get connection string
3. Add to Vercel environment variables
4. Whitelist Vercel IPs (or use `0.0.0.0/0` for development)

### Production Checklist

- [ ] Set strong `JWT_SECRET` (minimum 32 characters)
- [ ] Disable `NEXT_PUBLIC_DEMO_MODE` (set to `0`)
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set up custom domain (optional)
- [ ] Configure CORS if needed
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure backup strategy for MongoDB

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run seed` | Seed database with SuperAdmin and basic data |
| `npm run seed:fake` | Generate 500 fake officers with random data |
| `npm run seed:odisha` | Generate 1000 officers across all Odisha districts |
| `npm run seed:drives` | Generate special drives data for all districts |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Team Innosphere** - Smart Police Analytics Dashboard

---

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

## 🎉 Acknowledgments

- **Odisha State Police Department** for requirements and feedback
- **Next.js Team** for the amazing framework
- **MongoDB** for the flexible database solution
- **Open Source Community** for the excellent libraries

---

**Built with ❤️ for better policing and public safety**
