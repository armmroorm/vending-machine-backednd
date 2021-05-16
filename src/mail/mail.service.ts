import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendNotificationToAddmin() {
    const url = `https://notiz.dev/blog/send-emails-with-nestjs#sending-mail`;

    await this.mailerService.sendMail({
      to: 'fonarts05@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Notification your Email',
      template: 'notification.hbs', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'Admin',
        url,
      },
    });
  }

  async sendUserConfirmation() {
    const url = `https://notiz.dev/blog/send-emails-with-nestjs#sending-mail`;

    await this.mailerService.sendMail({
      to: 'fonarts05@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'Admin',
        url,
      },
    });
  }
}
