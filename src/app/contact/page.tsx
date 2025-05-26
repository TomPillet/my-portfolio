"use client";
import React, { useId } from "react";
import {
  Box,
  Button,
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
import { sendEmail } from "../actions/contact";
import Form from "next/form";
import Link from "next/link";
import CustomButton from "@/components/ui/CustomButton";

export default function Contact() {
  const loadingToasterId = useId();
  const [isFirstnameInvalid, setIsFirstnameInvalid] = React.useState(false);
  const [isLastnameInvalid, setIsLastnameInvalid] = React.useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false);
  const [isPhoneInvalid, setIsPhoneInvalid] = React.useState(false);
  const [isMessageInvalid, setIsMessageInvalid] = React.useState(false);

  const handleSendEmail = async (formData: FormData) => {
    toaster.loading({
      id: loadingToasterId,
      title: "Le message est en cours d'envoi...",
    });
    await sendEmail(formData).then((res) => {
      toaster.remove(loadingToasterId);
      if (res.success) {
        toaster.create({
          title: "Message bien envoyé !",
          description: res.message,
          type: "success",
        });
      } else {
        if (res.fields) {
          for (const field of res.fields) {
            switch (field) {
              case "firstname":
                setIsFirstnameInvalid(true);
                break;
              case "lastname":
                setIsLastnameInvalid(true);
                break;
              case "email":
                setIsEmailInvalid(true);
                break;
              case "phone":
                setIsPhoneInvalid(true);
                break;
              case "message":
                setIsMessageInvalid(true);
                break;
            }
          }
        }

        toaster.create({
          title: "Erreur lors de l'envoi du message !",
          description: res.message,
          type: "error",
        });
      }
    });
  };

  return (
    <Container maxW="7xl">
      <Flex
        py={"120px"}
        minH="100dvh"
        w="full"
        justifyContent="center"
        alignItems="center"
        flexDir={"column"}
        gap={8}
      >
        <Flex flexDir={"column"}>
          <Heading as="h1" variant={"mainTitle"} mb={8}>
            Contactez-moi
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
                invalid={isFirstnameInvalid}
              >
                <Field.Label>
                  Prénom <Field.RequiredIndicator />
                </Field.Label>
                <Input name="firstname" variant="flushed" />
                <Field.ErrorText>
                  Merci d{"'"}indiquer votre prénom.
                </Field.ErrorText>
              </Field.Root>
              <Field.Root
                gridArea={"lastname"}
                required
                invalid={isLastnameInvalid}
              >
                <Field.Label>
                  Nom <Field.RequiredIndicator />
                </Field.Label>
                <Input name="lastname" variant="flushed" />
                <Field.ErrorText>
                  Merci d{"'"}indiquer votre nom.
                </Field.ErrorText>
              </Field.Root>
              <Field.Root gridArea={"email"} required invalid={isEmailInvalid}>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input name="email" type="email" variant="flushed" />
                <Field.ErrorText>
                  Une adresse mail valide est requise.
                </Field.ErrorText>
              </Field.Root>
              <Field.Root gridArea={"phone"} invalid={isPhoneInvalid}>
                <Field.Label>Téléphone</Field.Label>
                <Input
                  name="phone"
                  variant="flushed"
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
                  placeholder='Par défaut : "Echange avec [prénom] [nom]"'
                  _placeholder={{ fontStyle: "italic" }}
                />
              </Field.Root>
              <Field.Root
                gridArea={"message"}
                required
                invalid={isMessageInvalid}
              >
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
                gridArea={"captcha"}
              ></Box>
              <CustomButton gridArea={"submit"} w={"1/2"} type="submit">
                Envoyer
              </CustomButton>
            </Grid>
          </Form>
        </Flex>
        <Flex flexDir={"column"}>
          <Heading as="h2" variant={"secondTitle"} mb={8}>
            Et retrouvez-moi sur...
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
