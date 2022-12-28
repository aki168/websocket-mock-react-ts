import { useState, useRef, useEffect } from 'react'
import { ws, msgControl, closeInfo, openInfo } from './webSocket'
import './App.css'

function App() {

  interface Message {
    user: string,
    msg: string
  }

  const [count, setCount] = useState(0)
  const [chat, setChat] = useState<Message[]>([])
  const [user, setUser] = useState<String | Number>('AKI')
  const [close, setClose] = useState<String>('')
  const talkRef = useRef<HTMLInputElement>(null)

  function setter(e: MessageEvent) {
    var msg: Message = JSON.parse(e.data);
    setChat([...chat, msg])
  }

  function closePage() {
    setChat([])
    setClose('伺服器已关闭')
  }

  msgControl(setter)
  closeInfo(closePage)


  // ws.addEventListener('message', function(e) {
  //   var msg:Message = JSON.parse(e.data);
  //   setChat([...chat, msg])
  // })

  // ws.addEventListener('close', function() {
  //   console.log('連結關閉，咱們下次見~')
  // })
  // const renew = () => {
  //   const checker = (e:MessageEvent) => {
  //     var msg: Message = JSON.parse(e.data)
  //     return msg
  //   }
  //   reconnect(()=>{
  //     if(msgControl(checker)){
  //       setClose('')
  //     }
  //   })
  // }

  const submit = () => {
    let text = {
      user,
      msg: talkRef.current?.value
    }
    ws.send(JSON.stringify(text))
  }

  useEffect(() => {
    openInfo(() => {
      setClose('')
    })
  }, [close])

  return (
    <div className="App container">
      <h1>WebSocket - test</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <hr />
        <input type='text' ref={talkRef} className="mr-2" />
        <button type='button' onClick={submit}>送出</button>
        <ul>
          {
            chat.length >= 1 ?
              chat.map((item, i) => <li key={i}>{item.user}:{item.msg}</li>)
              :
              <>
                {close ? 
                <div>
                  伺服器已关闭...
                </div> : 
                '请输入讯息'
              }
              </>
            }
        </ul>
      </div>
    </div>
  )
}

export default App
