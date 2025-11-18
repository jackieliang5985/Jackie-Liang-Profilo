# Contact Form Integration Guide

The contact form currently uses a `mailto:` link to open the default email client. For a production portfolio, you'll want to integrate with a proper email service. Here are several options:

## Option 1: Formspree (Easiest - Recommended)

Formspree is a form backend service that's perfect for static sites.

### Setup:

1. **Sign up at [formspree.io](https://formspree.io)**
2. **Create a new form** and get your form endpoint
3. **Update `components/Contact.tsx`**:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setStatus('sending')

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })

    if (response.ok) {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
    }
  } catch (error) {
    setStatus('error')
  }
}
```

**Pricing**: Free tier includes 50 submissions/month

---

## Option 2: EmailJS

EmailJS allows you to send emails directly from the client without a backend.

### Setup:

1. **Sign up at [emailjs.com](https://www.emailjs.com)**
2. **Create an email service** (Gmail, Outlook, etc.)
3. **Install EmailJS**:
   ```bash
   npm install @emailjs/browser
   ```
4. **Update `components/Contact.tsx`**:

```typescript
import emailjs from '@emailjs/browser'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setStatus('sending')

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'
    )
    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 3000)
  } catch (error) {
    setStatus('error')
  }
}
```

**Pricing**: Free tier includes 200 emails/month

---

## Option 3: Next.js API Route + Nodemailer

Create your own email API endpoint.

### Setup:

1. **Install Nodemailer**:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Create `app/api/contact/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Configure your email service (Gmail, SendGrid, etc.)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
```

3. **Add environment variables**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   CONTACT_EMAIL=your-contact@email.com
   ```

4. **Update `components/Contact.tsx`**:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setStatus('sending')

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
    }
  } catch (error) {
    setStatus('error')
  }
}
```

---

## Option 4: Resend (Modern Alternative)

Resend is a modern email API for developers.

### Setup:

1. **Sign up at [resend.com](https://resend.com)**
2. **Get your API key**
3. **Create `app/api/contact/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
```

4. **Add environment variable**:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   CONTACT_EMAIL=your-email@example.com
   ```

**Pricing**: Free tier includes 3,000 emails/month

---

## Recommendation

For a portfolio site, **Formspree** or **EmailJS** are the easiest options since they don't require a backend. If you want more control and already have a Next.js API route setup, use **Resend** or **Nodemailer**.

---

## Error Handling

Don't forget to add error handling UI. Update the button in `Contact.tsx`:

```typescript
{status === 'sending'
  ? 'Sending...'
  : status === 'success'
  ? 'Message Sent! ✓'
  : status === 'error'
  ? 'Error - Try Again'
  : 'Send Message'}
```

And show an error message:

```typescript
{status === 'error' && (
  <p className="text-red-600 dark:text-red-400 text-sm mt-2">
    Failed to send message. Please try again or email directly.
  </p>
)}
```

