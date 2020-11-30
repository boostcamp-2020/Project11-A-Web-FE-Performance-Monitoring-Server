import got from 'got';

import githubConfig from '@config/github';
import { GithubToken } from '@interfaces/githubToken';
import db from '@models';
import { User } from '@interfaces/user';
import jwt from 'jsonwebtoken';
import passportConfig from '@config/passport';

const githubURL = `https://github.com/login/oauth/authorize?client_id=${githubConfig.client_id}`;

const githubCallback = async (code: string): Promise<User> => {
  try {
    const { body }: { body: GithubToken } = await got.post(
      'https://github.com/login/oauth/access_token',
      {
        json: {
          client_id: githubConfig.client_id,
          client_secret: githubConfig.client_secret,
          code,
        },
        responseType: 'json',
      },
    );
    const getUser = await got('https://api.github.com/user', {
      headers: {
        Authorization: `${body.token_type} ${body.access_token}`,
      },
    });
    const callbackBody: { id: string } = JSON.parse(getUser.body);
    const user = await new db.User({ email: callbackBody.id });
    await user.save();
    const token = jwt.sign(user.toJSON(), passportConfig.secretOrKey);
    return { ...user.toJSON(), token };
  } catch (err) {
    throw new Error(err);
  }
};

export default { githubURL, githubCallback };
