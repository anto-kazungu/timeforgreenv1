# TimeForGreen Database Setup Script (Windows PowerShell)
# Run this script to set up the complete database

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TimeForGreen Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$DB_NAME = "timeforgreen"
$DB_USER = "timeforgreen_user"
$DB_PASSWORD = "timeforgreen_pass_2024"

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "  Database: $DB_NAME"
Write-Host "  User: $DB_USER"
Write-Host ""

# Check if PostgreSQL is installed
Write-Host "Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version
    Write-Host "✓ PostgreSQL found: $pgVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ PostgreSQL not found. Please install PostgreSQL first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 1: Creating Database and User" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Create database and user
$createDbSql = @"
-- Drop existing database if exists
DROP DATABASE IF EXISTS $DB_NAME;
DROP USER IF EXISTS $DB_USER;

-- Create user
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';

-- Create database
CREATE DATABASE $DB_NAME OWNER $DB_USER;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
"@

$createDbSql | psql -U postgres 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database and user created successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to create database and user" -ForegroundColor Red
    Write-Host "  Make sure you have PostgreSQL superuser access" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 2: Creating Schema" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Run schema files
Write-Host "Creating tables..." -ForegroundColor Yellow
psql -U $DB_USER -d $DB_NAME -f "../schema/01_create_tables.sql" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Tables created" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to create tables" -ForegroundColor Red
    exit 1
}

Write-Host "Creating indexes..." -ForegroundColor Yellow
psql -U $DB_USER -d $DB_NAME -f "../schema/02_create_indexes.sql" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Indexes created" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to create indexes" -ForegroundColor Red
    exit 1
}

Write-Host "Creating functions and triggers..." -ForegroundColor Yellow
psql -U $DB_USER -d $DB_NAME -f "../schema/03_create_functions.sql" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Functions and triggers created" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to create functions and triggers" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 3: Seeding Sample Data" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$seedData = Read-Host "Do you want to seed sample data? (y/n)"
if ($seedData -eq "y" -or $seedData -eq "Y") {
    Write-Host "Seeding users..." -ForegroundColor Yellow
    psql -U $DB_USER -d $DB_NAME -f "../seeds/01_seed_users.sql" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Users seeded" -ForegroundColor Green
    }

    Write-Host "Seeding communities..." -ForegroundColor Yellow
    psql -U $DB_USER -d $DB_NAME -f "../seeds/02_seed_communities.sql" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Communities seeded" -ForegroundColor Green
    }

    Write-Host "Seeding activities..." -ForegroundColor Yellow
    psql -U $DB_USER -d $DB_NAME -f "../seeds/03_seed_activities.sql" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Activities seeded" -ForegroundColor Green
    }
} else {
    Write-Host "Skipping sample data" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Database Information:" -ForegroundColor Yellow
Write-Host "  Host: localhost"
Write-Host "  Port: 5432"
Write-Host "  Database: $DB_NAME"
Write-Host "  User: $DB_USER"
Write-Host "  Password: $DB_PASSWORD"
Write-Host ""
Write-Host "Connection String:" -ForegroundColor Yellow
Write-Host "  postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}"
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Update your backend .env file with the connection details"
Write-Host "  2. Test the connection: psql -U $DB_USER -d $DB_NAME"
Write-Host "  3. Start building your API endpoints"
Write-Host ""
Write-Host "Sample Users (password: password123):" -ForegroundColor Yellow
Write-Host "  - john_green (member)"
Write-Host "  - sarah_eco (member)"
Write-Host "  - lisa_organizer (organizer)"
Write-Host "  - dr_green (mentor)"
Write-Host "  - admin (admin)"
Write-Host ""
