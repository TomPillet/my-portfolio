"use server";
import nodemailer from "nodemailer";
import { z } from "zod";

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.log("RECAPTCHA_SECRET_KEY n'est pas définie");
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
    console.log("Erreur lors de la vérification reCAPTCHA:", error);
    return false;
  }
}

const EmailSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  phone: z.union([
    z.string().length(0),
    z.string().regex(/^\+?[\d\s\-\(\)]{7,20}$/), // allows spaces, dashes, parentheses
    z.null(),
  ]),
  title: z.nullable(z.string()),
  message: z.string(),
});

export interface ContactForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  title: string;
  message: string;
}

interface sendEmailResponse {
  success: boolean;
  message: string;
  fields?: (string | number)[];
}

export async function sendEmail(
  data: ContactForm,
  captchaToken: string
): Promise<sendEmailResponse> {
  try {
    if (!(await verifyRecaptcha(captchaToken))) {
      return {
        success: false,
        message: "Le reCAPTCHA est invalide. Veuillez réessayer.",
      };
    }

    const validation = EmailSchema.safeParse({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      title: data.title,
      message: data.message,
    });

    if (!validation.success) {
      const fields = validation.error.issues.map((issue) => issue.path[0]);
      return {
        success: false,
        message: "Certains champs ont été mal rempli.",
        fields: fields,
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
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      replyTo: data.email,
      subject: data.title ?? `Echange avec ${data.firstname} ${data.lastname}`,
      text: `Nom: ${data.lastname}\nEmail: ${data.email}\nMessage: ${data.message}`,
      html: `
            <p><strong>Nom:</strong> ${data.lastname}</p>
            <p><strong>Prénom:</strong> ${data.firstname}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ""}
            <p><strong>Message:</strong> ${data.message}</p>
          `,
    });

    return {
      success: true,
      message:
        "L'email a été envoyé avec succès. Vous aurez une réponse dans les plus brefs delais !",
    };
  } catch (error) {
    console.log("Email error:", error);
    return {
      success: false,
      message: "Erreur lors de l'envoi de l'email.",
    };
  }
}
