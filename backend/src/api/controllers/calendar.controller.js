const { google } = require('googleapis');
require('dotenv').config();


// Configure the Google Calendar API credentials
const credentials = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uris: [process.env.CLIENT_URL],
};

// Create an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

// Set the access token for the OAuth2 client
oAuth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  // refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Use the OAuth2 client to make API requests
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

// Example: Get a list of events from the Google Calendar API
calendar.events.list(
  {
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  },
  (err, res) => {
    if (err) return console.error('The API returned an error:', err.message);

    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming events:');
      events.forEach((event) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  }
);

// Frontend routes:
// - GET /calendar/events
// - POST /calendar/events
// - PUT /calendar/events/:id
// - DELETE /calendar/events/:id


// Frontend route: POST /calendar/events
app.post('/calendar/events', (req, res) => {
  const { summary, start, end } = req.body;

  const event = {
    summary,
    start: {
      dateTime: start,
    },
    end: {
      dateTime: end,
    },
  };

  calendar.events.insert(
    {
      calendarId: 'primary',
      resource: event,
    },
    (err, event) => {
      if (err) {
        console.error('Error adding event:', err.message);
        return res.status(500).json({ error: 'Failed to add event' });
      }

      console.log('Event added:', event.summary);
      res.status(200).json({ message: 'Event added successfully' });
    }
  );
});

// Frontend route: DELETE /calendar/events/:id
app.delete('/calendar/events/:id', (req, res) => {
  const eventId = req.params.id;

  calendar.events.delete(
    {
      calendarId: 'primary',
      eventId,
    },
    (err) => {
      if (err) {
        console.error('Error deleting event:', err.message);
        return res.status(500).json({ error: 'Failed to delete event' });
      }

      console.log('Event deleted:', eventId);
      res.status(200).json({ message: 'Event deleted successfully' });
    }
  );
});
