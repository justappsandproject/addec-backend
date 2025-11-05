# Abuja Detty December - Complete Backend Setup Guide

## 🎯 Overview
Complete RESTful API backend for Abuja Detty December website with MongoDB database and admin authentication.

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Git installed

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Environment Setup
```bash
# Copy example environment file
cp env.example .env

# Edit .env file with your configuration
```

Update `.env` with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/abuja-detty-december
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 3: Start MongoDB
```bash
# If MongoDB is installed locally
mongod

# Or use MongoDB Compass to connect
```

### Step 4: Run the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## 📁 Project Structure

```
backend/
├── controllers/       # Business logic handlers
│   ├── authController.js
│   ├── eventController.js
│   ├── contestController.js
│   ├── sponsorController.js
│   ├── newsController.js
│   ├── testimonialController.js
│   ├── galleryController.js
│   ├── faqController.js
│   ├── volunteerController.js
│   ├── vendorController.js
│   └── productController.js
├── middleware/       # Authentication & file upload
│   ├── auth.js
│   └── upload.js
├── models/          # MongoDB schemas
│   ├── User.js
│   ├── Event.js
│   ├── Contest.js
│   ├── Sponsor.js
│   ├── News.js
│   ├── Testimonial.js
│   ├── Gallery.js
│   ├── FAQ.js
│   ├── Volunteer.js
│   ├── Vendor.js
│   └── Product.js
├── routes/          # API routes
│   ├── auth.js
│   ├── events.js
│   ├── contests.js
│   ├── sponsors.js
│   ├── news.js
│   ├── testimonials.js
│   ├── gallery.js
│   ├── faq.js
│   ├── volunteer.js
│   ├── vendors.js
│   └── products.js
├── uploads/         # File uploads directory
├── .env             # Environment variables
├── .gitignore
├── package.json
├── server.js        # Main server file
└── README.md
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login admin user
- `GET /api/auth/me` - Get current user (Protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Contests
- `GET /api/contests` - Get all contests
- `GET /api/contests/:id` - Get single contest
- `POST /api/contests` - Create contest (Admin only)
- `PUT /api/contests/:id` - Update contest (Admin only)
- `DELETE /api/contests/:id` - Delete contest (Admin only)

### Sponsors
- `GET /api/sponsors` - Get all sponsors
- `GET /api/sponsors/:id` - Get single sponsor
- `POST /api/sponsors` - Create sponsor (Admin only)
- `PUT /api/sponsors/:id` - Update sponsor (Admin only)
- `DELETE /api/sponsors/:id` - Delete sponsor (Admin only)

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get single news
- `POST /api/news` - Create news (Admin only)
- `PUT /api/news/:id` - Update news (Admin only)
- `DELETE /api/news/:id` - Delete news (Admin only)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial (Admin only)
- `PUT /api/testimonials/:id` - Update testimonial (Admin only)
- `DELETE /api/testimonials/:id` - Delete testimonial (Admin only)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get single gallery item
- `POST /api/gallery` - Create gallery item (Admin only)
- `PUT /api/gallery/:id` - Update gallery item (Admin only)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin only)

### FAQ
- `GET /api/faq` - Get all FAQs
- `GET /api/faq/:id` - Get single FAQ
- `POST /api/faq` - Create FAQ (Admin only)
- `PUT /api/faq/:id` - Update FAQ (Admin only)
- `DELETE /api/faq/:id` - Delete FAQ (Admin only)

### Volunteers
- `GET /api/volunteers` - Get all volunteers (Admin only)
- `GET /api/volunteers/:id` - Get single volunteer (Admin only)
- `POST /api/volunteers` - Create volunteer (Public)
- `PUT /api/volunteers/:id` - Update volunteer (Admin only)
- `DELETE /api/volunteers/:id` - Delete volunteer (Admin only)

### Vendors
- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/:id` - Get single vendor
- `POST /api/vendors` - Create vendor (Admin only)
- `PUT /api/vendors/:id` - Update vendor (Admin only)
- `DELETE /api/vendors/:id` - Delete vendor (Admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Health Check
- `GET /api/health` - Server health status

## 🔐 Authentication

Protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

### Register Admin
```bash
POST /api/auth/register
Body: {
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

### Login
```bash
POST /api/auth/login
Body: {
  "email": "admin@example.com",
  "password": "securepassword123"
}

Response: {
  "success": true,
  "token": "eyJhbGci...",
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## 📝 Example API Calls

### Create Event
```bash
POST /api/events
Headers: {
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
Body: {
  "title": "Opening Concert 2025",
  "category": "Concert",
  "date": "Monday, December 15, 2025",
  "location": "Transcorp Hilton Abuja",
  "capacity": 5000,
  "description": "The grand opening concert",
  "price": "₦15,000",
  "image": "/background/background1.png"
}
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Get all events
curl http://localhost:5000/api/events

# Get single event
curl http://localhost:5000/api/events/:id
```

## 🔧 Development Tools

- **Postman**: Test API endpoints
- **MongoDB Compass**: View database
- **Nodemon**: Auto-reload during development

## 📚 Next Steps

1. ✅ Backend is complete
2. ⏳ Create Admin Portal UI in frontend
3. ⏳ Connect frontend to backend API
4. ⏳ Add payment integration for marketplace
5. ⏳ Deploy to production

## 🆘 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify database name is correct

### Port Already in Use
- Change PORT in `.env` file
- Or kill process using port 5000

### JWT Secret Error
- Generate strong secret key
- Update JWT_SECRET in `.env`

## 📞 Support
For issues or questions, please contact the development team.










