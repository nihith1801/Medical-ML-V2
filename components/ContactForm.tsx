'use client'

import React, { useRef, useState } from 'react';
import { sendEmail } from '@/lib/emailService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

export const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (form.current) {
      const formData = new FormData(form.current);
      const templateParams = {
        user_name: formData.get('user_name'),
        user_email: formData.get('user_email'),
        message: formData.get('message'),
      };

      try {
        await sendEmail(templateParams);
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully.",
        });
        form.current.reset();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="user_name">Name</Label>
        <Input type="text" id="user_name" name="user_name" required />
      </div>
      <div>
        <Label htmlFor="user_email">Email</Label>
        <Input type="email" id="user_email" name="user_email" required />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
};

