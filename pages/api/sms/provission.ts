// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

const twilio = require('twilio');

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const accountSid = process.env.SID;
    const authToken = process.env.TOKEN;

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    // client.lookups.phoneNumbers('+18557477626')
    //     .fetch({ type: ['carrier'] })
    //     .then(phone_number => {
    //         console.log(phone_number.carrier) // All of the carrier info.
    //         console.log(phone_number.carrier.name) // Just the carrier name.
    //         res.send({ name: phone_number.carrier.name });
    //     });

    client.availablePhoneNumbers('US')
        .local
        .list({ areaCode: 503, limit: 20 })
        // @ts-expect-error
        .then(local => res.status(200).json(local))
        // @ts-expect-error
        .catch(error => res.status(500).json(error));

    // res.status(200).json({ accountSid, authToken })

    // return client.messages
    //     .create({
    //         body: 'Hello from Node',
    //         to: '+12345678901', // Text this number
    //         from: '+12345678901', // From a valid Twilio number
    //     })
    //     .then((message) => res.status(200).json(message))
    //     .catch(error => res.status(500).json(error));

}
