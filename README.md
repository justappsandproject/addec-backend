# Backend API Server for Abuja Detty December

## Overview
RESTful API server built with Node.js and Express for managing Abuja Detty December website content.

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express Validator

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/abuja-detty-december
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Start Production Server
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login admin user
- `GET /api/auth/me` - Get current user

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
- `POST /api/sponsors` - Create sponsor (Admin only)
- `PUT /api/sponsors/:id` - Update sponsor (Admin only)
- `DELETE /api/sponsors/:id` - Delete sponsor (Admin only)

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/:id` - Get single news article
- `POST /api/news` - Create news article (Admin only)
- `PUT /api/news/:id` - Update news article (Admin only)
- `DELETE /api/news/:id` - Delete news article (Admin only)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial (Admin only)
- `PUT /api/testimonials/:id` - Update testimonial (Admin only)
- `DELETE /api/testimonials/:id` - Delete testimonial (Admin only)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Upload gallery item (Admin only)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin only)

### FAQ
- `GET /api/faq` - Get all FAQs
- `POST /api/faq` - Create FAQ (Admin only)
- `PUT /api/faq/:id` - Update FAQ (Admin only)
- `DELETE /api/faq/:id` - Delete FAQ (Admin only)

## Project Structure
```
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   ├── contestController.js
│   └── ...
├── middleware/
│   ├── auth.js
│   └── upload.js
├── models/
│   ├── User.js
│   ├── Event.js
│   ├── Contest.js
│   └── ...
├── routes/
│   ├── auth.js
│   ├── events.js
│   ├── contests.js
│   └── ...
├── uploads/
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Database Models

### User Model
- Admin users for authentication
- Fields: email, password (hashed), role

### Event Model
- Event listings
- Fields: title, description, date, location, capacity, price, image, category

### Contest Model
- Contest information
- Fields: title, category, description, prize, participants

### Sponsor Model
- Sponsor information
- Fields: name, logo, website, description

### News Model
- News articles
- Fields: title, content, author, image, date

### Testimonial Model
- User testimonials
- Fields: name, role, quote, image

### Gallery Model
- Gallery items
- Fields: title, image, type, date

### FAQ Model
- Frequently asked questions
- Fields: question, answer

## Authentication
All admin routes require JWT authentication. Include token in headers:
```
Authorization: Bearer <token>
```

## File Uploads
- Upload images and videos using Multer
- Files stored in `/uploads` directory
- Supported formats: jpg, jpeg, png, gif, mp4, mov

## Error Handling
API returns standard error responses:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Success Response
```json
{
  "success": true,
  "data": { ... }
}
```










