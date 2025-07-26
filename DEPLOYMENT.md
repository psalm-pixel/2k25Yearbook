# Class of 2025 Yearbook - Production Deployment Guide

## Overview
This is a complete production-ready yearbook application with Django backend and React frontend.

## Project Structure
```
2K25_YearBook/
├── yearbookBackend/          # Django REST API
│   ├── manage.py
│   ├── yearbookBackend/
│   │   ├── models.py         # Students, Gallery, Mugshots, PrefectQuotes
│   │   ├── views.py          # API ViewSets
│   │   ├── serializers.py    # DRF Serializers
│   │   └── urls.py          # API Routes
│   └── requirements.txt
├── yearbookFrontend/        # React Frontend
│   ├── src/
│   │   ├── Homepage.jsx     # Landing page
│   │   ├── Legacy.jsx       # Student profiles
│   │   ├── Memories.jsx     # Photo/video gallery
│   │   ├── Mugshots.jsx     # Student photos
│   │   ├── Superlatives.jsx # Awards & recognition
│   │   ├── Chronicles.jsx   # Timeline of events
│   │   ├── PrefectQuotes.jsx # Leadership quotes
│   │   └── components/      # Reusable components
│   └── package.json
└── DEPLOYMENT.md           # This file
```

## Features Implemented

### ✅ Complete Frontend Pages
- **Homepage**: Animated landing page with loading screen
- **The Legacy**: Student profiles with search functionality
- **Memories**: Photo/video gallery with lightbox
- **Mugshots**: Clean student photo display
- **Superlatives**: Awards and recognition system
- **Chronicles**: Timeline of school events
- **Prefect Quotes**: Leadership inspirational quotes

### ✅ Backend API
- Django REST Framework with full CRUD operations
- Cloudinary integration for image/video storage
- Models: Students, Gallery, Mugshots, PrefectQuotes, Images
- API endpoints for all frontend features
- Image optimization and thumbnail generation

### ✅ Production Ready Features
- Error boundaries for graceful error handling
- Environment-based configuration
- Responsive design (mobile + desktop)
- Loading states and animations
- Professional UI/UX with consistent theming
- Clean code architecture

## Prerequisites

### Backend Requirements
- Python 3.8+
- Django 4.2+
- PostgreSQL (recommended for production)
- Cloudinary account for media storage

### Frontend Requirements
- Node.js 16+
- npm or yarn
- Modern web browser

## Environment Setup

### 1. Backend Configuration

Create `.env` file in `yearbookBackend/`:
```env
DEBUG=False
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=postgresql://username:password@host:port/database_name
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. Frontend Configuration

Update `.env.production` in `yearbookFrontend/`:
```env
VITE_API_BASE_URL=https://your-backend-api.com
VITE_APP_TITLE=Class of 2025 Digital Yearbook
VITE_APP_DESCRIPTION=Memories that will last forever - Class of 2025
VITE_ENVIRONMENT=production
```

## Deployment Steps

### Backend Deployment (Django)

1. **Install Dependencies**
   ```bash
   cd yearbookBackend
   pip install -r requirements.txt
   ```

2. **Database Setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```

3. **Collect Static Files**
   ```bash
   python manage.py collectstatic --noinput
   ```

4. **Deploy to Heroku/Railway/DigitalOcean**
   - Configure database connection
   - Set environment variables
   - Deploy using platform-specific instructions

### Frontend Deployment (React)

1. **Install Dependencies**
   ```bash
   cd yearbookFrontend
   npm install
   ```

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Deploy to Netlify/Vercel/AWS S3**
   - Upload `dist/` folder to hosting platform
   - Configure redirects for SPA routing
   - Set environment variables

### Example Netlify Deployment

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Redirects File** (`public/_redirects`)
   ```
   /*    /index.html   200
   ```

3. **Environment Variables**
   - Set all `VITE_*` variables in Netlify dashboard

## Database Seeding

### Add Sample Data

1. **Access Django Admin**
   ```
   https://your-backend-domain.com/admin/
   ```

2. **Add Content**
   - Students: Upload student profiles with photos
   - Gallery: Add photos/videos from school events
   - Mugshots: Upload individual student photos
   - Prefect Quotes: Add leadership quotes

3. **Bulk Import** (Optional)
   ```bash
   python manage.py loaddata data.json
   ```

## Performance Optimizations

### Frontend Optimizations
- ✅ Image lazy loading
- ✅ Code splitting by route
- ✅ Optimized bundle size
- ✅ Responsive images
- ✅ Error boundaries

### Backend Optimizations
- ✅ Database query optimization
- ✅ Image compression via Cloudinary
- ✅ API pagination
- ✅ CORS configuration
- ✅ Static file serving

## Security Checklist

### Backend Security
- [ ] DEBUG=False in production
- [ ] Strong SECRET_KEY
- [ ] HTTPS enforcement
- [ ] CORS properly configured
- [ ] Database credentials secured
- [ ] Cloudinary keys protected

### Frontend Security
- [ ] Environment variables properly set
- [ ] No sensitive data in client code
- [ ] HTTPS deployment
- [ ] Content Security Policy headers

## Monitoring & Maintenance

### Health Checks
- API endpoints respond correctly
- Database connections stable
- Image uploads working
- All pages load without errors

### Regular Updates
- Keep dependencies updated
- Monitor for security vulnerabilities
- Backup database regularly
- Update content as needed

## Support & Documentation

### API Documentation
Access the API at: `https://your-backend-domain.com/admin/`

### Frontend Routes
- `/` - Homepage
- `/legacy` - Student profiles
- `/memories` - Photo gallery
- `/mugshots` - Student photos
- `/superlatives` - Awards
- `/chronicles` - Timeline
- `/prefect-quotes` - Leadership quotes

### Troubleshooting Common Issues

1. **Images not loading**
   - Check Cloudinary configuration
   - Verify CORS settings
   - Confirm image URLs are accessible

2. **API connection failed**
   - Verify backend is running
   - Check CORS configuration
   - Confirm API_BASE_URL is correct

3. **Build failures**
   - Check Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

## Contact
For technical support or questions about the yearbook system, please contact the development team.

---

**Class of 2025 Digital Yearbook**  
*Memories that will last forever*
