import twilio from "twilio";
import config from "../config/config.js";

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

export const sendVerificationSms = async (phone: string, code: string) => {
  try {
    const msg = await client.messages.create({
      body: `Your HirePort verification code is: ${code}`,
      from: config.TWILIO_PHONE,
      to: phone,
    });
    console.log("✅ SMS sent:", msg.sid);
    return msg;
  } catch (error) {
    console.error("❌ Error sending SMS:", error);
    throw error;
  }
};
