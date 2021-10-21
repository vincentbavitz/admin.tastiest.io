import { FunctionsResponse } from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

export interface GetAuthTokenParams {
  email: string;
  password: string;
}

export type GetAuthTokenReturn = {
  user: firebaseAdmin.auth.UserRecord;
  token: string;
};

export default async function getAuthToken(
  request: NextApiRequest,
  response: NextApiResponse<FunctionsResponse<GetAuthTokenReturn>>,
) {
  // Only allow POST
  if (request.method !== 'POST') {
    response.status(405).end();
  }

  // Doesn't matter if JSON encoded or not
  let body;
  try {
    body = JSON.parse(request.body);
  } catch {
    body = request.body;
  }

  const { email, password } = body;

  if (!email?.length || !password?.length) {
    response.json({
      data: { user: null, token: null },
      error: 'No email or no password given',
      success: false,
    });
    return;
  }

  if (!email.includes('@tastiest.io')) {
    response.json({ data: null, error: 'User not an admin', success: false });
    return;
  }

  try {
    const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
    if (userRecord) {
      // Custom token used for signing in.
      // We can then sign in with signInWithCustomToken in useAuth
      // Ref. https://blog.usejournal.com/firesbase-authentication-through-node-js-using-rest-api-and-async-await-f3cf8875ed91
      const token = await firebaseAdmin
        .auth()
        .createCustomToken(userRecord.uid);

      response.status(202).json({
        data: { user: userRecord, token },
        error: null,
        success: false,
      });
      return;
    }

    response.json({ data: null, error: 'User not found', success: false });
  } catch (error) {
    response.json({ data: null, error, success: false });
    return;
  }
}
