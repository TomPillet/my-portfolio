"use server";
import nodemailer from "nodemailer";

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY n'est pas définie");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data: RecaptchaResponse = await response.json();
    return data.success;
  } catch (error) {
    console.error("Erreur lors de la vérification reCAPTCHA:", error);
    return false;
  }
}

export async function sendEmail(formData: FormData) {
  try {
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const entreprise = formData.get("entreprise") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;
    const captcha = formData.get("g-recaptcha-response") as string;

    if (!captcha) {
      return { success: false, error: "Veuillez compléter le reCAPTCHA." };
    }

    const isCaptchaValid = await verifyRecaptcha(captcha);
    if (!isCaptchaValid) {
      return {
        success: false,
        error: "Le reCAPTCHA est invalide. Veuillez réessayer.",
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_TO,
      subject: title,
      text: `Nom: ${lastname}\nEmail: ${email}\nMessage: ${message}`,
      html: `
            <h3>Contact Form Submission</h3>
            <p><strong>Nom:</strong> ${lastname}</p>
            <p><strong>Prénom:</strong> ${firstname}</p>
            ${entreprise.length > 0 ? `<p><strong>Entreprise:</strong> ${entreprise}</p>` : ""}
            <p><strong>Email:</strong> ${email}</p>
            ${phone.length > 0 ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ""}
            <p><strong>Message:</strong> ${message}</p>
          `,
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur envoi d'email:", error);
    return { success: false, error: "Erreur lors de l'envoi de l'email." };
  }
}
