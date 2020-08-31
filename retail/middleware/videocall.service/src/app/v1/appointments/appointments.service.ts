import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { job } from 'cron';

@Injectable()
export class AppointmentsService {
  // *   *   *   *   *   *
  // |   |   |   |   |   |
  // |   |   |   |   |   day of week
  // |   |   |   |   month
  // |   |   |   day of month
  // |   |   hour
  // |   minute
  // second (optional)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron(): void {
    console.log('Cron is running.');
    // TODO: Get all Appointments for today.
    // TODO: Save all these in Redis instance
    // TODO: Register all dynamically into Cron library
    // ELSE: Create another Cron job and check for calls every minute in Redis (within MINUTES_BEFORE_CALL_TO_SEND_NOTIFICATION).
    // If Found send Push Notification right away.
  }
}
