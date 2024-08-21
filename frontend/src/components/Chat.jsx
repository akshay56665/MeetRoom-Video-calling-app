import { Box, Paper, TextField,Stack,IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { useContextProvider } from '../SocketContext';
import {useState,} from 'react'

const Chat = () => {
  const {sendData,msg,setMsg}=useContextProvider()
  const [text,setText]=useState('')

  const handleSend=()=>{
    setMsg((prevmsg)=>[...prevmsg,text])
    setText('')
    sendData(text)
  }
  return (
    <Paper sx={{marginLeft:'20px',height:'95%',width:"100%"}} elevation={5}>
      <Box sx={{height:'85%', margin:'10px'}}>
        {msg.map(data => {
          return <p>{data}</p>
        })}
      </Box>
      <Stack direction='row'>
        <TextField sx={{marginLeft:'10px',width:'85%'}} onChange={e=>setText(e.target.value)}/>
        <IconButton onClick={handleSend}>
          <SendIcon/>
        </IconButton>
      </Stack>
    </Paper>
  )
}

export default Chat
