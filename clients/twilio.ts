const twilio = require('twilio');
const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const client = new twilio(accountSid, authToken);

export default client