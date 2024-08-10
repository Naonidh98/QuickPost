exports.ResetPasswordTemplate = (link) => {
    return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>OTP Verification Email</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .btn {
                  font-weight: bold;
                  background-color: #219ebc;
                  color : white;
                  padding: 4px 8px;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 28px;
                  margin-top: 25px;
                  margin-bottom: 25px;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
              
              <div class="message">
              "Click the button below to reset your password."
  </div>
              <div class="body">
                  <a href='${link}'>
                    <h2 class="btn">Reset Password</h2>
                  </a>
                  <p>This link is valid for 5 minutes.</p>
              </div>
              <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                      href="mailto:info@studynotion.com">info@.com</a>. We are here to help!</div>
          </div>
      </body>
      
      </html>`;
  };
  