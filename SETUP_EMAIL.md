# Email Setup Guide

## 1. Create Resend Account

1. Go to https://resend.com/
2. Sign up for free account
3. Verify your email
4. Go to API Keys: https://resend.com/api-keys
5. Create a new API key
6. Copy the key (starts with `re_...`)

## 2. Add API Key to Environment

Add this line to `.env.local`:

```
RESEND_API_KEY=re_your_key_here
```

## 3. Install Dependencies

```bash
npm install resend
```

## 4. Verify Domain (Optional but Recommended)

For production use, verify your domain in Resend:
1. Go to https://resend.com/domains
2. Add your domain (e.g., `orlando-planner.com`)
3. Add DNS records they provide
4. Wait for verification

**For testing:** Use `onboarding@resend.dev` as the "from" address (sends up to 100 emails/day for testing)

## 5. Test Email

Once configured, the app will automatically:
- Send users their itinerary after generation
- Include Katie branding
- Provide a PDF-friendly format

## 6. Email Quota

Free tier:
- 100 emails/day for testing
- 3,000 emails/month after domain verification

Upgrade if you exceed these limits.

## Implementation Status

- ✅ Email API route created (`/api/send-itinerary`)
- ✅ Email template with Katie branding
- ✅ Automatic sending after itinerary generation
- ⏳ Requires Resend API key in `.env.local`

## Email Features

- Clean HTML template matching site design
- Katie avatar in header
- Formatted itinerary cards
- Links back to the site
- Mobile-friendly responsive design
