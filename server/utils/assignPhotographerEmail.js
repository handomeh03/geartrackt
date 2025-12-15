import nodemailer from "nodemailer";

export async function sendEmailForPhotographer(senderEmail, receiveEmail, name, date,location,clientName,companyName,contactInfo,note) {
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
  subject: "Photoshoot Reservation Assignment",
  text: `Hello ${name || "Photographer"},

You have been assigned to a new photoshoot booking.

📅 Date: ${date}
📍 Location: ${location || "Not specified"}
👤 Client Name: ${clientName || "N/A"}
🏢 Company: ${companyName || "N/A"}
📞 Contact: ${contactInfo || "N/A"}
📝 Notes: ${note || "No additional notes"}

Please confirm your availability as soon as possible.

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
