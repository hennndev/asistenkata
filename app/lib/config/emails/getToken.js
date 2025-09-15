// getToken.js
import { google } from 'googleapis';
import readline from 'readline';

const CLIENT_ID = 'GMAIL_CLIENT_ID';
const CLIENT_SECRET = 'GMAIL_CLIENT_SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
});

console.log('Authorize this app by visiting this URL:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\nPaste the code here: ', async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('\n✅ Your Refresh Token:');
    console.log(tokens.refresh_token);
  } catch (error) {
    console.error('Error retrieving access token', error);
  }
  rl.close();
});
