/**
 * Contact form submission with validation and email sending via Resend
 */
'use server';
import {z} from 'zod';
import { Resend } from 'resend';

const formDataSchema = z.object({ 
    name: z.string().min(1, { message: "Name is required." }).max(100, { message: "Name is too long." }).trim(),
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Invalid email address." }).trim(),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(1000, { message: "Description is too long." }).trim(),
    captcha: z.string().min(1, { message: "Please solve the security check." }),
    captchaAnswer: z.string().min(1, { message: "Captcha answer is missing." }),
    honeypot: z.string().max(0, { message: "Spam detected." }).optional(), // Honeypot field for spam protection
    isSuccess: z.string().optional(),
});

export async function submitContactForm(prevState: unknown, formData: FormData) {    
    const parsedData = formDataSchema.safeParse(Object.fromEntries(formData));

    if (!parsedData.success) {
       return {
        errors: parsedData.error.flatten().fieldErrors,
        };
    }

    const { name, email, description, captcha, captchaAnswer, honeypot } = parsedData.data;

    // Honeypot check - if filled, it's likely a bot
    if (honeypot && honeypot.length > 0) {
        return {
            errors: {
                isSuccess: ["Spam detected. Please try again."]
            }
        };
    }

    // Captcha validation
    const userAnswer = parseInt(captcha, 10);
    const correctAnswer = parseInt(captchaAnswer, 10);
    
    if (isNaN(userAnswer) || userAnswer !== correctAnswer) {
        return {
            errors: {
                captcha: ["Incorrect answer. Please try again."]
            }
        };
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = name.replace(/[<>]/g, '').trim();
    const sanitizedEmail = email.replace(/[<>]/g, '').trim();
    const sanitizedDescription = description.replace(/[<>]/g, '').trim();

    try {
        // Check if API key is set
        const apiKey = process.env.RESEND_API_KEY;
        
        if (!apiKey) {
            console.error('RESEND_API_KEY is not set in environment variables');
            return {
                errors: {
                    isSuccess: ["Email service is not configured. Please contact the administrator."]
                }
            };
        }

        // Initialize Resend
        const resend = new Resend(apiKey);

        // Get the from email address from environment variable or use default
        // For localhost testing: You can verify any domain you own in Resend dashboard
        // For production: Set RESEND_FROM_EMAIL in .env.local to your verified domain email
        // Example: RESEND_FROM_EMAIL="Contact Form <noreply@yourdomain.com>"
        // Try different formats if one doesn't work
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

        // Send email using Resend
        const { error } = await resend.emails.send({
            from: fromEmail, // Use verified domain email from environment variable
            to: ['shomenmuhury@yahoo.com'],
            replyTo: sanitizedEmail,
            subject: `Contact Form Submission from ${sanitizedName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
                    </div>
                    <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #7c3aed; margin: 20px 0;">
                        <h3 style="color: #374151; margin-top: 0;">Message:</h3>
                        <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${sanitizedDescription.replace(/\n/g, '<br>')}</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                    <p style="color: #6b7280; font-size: 12px; text-align: center;">
                        This email was sent from the contact form on your website.
                    </p>
                </div>
            `,
            text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedDescription}

---
This email was sent from the contact form on your website.
            `,
        });

        if (error) {
            console.error('Resend error:', error.message || error);
            
            // Provide more specific error message based on actual error
            let errorMessage = "Failed to send email. Please try again later.";
            
            if (error.message) {
                const msg = error.message.toLowerCase();
                
                if (msg.includes('api key') || msg.includes('unauthorized') || msg.includes('invalid key')) {
                    errorMessage = "Invalid API key. Please check your Resend API key in .env.local";
                } else if (msg.includes('domain') || msg.includes('from') || msg.includes('not verified') || msg.includes('unverified')) {
                    errorMessage = `Domain not verified. The 'from' email address (${fromEmail}) needs to use a verified domain. Please verify a domain in Resend dashboard at https://resend.com/domains`;
                } else if (msg.includes('rate limit') || msg.includes('too many')) {
                    errorMessage = "Rate limit exceeded. Please try again later.";
                } else {
                    errorMessage = `Email error: ${error.message}`;
                }
            }
            
            return {
                errors: {
                    isSuccess: [errorMessage]
                }
            };
        }

        return {
            success: {
                isSuccess: ["Thank you for contacting us! We'll get back to you soon."]
            }
        };
    } catch (error) {
        console.error('Contact form error:', error);
        return {
            errors: {
                isSuccess: ["Failed to process form. Please try again later."]
            }
        };
    }
}
