# Student-Register-API

This app performs the basic CRUD operations for Students Register app. It runs on Spring boot with inbuild h2 database.
Extract the zip file and import the maven project.

# Setup
Run StudentRegister.class file to get the application started.
The app starts in localhost:8081

# APIs

# Get all Students: 
URL: /students
Method: GET

# Get one Student Detail: 
URL: /students/{rollNo}
Method: GET

# Save Student Details
URL: /students
Method: POST
data: {}

# Update Student Details
URL: /students/{rollNo}
Method: PUT
data:{}

# Delete Details
URL: /students/{rollNo}
Method: DELETE
