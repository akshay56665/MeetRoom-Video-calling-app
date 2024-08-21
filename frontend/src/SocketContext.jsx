import { createContext,useState,useContext} from "react";
import {io} from 'socket.io-client'

const server={
  iceServers:[
    {
      urls:[ "stun:stun.l.google.com:19302" , "stun:stun.l.google.com:5349" ]
    }
  ]
}

const SocketContext = createContext(null);
const socket = io( "http://localhost:8000" )

export const useContextProvider=()=>{
  return useContext(SocketContext)
}

let recieveChannel;
let MsgArray=[];

// step 1: create new RTCpeerconnection
var peerconnection=new RTCPeerConnection(server);
var dataChannel = peerconnection.createDataChannel('channel');

export const ContextProvider = ({ children }) => {
  const [localStream,setLocalStream]=useState();
  const [remoteStream,setRemoteStream]=useState();
  const [isChat,setIsChat]=useState();
  const [msg,setMsg]=useState([])
  const [UserConnected, setUserConnected] = useState(false)

  // to initialize media 
  const initialize=async ()=>{
    const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
    setLocalStream(stream)
    setTracks(stream);
  }

  // At sender side
  let Offer=async ()=>{
    // creating an offer for receiver
    let offer=await peerconnection.createOffer();
    await peerconnection.setLocalDescription(offer)
    // send to remote peer using signalling server
    return offer;    
  }

  // At reciever side
  const Answer=async (offer)=>{
    // set offer in remote description
    await peerconnection.setRemoteDescription(offer)

    // create answer and set local description
    const answer=await peerconnection.createAnswer();
    await peerconnection.setLocalDescription(answer);

    // send to caller peer using signalling server
    return answer
  }

  const getAnswer=async (answer)=>{
    await peerconnection.setRemoteDescription(answer);
  }

  const iceCandidates=()=>{
    peerconnection.onicecandidate=e=>{
      if(e.candidate){
        socket.emit('candidates',e.candidate);
      }
    }
  }

  const getCandidate=async (candidate)=>{
    await peerconnection.addIceCandidate(candidate);
  }

  const remoteTrack=()=>{
    peerconnection.ontrack=e=>{
      setUserConnected(true);
      setRemoteStream(e.streams[0])
    }
  }

  const setTracks=(stream)=>{
    stream.getTracks().forEach((track) => {
      peerconnection.addTrack(track,stream);
    });
  }

  // to send data using datachannel
  const sendData=(data)=>{
    const readyState=dataChannel.readyState
    if(readyState === 'open'){
      dataChannel.send(data)
    }
    else{
      console.log('readyState is closed')
    }
  }

  // to recieve remote data
  peerconnection.ondatachannel=(event)=>{
    recieveChannel=event.channel;
    recieveChannel.onmessage=(event)=>{
      const data=event.data
      setMsg((prevmsg)=>[...prevmsg,data])
    }
  }

  const closeCall=()=>{
    peerconnection.close()
    peerconnection=null;
    peerconnection=new RTCPeerConnection(server);
    
    dataChannel.close()
    dataChannel=null;
    setMsg([]);
    setIsChat(false);
    dataChannel=peerconnection.createDataChannel('channel');
  }

  return (
    <SocketContext.Provider value={{msg,setMsg,sendData,MsgArray,isChat,setIsChat,closeCall,setUserConnected,setLocalStream,UserConnected,initialize,socket,localStream, Offer,Answer,getAnswer,iceCandidates,getCandidate,remoteTrack,remoteStream}}>
        {children}
    </SocketContext.Provider>
  );
};
