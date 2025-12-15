import nodemailer from "nodemailer";

export async function sendEmail(senderEmail, receiveEmail, name, date) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAILUSER} `,
        pass: `${process.env.EMAILPASS}`,
      },
    });

    const mailOptions = {
      from: `"GearTrack System" <${senderEmail}>`,
      to: receiveEmail,
      subject: "Staff Reservation Request",
      text: `Hello ${name || "staff"},
      
You have been requested for a staff reservation on this date: ${date}.
Please confirm your availability.

Best regards,
GearTrack Team`,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
