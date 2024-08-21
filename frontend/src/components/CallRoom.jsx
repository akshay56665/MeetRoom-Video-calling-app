import React,{ useEffect, useCallback,useState } from 'react'
import {useContextProvider,} from '../SocketContext'
import {Container, Stack,} from '@mui/material'
import Video from './Video'
import Features from './Features'
import Chat from './Chat'

const Videocall = () => {
  const {iceCandidates,socket,Offer,Answer,getAnswer,getCandidate,remoteTrack,isChat}=useContextProvider()

  // video call configurations
  const handleUserJoined=useCallback(async ()=>{
    const offer=await Offer();
    socket.emit('offer',offer);
    await iceCandidates()
  },[])

  const handleGetOffer=useCallback(async (offer)=>{
    const answer=await Answer(offer);
    socket.emit('answer',answer);
    await iceCandidates()
  },[])

  const handleGetAnswer=useCallback(async (answer)=>{
    await getAnswer(answer);

  },[])

  const handleGetCandidates=async (candidates)=>{
    await getCandidate(candidates);
  }
  
  useEffect(()=>{
    remoteTrack();

    socket.on('user-joined',handleUserJoined)
    socket.on('getoffer',handleGetOffer)
    socket.on('getanswer',handleGetAnswer)
    socket.on('getcandidates',handleGetCandidates)
    return ()=>{
      socket.off('user-joined',handleUserJoined)
      socket.off('getoffer',handleGetOffer)
      socket.off('getanswer',handleGetAnswer)
      socket.off('getcandidates',handleGetCandidates)
    }
  },[socket])
  
  return (
    <Container sx={{height:'100vh',width:'100vw',display:'flex',justifyContent:'center',alignItems:'center' }}>
      {isChat? 
      <>
        <Stack sx={{height:'100%',width:'70%'}}>
          <Video />
          <Features/>
        </Stack>

        <Stack sx={{height:'100%',width:'30%',display:'flex',justifyContent:'center',alignItems:'center' }}>
          <Chat />
        </Stack>
      </>:
      <Stack sx={{height:'100%',width:'100%'}}>
        <Video />
        <Features/>
      </Stack>
      }
    </Container>
  )
}

export default Videocall
