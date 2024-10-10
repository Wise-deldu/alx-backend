#!/usr/bin/env node
// Create an array that will contain the balcklisted phone numbers.
// Add in it 4153518780 and 4153518781 - these 2 numbers will be blacklisted
// by our jobs processor.
// Create a function sendNotification that takes 4 arguments:
// - phoneNumber, message, job, and done:
//  - When the function is called, track the progress of the job of 0,
//    out of 100
//  - If phoneNumber is included in the "blacklisted array", fail the
//    job with an Error object and the message:
//    "Phone number PHONE_NUMBER is blacklisted"
//  - Otherwise:
//      - Track the progress to 50%
//      - Log to the console Sending notification to PHONE_NUMBER, with
//        message: MESSAGE
// Create a queue with Kue that will proceed job of the queue
// push_notification_code_2 with two jobs at a time.

import { createQueue, Job } from 'kue';

// Create a new Kue queue
const queue = createQueue();

const blacklistedNumbers = ['4153518780', '4153518781'];

const sendNotification = (phoneNumber, message, job, done) => {
  job.progress(0, 100);

  if (blacklistedNumbers.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done();
  }
}

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
