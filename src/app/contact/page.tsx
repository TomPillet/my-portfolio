"use client";
import React from "react";
import emailjs from "@emailjs/browser";
import {
  Box,
  Button,
  Container,
  Field,
  Flex,
  Grid,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Form from "next/form";

export default function Contact() {
  const sendEmail = (formData: FormData) => {
    const templateParams = {
      title: formData.get("title"),
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      entreprise: formData.get("entreprise"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    console.log(
      "check emailjs env vars",
      process.env.EMAILJS_PUBLIC_KEY,
      process?.env?.EMAILJS_SERVICE_ID,
      process?.env?.EMAILJS_TEMPLATE_ID
    );

    emailjs
      .send(
        process?.env?.EMAILJS_SERVICE_ID as string,
        process?.env?.EMAILJS_TEMPLATE_ID as string,
        templateParams,
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
        }
      )
      .then(() => {
        console.log("success");
        // TODO: handle success
      })
      .catch((error) => {
        console.log(error);
        // TODO: handle error
      });
  };

  return (
    <Container maxW="7xl">
      <Flex
        minH="100dvh"
        w="full"
        justifyContent="center"
        alignItems="center"
        flexDir={"column"}
      >
        <Heading as="h1" variant={"mainTitle"} mb={8}>
          Contactez-moi
        </Heading>
        <Form action={sendEmail}>
          <Grid
            gridTemplateAreas={`"firstname lastname" "entreprise entreprise" "email phone" "title title" "message message" "captcha captcha" "submit submit"`}
            gap={6}
            p={6}
            justifyItems={"center"}
          >
            <Field.Root gridArea={"firstname"} required>
              <Field.Label>
                Prénom <Field.RequiredIndicator />
              </Field.Label>
              <Input name="firstname" variant="flushed" />
              <Field.ErrorText>
                Merci d{"'"}indiquer votre prénom.
              </Field.ErrorText>
            </Field.Root>
            <Field.Root gridArea={"lastname"} required>
              <Field.Label>
                Nom <Field.RequiredIndicator />
              </Field.Label>
              <Input name="lastname" variant="flushed" />
              <Field.ErrorText>Merci d{"'"}indiquer votre nom.</Field.ErrorText>
            </Field.Root>
            <Field.Root gridArea={"entreprise"}>
              <Field.Label>Entreprise </Field.Label>
              <Input name="entreprise" variant="flushed" />
            </Field.Root>
            <Field.Root gridArea={"email"} required>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input name="email" type="email" variant="flushed" />
              <Field.ErrorText>
                Une adresse mail valide est requise.
              </Field.ErrorText>
            </Field.Root>
            <Field.Root gridArea={"phone"}>
              <Field.Label>Téléphone</Field.Label>
              <Input name="phone" variant="flushed" />
            </Field.Root>
            <Field.Root gridArea={"title"} required>
              <Field.Label>
                Objet <Field.RequiredIndicator />
              </Field.Label>
              <Input name="title" variant="flushed" />
              <Field.ErrorText>Un objet de message est requis.</Field.ErrorText>
            </Field.Root>
            <Field.Root gridArea={"message"} required>
              <Field.Label>
                Message <Field.RequiredIndicator />
              </Field.Label>
              <Textarea name="message" variant="flushed" />
              <Field.ErrorText>
                Il serait dommage de ne pas laisser de message !
              </Field.ErrorText>
            </Field.Root>
            <Box
              as="div"
              className="g-recaptcha"
              data-sitekey={process.env.RECAPTCHA_PUBLIC_KEY}
              data-callback={(res: any) => console.log("coucou", res)}
              gridArea={"captcha"}
            ></Box>
            <Button gridArea={"submit"} w={"1/2"} type="submit">
              Envoyer
            </Button>
          </Grid>
        </Form>
      </Flex>
    </Container>
  );
}
