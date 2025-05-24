"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: FormData) {
  try {
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const entreprise = formData.get("entreprise") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;

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
      from: process.env.MAIL_FROM,
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
    console.error("Email error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
