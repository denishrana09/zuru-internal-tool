/* Creating Database*/

CREATE DATABASE IF NOT EXISTS zuru_internal_tool;

/* drop table */
drop table if exists "candidateExpertise";
drop table if exists "employeeExpertise";
drop table if exists "profileReview";
drop table if exists "expertise";
drop table if exists "employee";
drop table if exists "candidate";
drop table if exists "designation";
drop table if exists "role";
drop table if exists "department";

/* Creating Tables 
1. role */

CREATE TABLE role (
	"id" SERIAL NOT NULL,
	"role" STRING NOT NULL UNIQUE,
	"createdBy" STRING NOT NULL,
	"updatedBy" STRING,
	"createdDatetime" TIMESTAMP NOT NULL,
	"updatedDatetime" TIMESTAMP,
	CONSTRAINT "pkRole" PRIMARY KEY("id")
);

/* 2. expertise */

CREATE TABLE expertise (
	"id" SERIAL NOT NULL,
	"expertiseField" STRING NOT NULL UNIQUE,
	"createdBy" STRING NOT NULL,
	"updatedBy" STRING,
	"createdDatetime" TIMESTAMP NOT NULL,
	"updatedDatetime" TIMESTAMP,
	CONSTRAINT "pkExpertise" PRIMARY KEY("id")
);

/* 3. department */

CREATE TABLE department (
	"id" SERIAL NOT NULL,
	"name" STRING NOT NULL UNIQUE,
	"createdBy" STRING NOT NULL,
	"updatedBy" STRING,
	"createdDatetime" TIMESTAMP NOT NULL,
	"updatedDatetime" TIMESTAMP,
	CONSTRAINT "pkDepartment" PRIMARY KEY("id")
);

/* 4. designation */

CREATE TABLE designation (
	"id" SERIAL NOT NULL,
	"name" STRING NOT NULL UNIQUE,
	"createdBy" STRING NOT NULL,
	"updatedBy" STRING,
	"createdDatetime" TIMESTAMP NOT NULL,
	"updatedDatetime" TIMESTAMP,
	CONSTRAINT "pkDesignation" PRIMARY KEY("id")
);

/* 5. employee */

CREATE TABLE employee (
	"id" SERIAL NOT NULL,
	"firstname" STRING NOT NULL,
	"middlename" STRING,
	"lastname" STRING NOT NULL,
	"password" STRING NOT NULL,
	"email" STRING NOT NULL UNIQUE,
	"code" STRING NOT NULL UNIQUE,
	"mobile" INT NOT NULL UNIQUE,
	"departmentId" INT NOT NULL,
	"roleId" INT NOT NULL,
	"designationId" INT NOT NULL,
	"birthdate" DATE,
	"experience" DECIMAL,
	"pictureFilename" STRING,
	"createdBy" STRING NOT NULL,
	"updatedBy" STRING,
	"createdDatetime" TIMESTAMP NOT NULL,
	"updatedDatetime" TIMESTAMP,
	CONSTRAINT "pkEmployee" PRIMARY KEY("id"),
	CONSTRAINT "fkEmployeeDepartment" FOREIGN KEY("departmentId") REFERENCES department("id"),
	CONSTRAINT "fkEmployeeRole" FOREIGN KEY("roleId") REFERENCES role("id"),
	CONSTRAINT "fkEmployeeDesignation" FOREIGN KEY("designationId") REFERENCES designation("id"),
	CONSTRAINT "chkEmployee" CHECK ( experience >=0)
);

/* 6. candidate */

CREATE TABLE candidate (
	"id" SERIAL NOT NULL,
	"firstname" STRING NOT NULL,
	"middlename" STRING,
	"lastname" STRING NOT NULL,
	"email" STRING NOT NULL UNIQUE,
	"mobile" INT NOT NULL UNIQUE,
	"designationId" INT NOT NULL,
	"referrerName" STRING,
	"photoFilename" STRING,
	"experience" DECIMAL,
	"currentEmployer" STRING,
	"resumeFilename" STRING NOT NULL UNIQUE,
	"interviewDatetime" TIMESTAMP,
	"profileReviewStatus" STRING,
	"createdBy" STRING NOT NULL,
	"updatedBy" STRING,
	"createdDatetime" TIMESTAMP NOT NULL,
	"updatedDatetime" TIMESTAMP,
	CONSTRAINT "pkCandidate" PRIMARY KEY(id),
	CONSTRAINT "fkCandidateDesignation" FOREIGN KEY("designationId") REFERENCES designation("id"),
	CONSTRAINT "chkCandidate" CHECK ( experience >=0) 
);

/* 7. profileReview */

CREATE TABLE profileReview (
	"id" SERIAL NOT NULL,
	"candidateId" INT NOT NULL,
	"employeeId" INT NOT NULL,
	"status" STRING,
	"remarks" STRING,
	"createdBy" STRING NOT NULL,
	"updatedBy" STRING,
	"createdDatetime" TIMESTAMP NOT NULL,
	"updatedDatetime" TIMESTAMP,
	CONSTRAINT "pkProfileReview" PRIMARY KEY(id),
	CONSTRAINT "fkProfileReviewCandidate" FOREIGN KEY("candidateId") REFERENCES candidate("id"),
	CONSTRAINT "fkProfileReviewEmployee" FOREIGN KEY("employeeId") REFERENCES employee("id"),
	UNIQUE ("candidateId", "employeeId")
);

/* 8. candidateExpertise */

CREATE TABLE candidateExpertise (
	"id" SERIAL NOT NULL,
	"candidateId" INT NOT NULL,
	"expertiseId" INT NOT NULL,
	"createdBy" STRING NOT NULL,
	"updatedBy" STRING,
	"createdDatetime" TIMESTAMP NOT NULL,
	"updatedDatetime" TIMESTAMP,
	CONSTRAINT "pkCandidateExpertise" PRIMARY KEY(id),
	CONSTRAINT "fkCandidateExpertiseCandidate" FOREIGN KEY("candidateId") REFERENCES candidate("id"),
	CONSTRAINT "fkCandidateExpertiseExpertise" FOREIGN KEY("expertiseId") REFERENCES expertise("id"),
	UNIQUE ("candidateId", "expertiseId")
);

/* 9. employeeExpertise */

CREATE TABLE employeeExpertise (
	"id" SERIAL NOT NULL,
	"employeeId" INT NOT NULL,
	"expertiseId" INT NOT NULL,
	"createdBy" STRING NOT NULL,
	"updatedBy" STRING,
	"createdDatetime" TIMESTAMP NOT NULL,
	"updatedDatetime" TIMESTAMP,
	CONSTRAINT "pkEmployeeExpertise" PRIMARY KEY("id"),
	CONSTRAINT "fkEmployeeExpertiseExpertise" FOREIGN KEY("expertiseId") REFERENCES expertise("id"),
	CONSTRAINT "fkEmployeeExpertiseEmployee" FOREIGN KEY("employeeId") REFERENCES employee("id"),
	UNIQUE ("employeeId", "expertiseId")
);
