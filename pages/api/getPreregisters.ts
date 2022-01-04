import { FirestoreCollection } from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'utils/firebaseAdmin';

export type Preregister = {
  email: string;
  position: number;
  ref: null | string;
  referredFrom: null | string;
};

export default async function getPreregisters(
  request: NextApiRequest,
  response: NextApiResponse<Preregister[]>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  try {
    const query = await db('preregisters' as FirestoreCollection);
    const preregistersSnapshot = await query.get();

    const preregisters: Preregister[] = [];
    preregistersSnapshot.forEach(doc => {
      preregisters.push(doc.data() as Preregister);
    });

    response.json(preregisters);
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
