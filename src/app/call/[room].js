import { useState } from 'react';
import VideoCall from '../../components/VideoCall';

export default function CallPage({ room }) {
  const [token, setToken] = useState(null);

  const joinRoom = async () => {
    const res = await fetch('/api/video/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identity: 'Munna-Customer',
        roomName: room
      })
    });
    const data = await res.json();
    setToken(data.token);
  };

  return (
    <div>
      {!token ? (
        <button onClick={joinRoom}>Join Room</button>
      ) : (
        <VideoCall token={token} roomName={room} />
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { room: params.room } };
}
