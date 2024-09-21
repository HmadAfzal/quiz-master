'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormField,FormItem,FormLabel,FormMessage,} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schema/signup-schema';
import { useToast } from '@/hooks/use-toast';

export default function SignupForm() {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/sign-up', data);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace('/sign-in');

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      toast({
        title: 'Sign Up Failed',
        description: 'errorMessage',
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        name="username"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <Input
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="email"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Input {...field} name="email" />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="password"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...field} name="password" />
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className='w-full' disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          'Sign Up'
        )}
      </Button>
    </form>
  </Form>

  )
}