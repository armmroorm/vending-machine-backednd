import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private adminService: AdminService,
  ) {}

  async sendNotificationToAddmin() {
    const admin = await this.adminService.QueryById(1);

    await this.mailerService
      .sendMail({
        to: admin.email,
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest MailerModule ✔',
        text: 'welcome',
        html: '<b>มีสินค้าใกล้หมด <a href="http://localhost:3000/admin" target="_blank">ตรวจสอบได้ที่ลิ้งค์</a></b>',
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendNotificationToAddminByTemplate(products: Object) {
    console.log(products);
    const admin = await this.adminService.QueryById(1);
    console.log(admin);

    await this.mailerService
      .sendMail({
        to: admin.email,
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: __dirname + '/notification', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
