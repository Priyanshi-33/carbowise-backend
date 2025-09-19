// Temporary: log email instead of sending
const sendEmail = async ({ to, subject, html }) => {
  console.log("📧 Email would be sent to:", to);
  console.log("Subject:", subject);
  console.log("Content:", html);
};

export default sendEmail;
