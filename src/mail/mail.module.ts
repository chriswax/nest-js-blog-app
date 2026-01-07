import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';


@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async(config: ConfigService) => ({
        transport: {
          host: config.get('appConfig.smtpHost'),
          secure: false, //config.get('appConfig.smtpSecure'),
          port:config.get('appConfig.smtpPort'),
          auth:{
            user: config.get('appConfig.smtpUsername'),
            pass: config.get('appConfig.smtpPassword'),
          },
        },

        defaults:{
          from: config.get('appConfig.defaultMailFrom'),
        },
        template:{
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter({
            inlineCssEnabled:true,
          }),
          options:{
            strict: false,
          },
        },       
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
