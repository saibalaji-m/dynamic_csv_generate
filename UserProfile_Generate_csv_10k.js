const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const { randomInt } = require('crypto');


function generateUniqueName(textPrefix = '', lengthOfRecord = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = textPrefix;
    for (let i = 0; i < lengthOfRecord; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
}

const existingNames = new Set();

function getUniqueName() {
    let name = generateUniqueName();
    while (existingNames.has(name)) {
        name = generateUniqueName();
    }
    existingNames.add(name);
    return name;
}

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



// Function to generate a random email
function randomEmail(name) {
    const domains = ['psr.info'];
    const namePart = name.toLowerCase().replace(' ', '.');
    return `${namePart}@${domains[randomInt(domains.length)]}`;
}

// Function to generate random data
function generateRandomData(numRecords) {
    const data = [];
    for (let i = 0; i < numRecords; i++) {
        data.push({ UserID: getUniqueName('userId', 20), LastName: getUniqueName('lastName'), FirstName: getUniqueName('firstName'), Status: 'Onboard Initiated', UserCategory: 'Full-time', Email: randomEmail(getUniqueName('email',30)), 
        Department: 'department_1', JobTitle: 'Corporate Community-Services Assistant', StartDate: getCurrentDate(),
        EndDate: '', AdditionalInformation: 'memo', WorkLocationCode: '', Username: getUniqueName('userName', 20), PersonalEmail: '', Role: ''

    });
    }
    return data;
}

// Function to write data to a CSV file
function writeToCsv(filename, data) {
    const csvWriterInstance = csvWriter({
        path: filename,
        header: [
            { id: 'UserID', title: 'User ID' },
            { id: 'LastName', title: 'Last Name' },
            { id: 'FirstName', title: 'First Name' },
            { id: 'Status', title: 'Status' },
            { id: 'UserCategory', title: 'User Category' },
            { id: 'Email', title: 'Email' },
            { id: 'Department', title: 'Department' },
            { id: 'JobTitle', title: 'Job Title' },
            { id: 'StartDate', title: 'Start Date' },
            { id: 'EndDate', title: 'End Date' },
            { id: 'AdditionalInformation', title: 'Additional Information' },
            { id: 'WorkLocationCode', title: 'Work Location Code' },
            { id: 'Username', title: 'Username' },
            { id: 'PersonalEmail', title: 'Personal Email' },
            { id: 'Role', title: 'Role' },
        ]
    });

    csvWriterInstance.writeRecords(data)
        .then(() => console.log(`CSV file '${filename}' created successfully with ${data.length} records.`))
        .catch(err => console.error('Error writing CSV file:', err));
}

// Generate 10,000 random records and write to a CSV file
const randomData = generateRandomData(10000);
writeToCsv('UserProfilesRandom_data_psrApi_2.csv', randomData);