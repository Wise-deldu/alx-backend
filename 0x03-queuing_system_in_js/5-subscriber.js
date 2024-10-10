#!/usr/bin/env node
// It should subscribe to the channel holberton school channel
// When it receives message on the channel holberton school channel,
// It should log the message to the console.
// Whe the message is KILL_SERVER, it should unsubscribe and quit
import { createClient } from 'redis';

// Create Redis client
const subscriber = createClient();

subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

subscriber.subscribe('holberton school channel');

subscriber.on('message', (channel, message) => {
  console.log(`${message}`);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
