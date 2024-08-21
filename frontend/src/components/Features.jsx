import { useState } from 'react'
import { Stack } from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import IconButton from '@mui/material/IconButton';
import { useContextProvider } from '../SocketContext';
import {useNavigate} from 'react-router-dom'

const Features = () => {
  const {socket,localStream,setUserConnected,closeCall,setIsChat}=useContextProvider()
  const [isVideo,setIsVideo] = useState(true)
  const [isAudio, setIsAudio] = useState(true)
  const navigate=useNavigate()

  const handleVideo=()=>{
    if(isVideo){
      localStream.getVideoTracks()[0].enabled=false;
    }
    else{
      localStream.getVideoTracks()[0].enabled=true;
    }
    setIsVideo(prev=>!prev)
  }
  
  const handleAudio=()=>{
    if(isAudio){
      localStream.getAudioTracks()[0].enabled=false;
    }
    else{
      localStream.getAudioTracks()[0].enabled=true;
    }
    setIsAudio(prev=>!prev)
  }

  const stopStream=()=>{
    setUserConnected(false);
    closeCall()
    navigate('/')
  }

  return (
    <Stack spacing={2} sx={{height:'20%',width:'100%', display:'flex',justifyContent:'center',alignItems:'center'}} direction='row'>
      <IconButton onClick={handleAudio}>
        {isAudio? <MicIcon color='primary'/> : <MicOffIcon />}
      </IconButton>

      <IconButton onClick={handleVideo}>
        {isVideo? <VideocamIcon color='secondary'/> : <VideocamOffIcon />}
      </IconButton>

      <IconButton onClick={stopStream}>
        <CallEndIcon color='error'/>
      </IconButton>

      <IconButton onClick={()=>setIsChat(prev=>!prev)} color='primary'>
        <ChatOutlinedIcon/>
      </IconButton>
    </Stack>
  )
}

export default Features
