import nodemailer from "nodemailer";

const fallbackRecipient = "khanfarrukh200@gmail.com";

const fieldLimits = {
  name: 120,
  email: 160,
  subject: 180,
  message: 4000,
};

function cleanField(value, limit) {
  return String(value || "").trim().slice(0, limit);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateForm({ name, email, subject, message }) {
  const errors = {};

  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email.";
  if (!subject) errors.subject = "Subject is required.";
  if (!message) errors.message = "Message is required.";
  if (message && message.length < 20) errors.message = "Message should be at least 20 characters.";

  return errors;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const payload = body && typeof body === "object" ? body : {};

  const form = {
    name: cleanField(payload.name, fieldLimits.name),
    email: cleanField(payload.email, fieldLimits.email),
    subject: cleanField(payload.subject, fieldLimits.subject),
    message: cleanField(payload.message, fieldLimits.message),
  };

  const errors = validateForm(form);

  if (Object.keys(errors).length > 0) {
    return Response.json({ message: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const toEmail = process.env.CONTACT_TO_EMAIL || fallbackRecipient;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail) {
    return Response.json({ message: "Email service is not configured yet." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const safe = {
    name: escapeHtml(form.name),
    email: escapeHtml(form.email),
    subject: escapeHtml(form.subject),
    message: escapeHtml(form.message).replace(/\n/g, "<br />"),
  };

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${fromEmail}>`,
      to: toEmail,
      replyTo: form.email,
      subject: `Portfolio inquiry: ${form.subject}`,
      text: [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Subject: ${form.subject}`,
        "",
        form.message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin: 0 0 16px;">New portfolio contact message</h2>
          <p><strong>Name:</strong> ${safe.name}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Subject:</strong> ${safe.subject}</p>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="white-space: normal;">${safe.message}</p>
          </div>
        </div>
      `,
    });

    return Response.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact email failed:", error);
    return Response.json({ message: "Unable to send message right now." }, { status: 500 });
  }
}
