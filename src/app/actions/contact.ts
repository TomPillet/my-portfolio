"use server";

import { ContactService } from "../services/contact-service";

export async function sendEmail(data: FormData) {
  return await ContactService.sendEmail(data);
}
