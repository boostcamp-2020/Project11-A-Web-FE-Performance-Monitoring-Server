import nodemailer from 'nodemailer';
import { Project } from '@interfaces/models/project';
import { Issue } from '@interfaces/models/issue';
import mailConfig from '@config/nodemailer';
import { logger } from '@config/winston';
import html from '@interfaces/mailform';

const sendMail = (project: Project, issue: Issue, eventId: string): void => {
  try {
    if (!project.emails) {
      return;
    }
    const transporter = nodemailer.createTransport(mailConfig);
    const mailForm = {
      from: mailConfig.auth.user,
      to: project.emails.join(', '),
      subject: '[SAntry] 오류 전송 메일 입니다.',
      html: html(
        project.projectName,
        issue.eventName as string,
        issue._id as string,
        eventId,
      ),
    };
    transporter.sendMail({ ...mailForm });
  } catch (err) {
    logger.log({ level: 'error', message: err });
  }
};

export { sendMail };
