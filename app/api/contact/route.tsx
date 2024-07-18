import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the request body
    const { name, email, message } = body;
    if (!name || !email || !message) {
      console.error('Validation error: Missing fields');
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Set up Nodemailer transporter with app-specific password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Use the app-specific password here
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER, // This is the email where you will receive the messages
      subject: `Contact form submission from ${name}`,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in sending email:', error);
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
  }
}
