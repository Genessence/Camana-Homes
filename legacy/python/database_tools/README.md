# Database Setup Tools

This folder contains all the database management and setup scripts for the Camana Homes project.

## 📁 Scripts Overview

### 🔍 **Database Inspection Tools**
- `check_database.py` - Comprehensive database content check
- `quick_check.py` - Quick property and image verification

### 🧹 **Data Management Tools**
- `clear_demo_data.py` - Remove demo/placeholder data from database
- `update_trending_scores.py` - Set trending scores for real properties
- `update_prices.py` - Update property prices with realistic Dubai values
- `simple_price_update.py` - Alternative price update script using psycopg2

### 📊 **Data Import Tools**
- `import_excel_fixed.py` - Import property data from Excel file

## 🚀 Usage Instructions

### **One-Time Database Setup (Run Once)**
```bash
# 1. Clear demo data
python clear_demo_data.py

# 2. Update trending scores
python update_trending_scores.py

# 3. Update property prices
python simple_price_update.py
```

### **Database Inspection**
```bash
# Check all database contents
python check_database.py

# Quick property check
python quick_check.py
```

### **Data Import**
```bash
# Import from Excel file
python import_excel_fixed.py
```

## 📋 Script Details

### `check_database.py`
- **Purpose**: Comprehensive database inspection
- **Shows**: Properties, images, agents, agencies count and details
- **Usage**: Run to verify database state

### `clear_demo_data.py`
- **Purpose**: Remove all demo/placeholder data
- **Removes**: Demo properties, articles, agents with builder.io URLs
- **Keeps**: Real properties from Excel import
- **Usage**: Run once after initial setup

### `update_trending_scores.py`
- **Purpose**: Set proper trending scores for real properties
- **Sets**: High scores (100-94) for real properties, low scores (10-8) for demo
- **Usage**: Run once to prioritize real properties in API

### `update_prices.py`
- **Purpose**: Update property prices using SQLAlchemy
- **Sets**: Realistic Dubai property prices ($850K - $12M)
- **Usage**: Run once to fix $0.00 price display

### `simple_price_update.py`
- **Purpose**: Alternative price update using direct PostgreSQL
- **Sets**: Same realistic prices as update_prices.py
- **Usage**: Run if update_prices.py doesn't work

### `import_excel_fixed.py`
- **Purpose**: Import property data from Excel file
- **Imports**: Properties, images, agents, agencies
- **Usage**: Run when you have new Excel data to import

## ⚠️ Important Notes

- **One-Time Use**: Most scripts are designed for one-time setup
- **Backup**: Always backup your database before running scripts
- **Order**: Run scripts in the order shown above
- **Environment**: Ensure virtual environment is activated

## 🔧 Troubleshooting

If scripts fail to run:
1. Check virtual environment is activated
2. Verify database connection in `.env`
3. Ensure all dependencies are installed
4. Check database permissions

## 📞 Support

These tools are for database setup and maintenance. For regular development, just start your backend and frontend normally.
