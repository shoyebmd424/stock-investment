exports.message=(otp)=>{
 return( `<h1>One Time password here </h1>
<p>
  I hope you are aware out privacy. This is the one time password when
  you use this password after that its useless
</p>
<h2>${otp}</h2>
<h5>Just one time verification</h5>`)
}

exports.MemberMessage = (member) => {
  return `
    <h2>Welcome to Our Platform!</h2>
    <p>Thank you for registering. Below are your login credentials and company details:</p>

    <h3>Account Information</h3>
    <ul>
      <li><strong>Email:</strong> ${member.account.email}</li>
    </ul>

    <h3>Company Details</h3>
    <ul>
      <li><strong>Company:</strong> ${member.personal.company || "Not Provided"}</li>
      <li><strong>Industry:</strong> ${member.personal.industry || "Not Provided"}</li>
    </ul>

    <h3>Login Link</h3>
    <p>You can log in using the following link:</p>
   <button style="background-color: #007bff; border: none; padding: 10px 20px; border-radius: 25px;">
  <a style="color: #ffffff; text-decoration: none; font-weight: bold;" href="${process.env.url}/?emailToken=${member?.member?.emailToken}&expiration=${member?.member?.expiration}" target="_blank" rel="noopener noreferrer">Login Here</a>
</button>
<br>
    <a style="color:"#0000FF" href="${process.env.url}/?emailToken=${member?.member?.emailToken}&expiration=${member?.member?.expiration}" target="_blank" rel="noopener noreferrer">${process.env.url}/?emailToken=${member?.member?.emailToken}&expiration=${member?.member?.expiration}</a>

    <p>Thank you for joining us, and we look forward to working together!</p>
    <p>If any of the above information is incorrect, please let us know as soon as possible.</p>
      
      <p>Best regards,</p>
      <p>Anyma</p>
  `;
};



exports.MemberMessageFromAdmin = (user) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #0066cc;">Dear ${user.firstName} ${user.lastName},</h2>
      <p>We are pleased to welcome you to our company. Here are the details we have on file for you:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Field</th>
          <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Information</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Email</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${user.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">City</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${user.city || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Date of Birth</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${user.dob || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Phone</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${user.phone || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Company</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${user.company || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Industry</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${user.industry || 'N/A'}</td>
        </tr>
      </table>
      
      <p>If any of the above information is incorrect, please let us know as soon as possible.</p>
      
      <p>Best regards,</p>
      <p>Anyma</p>
    </div>
  `;
};
