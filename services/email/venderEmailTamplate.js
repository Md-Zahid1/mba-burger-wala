export default {
  registerVendorOtp: {
    subject: "Hello ✔",
    html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">

        <p>Hello <strong>{{businessName}}</strong>,</p>
      
        <p>Thanks for choosing Shootwala. Your Verification Code for registration is <strong> {{OTP}} </strong>.</p>
      
        <p>Verification Code is valid for 30 Minutes.</p>
      
        <p>Best Regards,<br>Team Shootwala</p>
      
      </div>`
  },

  vendorDetailSubmit: {
    subject: "Hello ✔",
    html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">

        <p>Hello <strong>{{businessName}}</strong>,</p>

        <p>Thanks for choosing Shootwala. Your Basic Business Profile has been created with Shootwala. You are requested to complete your Premium Business Profile by clicking on the below link:</p>
      
        <p><a href="[Link---------------------------------------------]" style="text-decoration: none; color: #007BFF;">[Link---------------------------------------------]</a></p>
      
        <p>This link shall be valid for 48 Hours. If you have already completed your Premium Business Profile, please ignore this email.</p>
      
        <p>Best Regards,<br>Team Shootwala</p>
      
      </div>`
  },

  vendorPublish: {
    subject: "Hello ✔",
    html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">
        <p>Hello <strong>{{businessName}}</strong>,</p>

        <p>We welcome you onboard at Shootwala! Congratulations, your Premium Business Profile has been made live on Shootwala and is accessible to all users.</p>
      
        <p>We are highly delighted to welcome you onboard at Shootwala. We wish you all the very best for all future leads & business opportunities. You can access/update your account after login with your registered Email ID or Mobile Number.</p>
      
        <p>In case of any issue, feel free to email your concern at <a href="mailto:partner@shootwala.com" style="text-decoration: none; color: #007BFF;">partner@shootwala.com</a>. We are always there for any help required.</p>
      
        <p>Best Regards,<br>Team Shootwala</p>
        </div>`
  },

  enquiryToVender: {
    subject: "Hello ✔",
    html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">
        <p>Hello <strong>{{businessName}}</strong>,</p>
  <p>You have received a Business lead with the following details:</p>
  <table style="width: 100%;">
    <tr>
      <td style="width: 30%;"><strong>Name:</strong></td>
      <td>{{name}}</td>
    </tr>
    <tr>
      <td><strong>Email ID:</strong></td> 
      <td>{{email}}</td>
    </tr>
    <tr>
      <td><strong>Mobile Number:</strong></td>
      <td>{{mobile}}</td>
    </tr>
    <tr>
      <td><strong>Service Required:</strong></td>
      <td>{{service}}</td>
    </tr>
    <tr>
      <td><strong>Event Date:</strong></td>
      <td>{{date}}</td>
    </tr>
    <tr>
      <td><strong>Event Type:</strong></td>
      <td>{{event}}</td>
    </tr>
    <tr>
      <td><strong>Event Location:</strong></td>
      <td>{{location}}</td>
    </tr>
    <tr>
      <td><strong>Budget:</strong></td>
      <td>{{budget}}</td>
    </tr>
    <tr>
      <td><strong>Message:</strong></td>
      <td>{{message}}</td>
    </tr>
  </table>

  <p>Please connect with the user timely and convert the lead into business. All the best.</p>

  <p>Best Regards,<br>Team Shootwala</p>
  </div>`
  },

  saveProfileOnVender: {
    subject: "Hello ✔",
    html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">
    <p>Hello <strong>{{businessName}}</strong>,</p>

    <p>Greetings of the Day & Congratulations!</p>
  
    <p>Your Business Profile has been Shortlisted. Find the details below:</p>
  
    <ul>
      <li>Name : {{name}}</li> 
      <li>Email : {{email}}</li>
    </ul>
  
    <p>This may be a potential business lead. Please visit your Panel and review the same. All the very best.</p>
  
    <p>Best Regards,<br>Team Shootwala</p>
  </div>`
  },


  updateProfileToVender: {
    subject: "Hello ✔",
    html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">
    <p>Hello <strong>{{businessName}}</strong>,</p>

  <p>Greetings from Shootwala!!</p>

  <p>We understand that you have initiated changes in your Profile. Your request for updation has been received by us. We shall review the same, and changes shall reflect in your profile very soon. Further, we shall update you through email when the changes are live on Shootwala.com.</p>

  <p>In case of any concern, feel free to contact us at <a href="mailto:partner@shootwala.com" style="text-decoration: none; color: #007BFF;">partner@shootwala.com</a>.</p>

  <p>Best Regards,<br>Team Shootwala</p>
  </div>`
  },


  profileUpdatedToVender: {
    subject: "Hello ✔",
    html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">
    <p>Hello <strong>{{businessName}}</strong>,</p>

    <p>Congratulations!!</p>
  
    <p>Changes made by you in your Studio details have been accepted, and the same have been made live in your studio on Shootwala and are visible to users.</p>
  
    <p>In case of any issue, feel free to email your concern at <a href="mailto:partner@shootwala.com" style="text-decoration: none; color: #007BFF;">partner@shootwala.com</a>. We are always there for any help required.</p>
  
    <p>Best Regards,<br>Team Shootwala</p>
  </div>`
  }


}