# FarmFusion

FarmFusion is a MERN-based agriculture marketplace platform designed to connect farmers and buyers with secure authentication, crop management, and cloud image uploads.

---

## Features

### Authentication & Authorization
- User Registration & Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control (RBAC)

### Crop Marketplace
- Create Crop Listings
- Update/Delete Crops
- Ownership Verification
- Get Single Crop
- Get All Crops

### Advanced Backend Features
- Search Functionality
- Filtering
- Pagination
- MongoDB Population

### Cloud Integration
- Cloudinary Image Upload
- Multer File Handling

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT
- bcryptjs

### Cloud & Uploads
- Cloudinary
- Multer

---

## Project Structure

```bash
server/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.js
│
├── server.js
└── package.json
```

---

## Environment Variables

Create a `.env` file inside `server/`

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Run Backend

```bash
cd server

npm install

npm run dev
```

---

## API Base URL

```bash
http://localhost:3000/api/v1
```

---

## Completed Modules

- Authentication System
- Authorization System
- Crop Marketplace APIs
- Cloud Image Uploads
- Search & Filtering
- Pagination

---

## Upcoming Features

- Frontend Development
- AI Crop Disease Detection
- Weather Integration
- Real-Time Notifications
- Payment Integration
- Admin Dashboard