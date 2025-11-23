#!/bin/bash
# TimeForGreen Database Setup Script (Linux/Mac)
# Run this script to set up the complete database

echo "========================================"
echo "TimeForGreen Database Setup"
echo "========================================"
echo ""

# Configuration
DB_NAME="timeforgreen"
DB_USER="timeforgreen_user"
DB_PASSWORD="timeforgreen_pass_2024"

echo "Configuration:"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo ""

# Check if PostgreSQL is installed
echo "Checking PostgreSQL installation..."
if command -v psql &> /dev/null; then
    PG_VERSION=$(psql --version)
    echo "✓ PostgreSQL found: $PG_VERSION"
else
    echo "✗ PostgreSQL not found. Please install PostgreSQL first."
    exit 1
fi

echo ""
echo "========================================"
echo "Step 1: Creating Database and User"
echo "========================================"

# Create database and user
psql -U postgres <<EOF
-- Drop existing database if exists
DROP DATABASE IF EXISTS $DB_NAME;
DROP USER IF EXISTS $DB_USER;

-- Create user
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';

-- Create database
CREATE DATABASE $DB_NAME OWNER $DB_USER;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF

if [ $? -eq 0 ]; then
    echo "✓ Database and user created successfully"
else
    echo "✗ Failed to create database and user"
    echo "  Make sure you have PostgreSQL superuser access"
    exit 1
fi

echo ""
echo "========================================"
echo "Step 2: Creating Schema"
echo "========================================"

# Run schema files
echo "Creating tables..."
psql -U $DB_USER -d $DB_NAME -f "../schema/01_create_tables.sql" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Tables created"
else
    echo "✗ Failed to create tables"
    exit 1
fi

echo "Creating indexes..."
psql -U $DB_USER -d $DB_NAME -f "../schema/02_create_indexes.sql" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Indexes created"
else
    echo "✗ Failed to create indexes"
    exit 1
fi

echo "Creating functions and triggers..."
psql -U $DB_USER -d $DB_NAME -f "../schema/03_create_functions.sql" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Functions and triggers created"
else
    echo "✗ Failed to create functions and triggers"
    exit 1
fi

echo ""
echo "========================================"
echo "Step 3: Seeding Sample Data"
echo "========================================"

read -p "Do you want to seed sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Seeding users..."
    psql -U $DB_USER -d $DB_NAME -f "../seeds/01_seed_users.sql" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✓ Users seeded"
    fi

    echo "Seeding communities..."
    psql -U $DB_USER -d $DB_NAME -f "../seeds/02_seed_communities.sql" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✓ Communities seeded"
    fi

    echo "Seeding activities..."
    psql -U $DB_USER -d $DB_NAME -f "../seeds/03_seed_activities.sql" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✓ Activities seeded"
    fi
else
    echo "Skipping sample data"
fi

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Database Information:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo "  Password: $DB_PASSWORD"
echo ""
echo "Connection String:"
echo "  postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}"
echo ""
echo "Next Steps:"
echo "  1. Update your backend .env file with the connection details"
echo "  2. Test the connection: psql -U $DB_USER -d $DB_NAME"
echo "  3. Start building your API endpoints"
echo ""
echo "Sample Users (password: password123):"
echo "  - john_green (member)"
echo "  - sarah_eco (member)"
echo "  - lisa_organizer (organizer)"
echo "  - dr_green (mentor)"
echo "  - admin (admin)"
echo ""
