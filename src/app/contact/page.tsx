"use client"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button, Container, Field, Flex, Grid, Heading, Input, Textarea } from '@chakra-ui/react';
import Form from 'next/form';

import { GetStaticProps } from 'next';

export default function Contact () {
  const sendEmail = (formData: FormData) => {
    const templateParams = {
      title: formData.get('title'),
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      entreprise: formData.get('entreprise'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    emailjs
      .send(process?.env?.EMAILJS_CONTACT_SERVICE_ID as string, process?.env?.EMAILJS_CONTACT_TEMPLATE_ID as string, templateParams, {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
  };

  return (
    <Container maxW="container.xl">
      <Flex h="fit" w="full" justifyContent="center" alignItems="center" flexDir={"column"} gap={12}>
        <Heading as="h1" fontSize={"6xl"} textAlign={"center"}>Contactez-moi</Heading>
        <Form action={sendEmail}>
          <Grid gridTemplateAreas={`"title title" "firstname lastname" "entreprise entreprise" "email phone" "message message" "submit submit" `} gap={6} p={6} justifyItems={"center"}>
          <Field.Root gridArea={"title"}>
            <Field.Label>Objet <Field.RequiredIndicator /></Field.Label>
            <Input name="title" variant="flushed"/>
            <Field.ErrorText>Un objet est requis</Field.ErrorText>
          </Field.Root>
          <Field.Root gridArea={"firstname"}>
            <Field.Label>Prénom <Field.RequiredIndicator /></Field.Label>
            <Input name="firstname" variant="flushed"/>
            <Field.ErrorText>Merci d'indiquer votre prénom</Field.ErrorText>
          </Field.Root>
          <Field.Root gridArea={"lastname"}>
            <Field.Label>Nom <Field.RequiredIndicator /></Field.Label>
            <Input name="lastname" variant="flushed"/>
            <Field.ErrorText>Merci d'indiquer votre nom</Field.ErrorText>
          </Field.Root>
          <Field.Root gridArea={"entreprise"}>
            <Field.Label>Entreprise </Field.Label>
            <Input name="entreprise" variant="flushed"/>
          </Field.Root>
          <Field.Root gridArea={"email"}>
            <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
            <Input name="email" type='email' variant="flushed"/>
            <Field.ErrorText>Une adresse mail est requise</Field.ErrorText>
          </Field.Root>
          <Field.Root gridArea={"phone"}>
            <Field.Label>Téléphone </Field.Label>
            <Input name="phone" variant="flushed" />
          </Field.Root>
          <Field.Root gridArea={"message"}>
            <Field.Label>Message <Field.RequiredIndicator /></Field.Label>
            <Textarea name="message" variant="flushed"/>
            <Field.ErrorText>Il serait dommage de ne pas laisser de message :)</Field.ErrorText>
          </Field.Root>
          <Button gridArea={"submit"} w={"1/2"} type="submit">Envoyer</Button>
          </Grid>
        </Form>
      </Flex>
    </Container>
  );
};