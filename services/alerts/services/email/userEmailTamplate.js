export default {

    enquiryVenderListToUser: {
        subject: "Hello ✔",
        html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">
        <p>Dear <strong>{{name}}</strong>,</p>
    
        <p>Greetings from Shootwala. Based on your requirements, we have shortlisted the following PhotoGraphers / VideoGraphers. You can connect with them and discuss your project:</p>
      
        <ol>
        {{venders}} 
        </ol>
      
        <p>In case you want to view more PhotoGraphers / VideoGraphers, along with detailed profiles, please visit <a href="http://www.shootwala.com" style="text-decoration: none; color: #007BFF;">www.shootwala.com</a>.</p>
      
        <p>Best Regards,<br>Team Shootwala</p>
               
        </div>`
    },
    replyToUser: {
        subject: "Hello ✔",
        html: `<div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">
        <p>Dear <strong>{{name}}</strong>,</p>
        <p>{{reply}}</p>
        <p>Best Regards,<br>Team Shootwala</p>
        </div>`
    }
}