#!/usr/bin/env node
// Script that logs to the console "Redis client connected to the server"
// when the connection to Redis works correctly
// It logs to the console "Redis client not connected to the server: ERROR_MESSAGE"
// when the connection to Redis doe not work
// Add two functions: set NewSchool and displaySchoolValue

import { createClient, print } from 'redis';

const client = createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error.message}`)
});


const setNewSchool = (schoolName, value) => {
    client.set(schoolName, value, print);
}

const displaySchoolValue = (schoolName) => {
    client.get(schoolName, (err, reply) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(reply);
    });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
