import { registerAs } from "@nestjs/config";

export default registerAs('appConfig', () => ({
        enviroment: process.env.NODE_ENV || 'production',
        smtpHost: process.env.SMTP_HOST,
        smtpUsername: process.env.SMTP_USERNAME,
        smtpPassword: process.env.SMTP_PASSWORD,
        smtpPort: process.env.SMTP_PORT,
        smtpSecure: process.env.SMTP_SECURE,
        defaultMailFrom: process.env.DEFAULT_MAIL_FROM,
        
    })
);

