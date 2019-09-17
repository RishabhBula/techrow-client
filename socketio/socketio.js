var socket = io('https://cinema.headjack.io/', {transports: ['polling'], upgrade: false});
      socket.on('connect', () => {
        console.log("socket connection established....socket id",socket); // 'G5p5...'
          if(socket.id){
            var auth = socket.emit('appAuth', '99de5d81f4ae87fed360f0bdccff7526', '1a459a172e2b3dd58bb60c78b6d68d7d7f91e1be5236dade');
            console.log("auth======================auth",auth)
          }
      });
export default socket