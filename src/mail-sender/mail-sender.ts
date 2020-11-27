import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { getLogger } from 'log4js';

const logger = getLogger('MailSender')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class MailSender {
  send(siteName: string): void {
    const mailData: MailDataRequired = {
      to: process.env.TARGET_MAIL,
      from: process.env.SENDGRID_MAIL,
      subject: `[ps5-bot] ${siteName} has changed`,
      text: `${siteName} has changed`
    }

    sgMail.send(mailData)
      .then(() => {
        logger.info('Mail sent')
      })
      .catch(error => {
        logger.warn(error)
      })
  }

  sendError(siteName: string, error: Error): void {
    const mailData: MailDataRequired = {
      to: process.env.TARGET_MAIL,
      from: process.env.SENDGRID_MAIL,
      subject: `[ps5-bot] ERROR in ${siteName}`,
      text: `${error.stack}`
    }

    sgMail.send(mailData)
      .then(() => {
        logger.info('Mail sent')
      })
      .catch(error => {
        logger.warn(error)
      })
  }
}

