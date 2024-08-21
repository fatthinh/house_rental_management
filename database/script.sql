DROP DATABASE rental_management_db;
CREATE DATABASE rental_management_db;



CREATE TABLE Users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name NVARCHAR(50),
	user_email NVARCHAR(50),
	user_phone NVARCHAR(20) NOT NULL UNIQUE,
	user_password NVARCHAR(30)  NOT NULL,
	user_avatar NVARCHAR(100),
	user_role ENUM('ROLE_ADMIN', 'ROLE_TENANT', 'ROLE_MANAGER'),
    user_state ENUM('ACTIVE', 'INACTIVE')
);

CREATE TABLE Tenants(
	tenant_id INT AUTO_INCREMENT PRIMARY KEY,
	tenant_name NVARCHAR(50) NOT NULL,
	tenant_state ENUM('GOOD', 'BAD'),
	tenant_dob DATE,
	tenant_citizen_id CHAR(12) UNIQUE, 
	tenant_gender ENUM('MALE', 'FEMALE'),
	FOREIGN KEY (tenant_id) REFERENCES Users(user_id),
	tenant_hometown NVARCHAR(50)
);

CREATE TABLE Amenities (
	amenity_id INT AUTO_INCREMENT PRIMARY KEY,
	amenity_name NVARCHAR(20) NOT NULL UNIQUE,
	count_in_stock INT
);

CREATE TABLE Houses (
	house_id INT AUTO_INCREMENT PRIMARY KEY,
	house_name NVARCHAR(20) NOT NULL UNIQUE,
	house_price DOUBLE,
    house_state ENUM('AVAILABLE', 'RESERVED', 'BEING_SERVICED')
);

CREATE TABLE Agreements (
	agreement_id INT AUTO_INCREMENT PRIMARY KEY,
	agreement_start_date DATE NOT NULL,
	agreement_deposit DOUBLE,
	agreement_state ENUM('CANCELED', 'COMPLETED', 'PENDING', 'ACTIVE'),
    house_id INT,
	created_date DATETIME,
    FOREIGN KEY (house_id) REFERENCES Houses(house_id)
);

CREATE TABLE AgreementTenant (
	tenant_id INT,
    agreement_id INT, 
    PRIMARY KEY (tenant_id, agreement_id),
    FOREIGN KEY (agreement_id) REFERENCES Agreements(agreement_id),
	FOREIGN KEY (tenant_id) REFERENCES Tenants(tenant_id)
);

CREATE TABLE HouseAmenity (
	id INT AUTO_INCREMENT PRIMARY KEY,
	house_id INT NOT NULL,
    amenity_id INT NOT NULL,
    setup_date DATETIME,
	quantity INT,
    FOREIGN KEY (house_id) REFERENCES Houses(house_id),
	FOREIGN KEY (amenity_id) REFERENCES Amenities(amenity_id)
);


CREATE TABLE HousePhoto (
	photo_id INT AUTO_INCREMENT PRIMARY KEY,
	photo_src NVARCHAR(255) NOT NULL,
    house_id INT,
    FOREIGN KEY (house_id) REFERENCES Houses(house_id)
);


CREATE TABLE Invoices (
	invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_amount DOUBLE,
    invoice_month INT NOT NULL,
    invoice_state ENUM('PAID', 'UNPAID'),
    created_at DATETIME,
    agreement_id INT,
    FOREIGN KEY (agreement_id) REFERENCES Agreements(agreement_id)
);


