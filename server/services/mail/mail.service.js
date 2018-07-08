const { google } = require('googleapis');
const model = require('./mail.model');

const oauth2Client = new google.auth.OAuth2(
  '924584578505-lf25pemho889381sv95bulj3t97qd9ps.apps.googleusercontent.com',
  'Eyn20zOa8agTeg7Y_uZx-iHk',
  'http://localhost:3000/calendar',
);


module.exports = {
  setCalEvent: async (myDetails) => {
    try {
      const to = [{ email: myDetails.email }];
      const employeeId = await model.getEmpId(myDetails.id);
      /* eslint-disable no-restricted-syntax */
      /* eslint-disable no-await-in-loop */
      for (const element of employeeId.rows) {
        const employeeData = await model.getEmpEmail(element.employeeId);
        to.push({ email: employeeData.rows[0].email });
      }
      const { interviewDatetime } = myDetails;

      const addEvent = function addEvents() {
        let startDatetime = new Date(interviewDatetime);
        startDatetime = startDatetime.toISOString();

        let endDatetime = new Date(interviewDatetime);
        const temp = endDatetime.getTime() + 2 * 60 * 60 * 1000;
        endDatetime.setTime(temp);
        endDatetime = new Date(endDatetime).toISOString();

        const calendar = google.calendar({ version: 'v3' });
        const event = {
          summary: `Interview -${myDetails.firstname} ${myDetails.lastname} for ${myDetails.designation}`,
          location: 'ZURU-Tech, 407-Mauransh Alenza, Shyamal-crossroad, Ahmedabad, Gujrat - 380015',
          description: myDetails.resumeUrl,
          start: {
            dateTime: startDatetime,
            timeZone: 'Asia/Calcutta',
          },
          end: {
            dateTime: endDatetime,
            timeZone: 'Asia/Calcutta',
          },
          attendees: to,
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 10 },
            ],
          },
          source: [
            {
              url: myDetails.resumeUrl,
              title: 'resume',
            },
          ],
        };

        calendar.events.insert({
          auth: oauth2Client,
          calendarId: 'primary',
          sendNotifications: true,
          resource: event,
        }, (err, resp) => {
          if (err) {
            return err;
          }
          return resp;
        });
        return true;
      };
      addEvent();
    } catch (err) {
      throw err;
    }
  },
  getURL: async () => {
    try {
      const scopes = ['https://www.googleapis.com/auth/calendar'];
      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
      });
      return url;
    } catch (err) {
      throw err;
    }
  },
  getRefToken: async (myDetails) => {
    try {
      const { tokens } = await oauth2Client.getToken(myDetails.code);
      if (tokens.refresh_token) {
        await model.setRefToken(myDetails.id, tokens.refresh_token);
        oauth2Client.setCredentials(tokens);
        return tokens;
      }
      const getRefToken = await model.getRefToken(myDetails.id);
      tokens.refresh_token = getRefToken;
      oauth2Client.setCredentials(tokens);
      return tokens;
    } catch (err) {
      throw err;
    }
  },
};
