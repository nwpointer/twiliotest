import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from '../../../../clients/twilio'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // @ts-ignore
    try {
        const number = await getAvailableNumber(req.query.country as string);
        const provisionedNumber = await provisionNumber(number);
        res.status(200).json({ message: `Provisioned ${number}` })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const provisionNumber = async (phoneNumber: string) => {
    return twilio.incomingPhoneNumbers.create({ phoneNumber })
}

const getAvailableNumber = async (country: string) => {
    return twilio.availablePhoneNumbers('US').local
        .list({ limit: 1 })
        .then(local => local[0].phoneNumber);
}
