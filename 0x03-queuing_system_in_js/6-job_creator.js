#!/usr/bin/env node
import { createQueue } from 'kue';

// Create queue
const queue = createQueue({name: 'push_notification_code'});

// Job data
const jobData = {
  phoneNumber: '0205034478',
  message: 'This is the code to verify your account'
};

// Create job
const job = queue.create('push_notification_code', jobData);

job
  .on('enqueue', () => {
    console.log(`Notification job created: ${job.id}`);
  })
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('failed', () => {
    console.log('Notification job failed');
  })

  .save((error) => {
    if (error) {
      console.log('Error creating job:', error);
    }
  });
