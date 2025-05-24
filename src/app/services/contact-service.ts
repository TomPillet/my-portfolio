import emailjs from "@emailjs/browser";

export class ContactService {
  static async sendEmail(data: FormData): Promise<boolean> {
    emailjs.init({ publicKey: process.env.EMAILJS_PUBLIC_KEY });

    const templateParams = {
      title: data.get("title"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      entreprise: data.get("entreprise"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
      "g-recaptcha-response": data.get("g-recaptcha-response"),
    };

    let success = false;
    emailjs
      .send(
        process.env.EMAILJS_SERVICE_ID as string,
        process.env.EMAILJS_TEMPLATE_ID as string,
        templateParams
      )
      .then(() => {
        success = true;
      });

    return success;
  }
}
