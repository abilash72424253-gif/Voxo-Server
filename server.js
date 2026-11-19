const express = require('express');
const path = require('path');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');
const app = express();
app.use(cors());
app.use(express.json());

const VOXO_KEYS = {
  "VOXO-KEY-BILGI-001": { owner: "Bilgi Boys", limit: 1000 },
  "VOXO-KEY-FREE-001": { owner: "Free User", limit: 100 }
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-token', (req, res) => {
  const { voxoKey, room, username } = req.query;
  if (!VOXO_KEYS[voxoKey]) {
    return res.json({ error: "WRONG KEY!" });
  }
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity: username }
  );
  token.addGrant({ roomJoin: true, room: room, canPublish: true, canSubscribe: true });
  res.json({ token: token.toJwt() });
});

app.post('/get-token', (req, res) => {
  const { voxoKey, room, username } = req.body;
  if (!VOXO_KEYS[voxoKey]) {
    return res.json({ error: "WRONG KEY!" });
  }
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity: username }
  );
  token.addGrant({ roomJoin: true, room: room, canPublish: true, canSubscribe: true });
  res.json({ token: token.toJwt() });
});

app.listen(process.env.PORT || 3000, () => console.log('VOXO Ready!'));
