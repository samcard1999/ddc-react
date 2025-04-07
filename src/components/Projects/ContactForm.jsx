"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "../ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "../ui/input.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { Toaster, toast } from "sonner";
import ContactButton from "./ContactButton.jsx";
import SendButton from "./SendButton.jsx";
import { useLocation } from "react-router-dom";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  email: z.string().email("Invalid email address.").min(2, {
    message: "Email must be at least 2 characters."
  }),
  message: z.string().min(10, {
    message: "Message should be at least 10 characters."
  })
});

export function ContactForm() {
  const formRef = useRef(null);
  const location = useLocation();
  // configure Zod default values for the form
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data) => {
    const extraMessage = `It looks like this client is interested in ${location.pathname
      .split("/")
      .pop()}. Here is his message:\n`;
    const messageField = formRef.current.message;
    messageField.value = extraMessage + messageField.value;
    if (formRef.current) {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formRef.current,
          {
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          }
        )
        .then(
          () => {
            form.reset(); //clear the fields after submission
            toast.success("Email sent", {
              description: "Thanks, we'll be in touch."
            });
          },
          (error) => {
            toast.error("Failed to send. Check your internet connection.");
            console.warn("FAILED...", JSON.stringify(error));
          }
        );
    }
  };

  return (
    <Dialog className="bg-slate-800">
      <DialogTrigger>
        <ContactButton className="contact-button" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dialog h-auto !p-6">
        <DialogHeader>
          <DialogTitle className="dialog-title text-[#070f1d] text-8xl">
            Contact Us
          </DialogTitle>
          <DialogDescription className="text-[#070f1d]">
            We’d be delighted to read your message and get back to you as soon
            as possible!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            ref={formRef} //Required by EmailJS
            onSubmit={form.handleSubmit(onSubmit)}
            className=" !space-y-6"
          >
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-[#070f1d]">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary bg-white"
                      placeholder="Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-[#070f1d]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary bg-white"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-[#070f1d]">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-primary bg-white field-sizing-fixed"
                      placeholder="Type your message here."
                      id="message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <SendButton type="submit" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
