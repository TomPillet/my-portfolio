import emailjs from "@emailjs/browser";

export class ContactService {
  static async sendEmail(data: FormData): Promise<boolean> {
    const templateParams = {
      title: data.get("title"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      entreprise: data.get("entreprise"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    };

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    let success = false;
    emailjs
      .send(
        serviceId as string,
        templateId as string,
        templateParams,
        publicKey
      )
      .then(() => {
        success = true;
      });

    return success;
  }
}
