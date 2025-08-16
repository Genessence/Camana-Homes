# Database Setup Guide

## Overview
This guide will help you set up the PostgreSQL database using Docker and import your Excel property data.

## Prerequisites
1. Docker and Docker Compose installed
2. Python 3.11+ with pip
3. Your Excel file with property data

## Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

## Step 2: Set Up Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql+asyncpg://camana_user:camana_password@localhost:5432/camana_homes
```

## Step 3: Start PostgreSQL with Docker
```bash
# Start the database
docker-compose up -d

# Check if it's running
docker-compose ps

# View logs if needed
docker-compose logs postgres
```

## Step 4: Set Up Database Tables
```bash
python setup_database.py
```

This will:
- Test the database connection
- Create all necessary tables
- Verify everything is working

## Step 5: Prepare Your Excel File
Save your Excel file as `properties.xlsx` in the root directory. Make sure it has these columns:

- Property Name
- Price (USD)
- Bedrooms
- Bathrooms
- Size (sqft)
- Price per sqft (USD)
- Address
- Outdoor Features
- Indoor Features
- Views
- Year Built
- Property Type
- About
- Saves Count
- Developer
- Completion Date
- Payment Options
- Key Amenities
- Distance to Key Locations

## Step 5.5: Add Property Images (Optional)
For each property, create a folder in `public/images/properties/` with the folder number:

1. Create folder: `public/images/properties/[folder-number]/` (1, 2, 3, ..., 10)
2. Add images: `1.jpg`, `2.jpg`, `3.jpg`, etc.
3. Image `1.jpg` will be the primary image

Example:
```
public/images/properties/
├── 1/                    # Excel Row 1 → Property 1
│   ├── 1.jpg (primary)
│   ├── 2.jpg
│   ├── 3.jpg
│   ├── 4.jpg
│   ├── 5.jpg
│   └── 6.jpg
├── 2/                    # Excel Row 2 → Property 2
│   ├── 1.jpg (primary)
│   ├── 2.jpg
│   └── ... (6 images)
└── 10/                   # Excel Row 10 → Property 10
    ├── 1.jpg (primary)
    └── ... (6 images)
```

If no local images are found, the import script will use placeholder images.

## Step 6: Create Image Folders
```bash
python setup_image_folders.py
```

This will create the numbered folders (1, 2, 3, ..., 10) for your property images.

## Step 7: Import Excel Data
```bash
python import_excel.py
```

This will:
- Import all properties from your Excel file
- Use local images if available, otherwise use placeholders
- Set up default agency/agent for "Direct From The Developer"

## Step 8: Start the API Server
```bash
cd api
uvicorn main:app --reload --port 8001
```

## Step 9: Test the API
Visit: http://localhost:8001/docs

You can test these endpoints:
- `GET /api/properties/trending` - Trending properties
- `GET /api/properties/featured` - Featured properties
- `GET /api/properties/{slug}` - Property details
- `GET /api/hero-slides` - Hero carousel images

## Step 10: Start Frontend
```bash
npm run dev
```

Visit: http://localhost:8080

## Troubleshooting

### Docker Issues
- Check if Docker is running: `docker --version`
- Check container status: `docker-compose ps`
- View logs: `docker-compose logs postgres`
- Restart container: `docker-compose restart`

### Database Connection Issues
- Check your `.env` file has correct DATABASE_URL
- Ensure Docker container is running: `docker-compose up -d`
- Verify port 5432 is available

### Import Errors
- Check Excel column names match exactly
- Ensure all required fields have data
- Check for special characters in property names

### API Issues
- Make sure the API server is running on port 8001
- Check CORS settings if frontend can't connect
- Verify database tables were created

## Docker Commands Reference

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs postgres

# Check status
docker-compose ps

# Reset database (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d
```

## Next Steps
1. Add your property images to the numbered folders
2. Test the homepage with real data
3. Customize the frontend as needed
4. Set up proper image hosting for production
