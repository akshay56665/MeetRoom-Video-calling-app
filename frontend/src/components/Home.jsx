import React, {useContext,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../SocketContext";
import {Container,TextField,Paper,Button} from '@mui/material'

const Home = () => {
  const {socket,initialize,} = useContextProvider()
  const [roomid, setRoomid] = useState()
  const [name,setName]=useState()
  const navigate=useNavigate();
  
  const handleSubmit=()=> {
    socket.emit('join',{name,roomid});
    navigate(`/room/${roomid}`);
  }

  useEffect(()=>{
    initialize()
  },[])

  return (
    <Container sx={{height:'100vh',display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
      <Paper elevation={4} sx={{padding:"5vh 9vw",display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2>Host or Join the meeting</h2>
        <TextField id="outlined-basic" sx={{marginTop:'10px'}} label="Name" variant="outlined" onChange={e=>setName(e.target.value)}/>
        <TextField id="outlined-basic" sx={{margin:'10px'}} label="RoomID" variant="outlined" onChange={e=>setRoomid(e.target.value)}/>
        <Button variant='outlined' type='submit' onClick={handleSubmit}>Submit</Button>  
      </Paper>
    </Container>
  );
};

export default Home;
