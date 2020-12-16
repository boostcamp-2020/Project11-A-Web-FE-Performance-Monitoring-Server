import nodemailer from 'nodemailer';
import { Project } from '@interfaces/models/project';
import mailConfig from '@config/nodemailer';

const sendMail = (project: Project): void => {
  try {
    if (!project.emails) {
      return;
    }
    const transporter = nodemailer.createTransport(mailConfig);
    const mailForm = {
      from: mailConfig.auth.user,
      subject: 'SAntry 오류 전송 메일 입니다.',
      text: `프로젝트 : [ ${project.projectName} ] 에서 위험 레벨의 이벤트가 발생하였습니다!`,
      //html: html형식으로 가능
    };
    project.emails.forEach((v) => transporter.sendMail({ ...mailForm, to: v }));
    return;
  } catch (err) {}
};

export { sendMail };
