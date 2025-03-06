
import{
  User,
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  useCall,
  useCallStateHooks,
  ParticipantView,
}from '@stream-io/video-react-sdk';
import './App.css';

import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = "mmhfdzb5evj2";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1NoYWFrX1RpIiwidXNlcl9pZCI6IlNoYWFrX1RpIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3NDAzOTExNDcsImV4cCI6MTc0MDk5NTk0N30.mUGch-L2fFz_bizCQjK4B6O4QShBtGuh-rdDe88Z-lw";
const userId = "Shaak_Ti";
const callId = "Znj67KT56wDn";


const user: User = { 
  id: userId,
   name: "Ram",
   images: 'http'
   };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);
call.join({ create: true });

function App() {
 
  return (
  
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyLivestreamUI />
      </StreamCall>
    </StreamVideo>
  );
}


export default App;

export const MyLivestreamUI = () => {
  const call = useCall();
  const { useIsCallLive, useLocalParticipant, useParticipantCount} =
  useCallStateHooks();
  const totalParticipants = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const IsCallLive = useIsCallLive(); 
  return(
    <div style={{display:'flex', flexDirection:'column', gap: '5px'}}>
      <div
      style={{
        alignSelf:'flex-start',
        color:'white',
        backgroundColor:'black',
        borderRadius:'8px',
        padding:'4px 6px,'
      }}>
        Live: {totalParticipants}
      </div>
      <div style={{ flex: 1}}>
        {localParticipant &&(
          <ParticipantView
          participant={localParticipant}
          ParticipantViewUI={null}
          />
        )}
      </div>
      <div style={{alignSelf:'center'}}>
        {IsCallLive ?(
          <button onClick={() => call?.stopLive()}>Stop Livestream</button>
        ):(
          <button onClick={() => call?.goLive()}>Start Livestream</button>
        )
      }
      </div>
    </div>
  );
};