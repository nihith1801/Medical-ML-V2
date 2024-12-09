import emailjs from 'emailjs-com';

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

export const sendEmail = async (templateParams: Record<string, unknown>, maxRetries = 3): Promise<void> => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
      });
      console.log('Email sent successfully:', response);
      return;
    } catch (error) {
      console.error(`Error sending email (attempt ${retries + 1}):`, error);
      retries++;
      if (retries === maxRetries) {
        throw new Error('Max retries reached. Failed to send email.');
      }
      // Wait for 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

