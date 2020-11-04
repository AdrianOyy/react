import React, { useState } from "react"
import ChatBox from "../../../components/ChatBox"
import { Button } from "@material-ui/core"


export default function Test() {
  const [ open, setOpen ] = useState(false)
  return (
    <React.Fragment>
      <ChatBox open={open} onClose={() => setOpen(false)}/>
      <Button onClick={() => setOpen(true)}>open</Button>
    </React.Fragment>
  )
}

