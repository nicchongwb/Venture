import { prisma } from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import qrcode from "qrcode";
import base32Encode from "base32-encode";
import crypto from "crypto";
import util from "util";
import nodemailer from "nodemailer";
import argon2 from "argon2";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  async function generateQR() {
    const buffer = await util.promisify(crypto.randomBytes)(14);
    const mfaSecret = base32Encode(buffer, "RFC4648", { padding: false });
    return mfaSecret;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // send email to given email
  let error;
  const accountData = JSON.parse(req.body);
  accountData.mfaSecret = await generateQR();
  const issuer = "Let's Venture";
  const algorithm = "SHA1";
  const digits = "6";
  const period = "30";
  const otpType = "totp";
  const configUri = `otpauth://${otpType}/${issuer}:${accountData.email}?algorithm=${algorithm}&digits=${digits}&period=${period}&issuer=${issuer}&secret=${accountData.mfaSecret}`;

  accountData.password = await argon2.hash(accountData.password, {
      type: argon2.argon2id,
      parallelism: 2,
      memoryCost: 2 ** 14,
  });

  try {
    const savedAccount = await prisma.user.create({
      data: accountData,
    });

    // send the image to email
    qrcode.toDataURL(configUri).then((img) => {
      let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
          // these has to be in .env
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_SECRET,
        },
      });
      let mailOptions = {
        from: "letsventurecsd@outlook.com",
        to: accountData.email,
        subject: "Venture 2FA set up",
        //text: 'Please use an authenticator app and set up 2FA',
        attachDataUrls: true,//to accept base64 content in messsage
        html: 'Please use an authenticator app and scan this QR code to complete the registeration process </br><img src="' +img+'">',
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Registeration unsuccessful");
          console.log("Registeration unsuccessful" + error);
        }
      });
    });
    
    res.json(200);
  } catch (e) {
    error = "Email already exists";
    res.json(error);
  }
}; 
