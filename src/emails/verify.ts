const verifyEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin-top: 30px;">
  <tr>
    <td align="center" bgcolor="#ffffff" style="padding: 40px 0;">
      <h1 style="color: #ff4d4d; font-size: 28px;">Welcome to Neon!</h1>
      <p style="color: #666666;">Thank you for registering with Neon. Please verify your email address by clicking the button below:</p>
      <a href="{{VERIFICATION_LINK}}" style="display: inline-block; background-color: #00cc99; color: #ffffff; text-decoration: none; font-size: 16px; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Verify Email Address</a>
    </td>
  </tr>
</table>

<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin-top: 30px;">
  <tr>
    <td align="center" bgcolor="#ffffff" style="padding: 20px 0;">
      <p style="color: #666666;">If you did not create an account, you can safely ignore this email.</p>
    </td>
  </tr>
</table>

</body>
</html>
`;

export const getVerificationEmail = (verificationLink: string) => {
    return verifyEmail.replace('{{VERIFICATION_LINK}}', verificationLink);
};
