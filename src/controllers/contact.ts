import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { createTransport } from "nodemailer";

export const sendMessage: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Please fill in all the fields");
    }

    const name = (req.body as { name: string }).name;
    const email = (req.body as { email: string }).email;
    const message = (req.body as { message: string }).message;

    const transporter = createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: `"Michael Messages" <${process.env.EMAIL_USER}>`, // sender address
      to: "michaelrendallmail@gmail.com", // list of receivers
      subject: `New Message From ${name}`, // Subject line
      text: `Name: ${name} Email: ${email} Message: ${message}`, // plain text body
      html: `<p><b>Name</b>: ${name}</p><p><b>Email</b>: ${email}</p><p><b>Message</b>: ${message}</p>`, // html body
    });

    res.status(201).json({
      message: "message sent",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
