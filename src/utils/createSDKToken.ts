import jwt from 'jsonwebtoken';
import passportConfig from '@config/passport';

const createToken = (projectId: string): string =>
  jwt.sign(projectId, passportConfig.secretOrKey);

export default createToken;
