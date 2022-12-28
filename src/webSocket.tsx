export const ws = new WebSocket('ws://192.168.191.70:8080/')

export const msgControl:Function = (callback?:Function):void => {
  ws.addEventListener('message', (e)=>{
    console.log('传讯中')
    if(callback){
      callback(e)
    }
  })
}

export const closeInfo:Function = (callback:Function):void => {
  ws.addEventListener('close', (e) => {
    console.log('連結關閉，咱們下次見~')
    callback(e)
  })
}


export const openInfo:Function = (callback?:Function):void =>{
  ws.addEventListener('open', function(e) {
    console.log('連結建立成功。')
    // ws.send('OK')
    if(callback){
      callback(e)
    }
  })
}

// export const reconnect:Function = ():WebSocket => {
//   return ws
// }