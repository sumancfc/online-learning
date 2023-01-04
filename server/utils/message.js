exports.verifyEmailMessage = (name, userId) => {
  return `<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f5f6fa;">
<center style="width: 100%; background-color: #f5f6fa;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f6fa">
          <tr>
             <td style="padding: 40px 0;">
                  <table style="width:100%;max-width:620px;margin:0 auto;background-color:#ffffff;">
                      <tbody>
                          <tr>
                              <td style="padding: 30px 30px 15px 30px;">
                                  <h2 style="font-size: 18px; color: #6576ff; font-weight: 600; margin: 0;">Confirm Your E-Mail Address</h2>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 0 30px 20px">
                                  <p style="margin-bottom: 10px;">Hi ${name}</p>
                                  <p style="margin-bottom: 10px;">Welcome! <br> You are receiving this email because you have registered on our site.</p>
                                  <p style="margin-bottom: 10px;">Click the link below to active your account.</p>
                                  <p style="margin-bottom: 25px;">This link will expire in 15 minutes and can only be used once.</p>
                                  <a href="http://localhost:3000/emailVerify/${userId}" style="background-color:#6576ff;border-radius:4px;color:#ffffff;display:inline-block;font-size:13px;font-weight:600;line-height:44px;text-align:center;text-decoration:none;text-transform: uppercase; padding: 0 30px">Verify Email</a>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 0 30px">
                                  <h4 style="font-size: 15px; color: #000000; font-weight: 600; margin: 0; text-transform: uppercase; margin-bottom: 10px">or</h4>
                                  <p style="margin-bottom: 10px;">If the button above does not work, paste this link into your web browser:</p>
                                  <a href="#" style="color: #6576ff; text-decoration:none;word-break: break-all;">http://localhost:3000/emailVerify/${userId}</a>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 20px 30px 40px">
                                  <p>If you did not make this request, please contact us or ignore this message.</p>
                                  <p style="margin: 0; font-size: 13px; line-height: 22px; color:#9ea8bb;">This is an automatically generated email please do not reply to this email. If you face any issues, please contact us at admin@gmail.com</p>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
      </table>
  </center>
</body>`;
};

exports.confirmEmailMessage = (name) => {
  return `<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f5f6fa;">
     <center style="width: 100%; background-color: #f5f6fa;">
           <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f6fa">
               <tr>
                  <td style="padding: 40px 0;">
                       <table style="width:100%;max-width:620px;margin:0 auto;background-color:#ffffff;">
                           <tbody>
                               <tr>
                                   <td style="padding: 30px 30px 15px 30px;">
                                       <h2 style="font-size: 18px; color: #6576ff; font-weight: 600; margin: 0;">Welcome to Online Learning Platform</h2>
                                   </td>
                               </tr>
                               <tr>
                                   <td style="padding: 0 30px 20px">
                                       <p style="margin-bottom: 10px;">Hi ${name}</p>
                                       <p style="margin-bottom: 10px;">We are pleased to have you as a member of our Family.</p>
                                       <p style="margin-bottom: 10px;">Your account is now verified and you can purchase courses from online learning platform. Also you can be a instructor and create a course on our site.</p>
                                       <p style="margin-bottom: 15px;">Hope you'll enjoy the experience, we're here if you have any questions, drop us a line at <a style="color: #6576ff; text-decoration:none;" href="mailto:iadmin@gmail.com">admin@gmail.com</a> anytime.</p>
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                   </td>
               </tr>
           </table>
       </center>
     </body>`;
};

exports.passwordResetMessage = (name, code) => {
  return `<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f5f6fa;">
       <center style="width: 100%; background-color: #f5f6fa;">
             <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f6fa">
                 <tr>
                    <td style="padding: 40px 0;">
                         <table style="width:100%;max-width:620px;margin:0 auto;background-color:#ffffff;">
                             <tbody>
                                 <tr>
                                     <td style="padding: 30px 30px 15px 30px;">
                                         <h2 style="font-size: 18px; color: #6576ff; font-weight: 600; margin: 0;">Reset Your Password</h2>
                                     </td>
                                 </tr>
                                 <tr>
                                     <td style="padding: 0 30px 20px">
                                         <p style="margin-bottom: 10px;">Hi ${name}</p>
                                         <p style="margin-bottom: 25px;">Copy the code below to reset your password.</p>
                                         <p href="#" style="background-color:#6576ff;border-radius:4px;color:#ffffff;display:inline-block;font-size:13px;font-weight:600;line-height:44px;text-align:center;text-decoration:none;text-transform: uppercase; padding: 0 25px">${code}</p>
                                    
                                     </td>
                                 </tr>
                                 
                                 <tr>
                                     <td style="padding: 20px 30px 40px">
                                         <p>If you did not make this request, please contact us or ignore this message.</p>
                                         <p style="margin: 0; font-size: 13px; line-height: 22px; color:#9ea8bb;">This is an automatically generated email please do not reply to this email. If you face any issues, please contact us at  admin@gmail.com</p>
                                     </td>
                                 </tr>
                             </tbody>
                         </table>
                     </td>
                 </tr>
             </table>
         </center>
       </body>`;
};

exports.passwordResetConfirmMessage = (name) => {
  return `<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f5f6fa;">
  <center style="width: 100%; background-color: #f5f6fa;">
   <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f6fa">
       <tr>
          <td style="padding: 40px 0;">
               <table style="width:100%;max-width:620px;margin:0 auto;background-color:#ffffff;">
                   <tbody>
                       <tr>
                           <td style="text-align:center;padding: 30px 30px 15px 30px;">
                               <h2 style="font-size: 18px; color: #1ee0ac; font-weight: 600; margin: 0;">Password Reseted</h2>
                           </td>
                       </tr>
                       <tr>
                           <td style="text-align:center;padding: 0 30px 20px">
                               <p style="margin-bottom: 10px;">Hi ${name},</p>
                               <p>You Successfully Reseted Your Password. Thanks For being with Us.</p>
                           </td>
                       </tr>
                       <tr>
                           <td style="text-align:center;padding: 0 30px 40px">
                               <p style="margin: 0; font-size: 13px; line-height: 22px; color:#9ea8bb;">This is an automatically generated email please do not reply to this email. If you face any issues, please contact us at  admin@gmail.com</p>
                           </td>
                       </tr>
                   </tbody>
               </table>
          </td>
       </tr>
   </table>
</center>
</body>`;
};
