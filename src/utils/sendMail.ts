import nodemailer from 'nodemailer';
import { Project } from '@interfaces/models/project';
import mailConfig from '@config/nodemailer';

const sendMail = async (project: Project): Promise<boolean> => {
  if (!project.emails) {
    return false;
  }
  const transporter = nodemailer.createTransport(mailConfig);
  const mailForm = {
    from: mailConfig.auth.user,
    subject: 'SAntry 오류 전송 메일 입니다.',
    text: `${project.projectName}에서 위험 레벨의 오류가 발생하였습니다!`,
    //html: html형식으로 가능
  };
  await Promise.all(
    project.emails.map((v) => transporter.sendMail({ ...mailForm, to: v })),
  );
  return true;
};

export default sendMail;
