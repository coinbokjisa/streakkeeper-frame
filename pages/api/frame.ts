import type { NextApiRequest, NextApiResponse } from "next";

const RANDOM_MESSAGES = [
  "Keeping my streak alive! #DayX",
  "Consistency matters. Streak on!",
  "One more day, one more post.",
  "Not breaking the chain today!",
  "See you tomorrow, streak saved!"
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host;

  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="og:title" content="StreakKeeper" />
          <meta property="og:description" content="Keep your streak alive daily!" />
          <meta property="og:image" content="https://${host}/streakkeeper.png" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="https://${host}/streakkeeper.png" />
          <meta name="fc:frame:post_url" content="https://${host}/api/frame" />
          <meta name="fc:frame:button:1" content="Post Today's Streak" />
        </head>
        <body></body>
      </html>
    `);
  } else if (req.method === "POST") {
    const randomMsg = RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="https://${host}/streakkeeper.png" />
          <meta name="fc:frame:button:1" content="✅ Streak Posted!" />
        </head>
        <body></body>
      </html>
    `);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
