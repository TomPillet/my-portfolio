"use client";
import React, { useId, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Box,
  Container,
  Field,
  Flex,
  Grid,
  Heading,
  Icon,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { toaster } from "@/components/ui/toaster";
import { ContactForm, sendEmail } from "../actions/contact";
import Form from "next/form";
import Link from "next/link";
import CustomButton from "@/components/ui/CustomButton";

export default function Contact() {
  const loadingToasterId = useId();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [savedFormData, setSavedFormData] = useState<ContactForm>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    title: "",
    message: "",
  });

  const isFieldInvalid = (field: string) => invalidFields.has(field);

  const handleSendEmail = async (formData: FormData) => {
    const { firstname, lastname, email, phone, title, message, captcha } =
      Object.fromEntries(
        [
          "firstname",
          "lastname",
          "email",
          "phone",
          "title",
          "message",
          "g-recaptcha-response",
        ].map((key) => [
          key === "g-recaptcha-response" ? "captcha" : key,
          formData.get(key) as string,
        ])
      ) as Record<string, string>;

    const newData = {
      firstname,
      lastname,
      email,
      phone,
      title,
      message,
    };
    setSavedFormData(newData);

    if (!captcha) {
      toaster.create({
        title: "Impossible d'envoyer le message !",
        description: "Veuillez valider le reCAPTCHA.",
        type: "error",
        duration: 6000,
      });
      return;
    }

    toaster.loading({
      id: loadingToasterId,
      title: "Le message est en cours d'envoi...",
    });
    await sendEmail(newData, captcha).then((res) => {
      toaster.remove(loadingToasterId);
      if (res.success) {
        toaster.create({
          title: "Message bien envoyé !",
          description: res.message,
          type: "success",
          duration: 10000,
        });
        setSavedFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          title: "",
          message: "",
        });
      } else {
        if (res.fields) {
          setInvalidFields(new Set(res.fields.toString()));
        }
        toaster.create({
          title: "Erreur lors de l'envoi du message !",
          description: res.message,
          type: "error",
          duration: 6000,
        });
      }
    });
  };

  return (
    <Container maxW="7xl">
      <Flex
        py={{ lg: "120px", base: "100px" }}
        minH="100dvh"
        w="full"
        justifyContent="center"
        alignItems="center"
        flexDir={"column"}
        gap={8}
      >
        <Flex flexDir={"column"}>
          <Heading as="h1" variant={"mainTitle"} mb={{ md: 8, base: 4 }}>
            Pour me contacter :
          </Heading>
          <Form action={handleSendEmail}>
            <Grid
              gridColumn={"1fr 1fr"}
              gridTemplateAreas={`"firstname lastname" "email phone" "title title" "message message" "captcha captcha" "submit submit"`}
              gap={6}
              p={6}
              justifyItems={"center"}
            >
              <Field.Root
                gridArea={"firstname"}
                required
                invalid={isFieldInvalid("firstname")}
              >
                <Field.Label>
                  Prénom <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="firstname"
                  variant="flushed"
                  defaultValue={savedFormData.firstname}
                />
                <Field.ErrorText>
                  Merci d{"'"}indiquer votre prénom.
                </Field.ErrorText>
              </Field.Root>
              <Field.Root
                gridArea={"lastname"}
                required
                invalid={isFieldInvalid("lastname")}
              >
                <Field.Label>
                  Nom <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="lastname"
                  variant="flushed"
                  defaultValue={savedFormData.lastname}
                />
                <Field.ErrorText>
                  Merci d{"'"}indiquer votre nom.
                </Field.ErrorText>
              </Field.Root>
              <Field.Root
                gridArea={"email"}
                required
                invalid={isFieldInvalid("email")}
              >
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="email"
                  type="email"
                  variant="flushed"
                  defaultValue={savedFormData.email}
                />
                <Field.ErrorText>
                  Une adresse mail valide est requise.
                </Field.ErrorText>
              </Field.Root>
              <Field.Root gridArea={"phone"} invalid={isFieldInvalid("phone")}>
                <Field.Label>Téléphone</Field.Label>
                <Input
                  name="phone"
                  variant="flushed"
                  defaultValue={savedFormData.phone}
                  placeholder="Ex : 0123456789"
                  _placeholder={{ fontStyle: "italic" }}
                />
                <Field.ErrorText textWrap={"wrap"}>
                  Numéro de téléphone invalide.
                </Field.ErrorText>
              </Field.Root>
              <Field.Root gridArea={"title"}>
                <Field.Label>Objet</Field.Label>
                <Input
                  type="text"
                  name="title"
                  variant="flushed"
                  defaultValue={savedFormData.title}
                  placeholder='Par défaut : "Echange avec [prénom] [nom]"'
                  _placeholder={{ fontStyle: "italic" }}
                />
              </Field.Root>
              <Field.Root
                gridArea={"message"}
                required
                invalid={isFieldInvalid("message")}
              >
                <Field.Label>
                  Message <Field.RequiredIndicator />
                </Field.Label>
                <Textarea
                  name="message"
                  variant="flushed"
                  defaultValue={savedFormData.message}
                />
                <Field.ErrorText>
                  Il serait dommage de ne pas laisser de message !
                </Field.ErrorText>
              </Field.Root>
              <Box gridArea={"captcha"}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.RECAPTCHA_PUBLIC_KEY! as string}
                />
              </Box>
              <CustomButton gridArea={"submit"} w={"1/2"} type="submit">
                Envoyer
              </CustomButton>
            </Grid>
          </Form>
        </Flex>
        <Flex flexDir={"column"}>
          <Heading as="h2" variant={"secondTitle"} mb={8}>
            Et retrouvez-moi sur :
          </Heading>
          <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
            <Link target="_blank" href="https://github.com/TomPillet">
              <CustomButton>
                <Icon as={FaGithub} />
              </CustomButton>
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/tom-pillet/"
            >
              <CustomButton>
                <Icon as={FaLinkedin} />
              </CustomButton>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
