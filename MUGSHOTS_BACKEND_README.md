# Yearbook Mugshots Backend Integration

## Overview
This implementation adds a complete backend functionality for the Yearbook Mugshots feature, replacing the hardcoded frontend data with a Django REST API.

## Backend Changes Made

### 1. Models (`yearbookBackend/models.py`)
- Added `Mugshots` model with fields:
  - `name`: Student name
  - `student_id`: Unique student identifier
  - `photo`: Cloudinary image field for student photos
  - `crime`: Primary charge (fun theme)
  - `grade`: Student grade
  - `charges`: JSON field for additional charges list
  - `created_at`/`updated_at`: Timestamps

### 2. Serializers (`yearbookBackend/serializers.py`)
- Added `MugshotsSerializer` with:
  - All model fields
  - `photo_url` and `thumbnail_url` computed properties
  - Proper JSON handling for charges array

### 3. Views (`yearbookBackend/views.py`)
- Created `MugshotsViewSet` with:
  - Full CRUD operations
  - Search functionality (name, student_id, crime)
  - Ordering capabilities
  - Random endpoint for shuffled display
  - File upload support for photos

### 4. URLs (`yearbookBackend/urls.py`)
- Added `/mugshots/` endpoint
- Supports standard REST operations:
  - `GET /mugshots/` - List all mugshots
  - `POST /mugshots/` - Create new mugshot
  - `GET /mugshots/{id}/` - Get specific mugshot
  - `PUT/PATCH /mugshots/{id}/` - Update mugshot
  - `DELETE /mugshots/{id}/` - Delete mugshot
  - `GET /mugshots/random/` - Get random mugshots

### 5. Admin Interface (`yearbookBackend/admin.py`)
- Added admin interface for managing mugshots
- Organized fieldsets for easy data entry
- Search and filter capabilities

## Frontend Changes Made

### Updated `Mugshots.jsx`
- Replaced hardcoded mock data with API call to `http://localhost:8000/mugshots/`
- Added proper error handling
- Data transformation to match existing frontend structure
- Maintained all existing UI/UX features

## API Endpoints

### Main Endpoints
- `GET /mugshots/` - Get all mugshots
- `GET /mugshots/random/?count=6` - Get random mugshots
- `POST /mugshots/` - Create new mugshot (admin)
- `PUT /mugshots/{id}/` - Update mugshot (admin)
- `DELETE /mugshots/{id}/` - Delete mugshot (admin)

### Response Format
```json
[
  {
    "id": 1,
    "name": "Alex Johnson",
    "student_id": "2024001",
    "photo": "cloudinary_url_or_external_url",
    "photo_url": "processed_photo_url",
    "thumbnail_url": "thumbnail_url",
    "crime": "Being too rude to classmates",
    "grade": "A+",
    "charges": ["Excessive sarcasm", "Rolling eyes in class"],
    "created_at": "2025-01-24T22:09:21.123Z",
    "updated_at": "2025-01-24T22:09:21.123Z"
  }
]
```

## Setup Instructions

### 1. Database Migration
```bash
cd yearbookBackend
python manage.py makemigrations
python manage.py migrate
```

### 2. Populate Sample Data
```bash
python populate_mugshots.py
```

### 3. Start Backend Server
```bash
python manage.py runserver
```

### 4. Start Frontend Development Server
```bash
cd ../yearbookFrontend
npm run dev
```

## Features

### Backend Features
- ✅ Full CRUD operations
- ✅ File upload support (Cloudinary integration)
- ✅ Search and filtering
- ✅ Admin interface
- ✅ Random mugshots endpoint
- ✅ CORS configured for frontend
- ✅ Proper error handling

### Frontend Features
- ✅ Dynamic data loading
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design maintained
- ✅ All existing animations preserved
- ✅ Modal detail view

## Data Management

### Adding New Mugshots
1. **Via Django Admin**: Access `/admin/` and navigate to Mugshots
2. **Via API**: POST to `/mugshots/` with form data
3. **Via Script**: Modify `populate_mugshots.py` and run it

### Photo Management
- Photos can be uploaded to Cloudinary (configured)
- External URLs are also supported (like Unsplash)
- Automatic thumbnail generation

## Testing

### Backend Testing
```bash
python test_api.py
```

### Frontend Testing
1. Start backend server
2. Start frontend server
3. Navigate to mugshots page
4. Verify data loads from backend

## Production Considerations

### Security
- Remove `CORS_ALLOW_ALL_ORIGINS = True` in production
- Add proper authentication for admin endpoints
- Validate file uploads properly

### Performance
- Add pagination for large datasets
- Implement caching for frequently accessed data
- Optimize Cloudinary transformations

### Monitoring
- Add logging for API requests
- Monitor database performance
- Track photo upload usage

## File Structure
```
yearbookBackend/
├── yearbookBackend/
│   ├── models.py          # Mugshots model
│   ├── serializers.py     # API serializers
│   ├── views.py          # API views
│   ├── urls.py           # URL routing
│   └── admin.py          # Admin interface
├── populate_mugshots.py   # Sample data script
└── test_api.py           # API testing script

yearbookFrontend/
└── src/
    └── Mugshots.jsx      # Updated frontend component
```

This implementation provides a complete, scalable backend solution for the yearbook mugshots feature while maintaining the original frontend design and user experience.
