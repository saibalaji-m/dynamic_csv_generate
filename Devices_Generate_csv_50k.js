/*
device csv creation pre requests
================================

create 5 custom fileds name are
1. TextCustomField -> Text type
2. NumberCustomField -> Number Type
3. DateCustomFiled -> Date Type
4. PriceCustomFiled -> Price type

&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
Create One Employee and update
AssignedUserID 
&

*/

const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const { randomInt } = require('crypto');

// update below value with line no: 12 & 13
const AssignedUserID = '123456'
const AssignedUserEmail = 'test12345@taskel.it'

function getRandomNumber(max) {
    return Math.floor(max);
}

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
        data.push({ 
            AssetNumber: getUniqueName('assetNumber', 20), 
            DeviceStatus: 'In-use',
            DeviceType:  'laptop',
            Manufacturer: 'dell',
            ModelNumber: getUniqueName('modelNumber', 20),
            ModelName: 'dell-model',
            OperatingSystem: 'windows',
            SerialNumber: getUniqueName('serialNumber', 20),
            DeviceProcurement: 'rent',
            StartDate: getCurrentDate(),
            EndDate:'',
            AdditionalInformation: 'memo',
            AssignedUsersID: AssignedUserID,
            AssignedUsersEmail: AssignedUserEmail,
            AssignedDate: getCurrentDate(),
            UnassignedDate: '',
            TextCustomField: getUniqueName('textCustomField', 20),
            NumberCustomField: getRandomNumber(10),
            DateCustomFiled: getCurrentDate(),
            PriceCustomFiled: getRandomNumber(10),
    });
    }
    return data;
}

// Function to write data to a CSV file
function writeToCsv(filename, data) {
    const csvWriterInstance = csvWriter({
        path: filename,
        header: [
            { id: 'AssetNumber', title: 'Asset Number' },
            { id: 'DeviceStatus', title: 'Device Status' },
            { id: 'DeviceType', title: 'Device Type' },
            { id: 'Manufacturer', title: 'Manufacturer' },
            { id: 'ModelNumber', title: 'Model Number' },
            { id: 'ModelName', title: 'Model Name' },
            { id: 'OperatingSystem', title: 'Operating System' },
            { id: 'SerialNumber', title: 'Serial Number' },
            { id: 'DeviceProcurement', title: 'Device Procurement' },
            { id: 'StartDate', title: 'Start Date' },
            { id: 'EndDate', title: 'End Date' },
            { id: 'AdditionalInformation', title: 'Additional Information' },
            { id: 'AssignedUsersID', title: "Assigned User's ID" },
            { id: 'AssignedUsersEmail', title: "Assigned User's Email" },
            { id: 'AssignedDate', title: 'Assigned Date' },
            { id: 'UnassignedDate', title: 'Unassigned Date' },
            { id: 'TextCustomField', title: 'TextCustomField' },
            { id: 'NumberCustomField', title: 'NumberCustomField' },
            { id: 'DateCustomFiled', title: 'DateCustomFiled' },
            { id: 'PriceCustomFiled', title: 'PriceCustomFiled' },
        ]
    });

    csvWriterInstance.writeRecords(data)
        .then(() => console.log(`CSV file '${filename}' created successfully with ${data.length} records.`))
        .catch(err => console.error('Error writing CSV file:', err));
}

// Generate 10,000 random records and write to a CSV file
// const randomData = generateRandomData(60000);
const randomData = generateRandomData(10000);
writeToCsv('Device_Random_data_psrApi_1.csv', randomData);