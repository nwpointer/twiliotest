import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from '../../../clients/twilio'

type Data = { numbers: any } | { message: string }



export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // @ts-ignore
    try {
        const numbers = await getActiveNumbers();
        res.status(200).json({ numbers })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error' })
    }
}

export const getActiveNumbers = async () => {
    const numbers: [] = (await twilio.incomingPhoneNumbers.list({ limit: 100 }))
        .map((number: { dateCreated: Date, phoneNumber: string }) => {
            return {
                dateCreated: number.dateCreated.toISOString(),
                number: number.phoneNumber,
            }
        });

    const messages = await Promise.all(numbers.map(async ({ number }) => getMessages(number)));

    return numbers.map((number: { dateCreated: Date, phoneNumber: string }, index) => {
        return {
            ...number,
            messages: messages[index]
                .map((message: { body: string, dateSent: Date }) => ({
                    body: message.body,
                    dateSent: message.dateSent.toISOString(),
                })),
        }
    })
}

export async function getMessages(phoneNumber: string) {
    return twilio.messages.list({ to: phoneNumber, limit: 100 })
}