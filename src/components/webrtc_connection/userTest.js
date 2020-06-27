
require('webrtc-adapter')


export default class rtc_connection {


    constructor() {
        this.registeredCallbacks = [];
        this.messages = [];
        this.io = require('socket.io-client');
        this.socket = this.io('http://localhost:4000', {
            path: '/user'
        });

        const configuration = {
            'iceServers': [
                {
                    'urls': 'stun:stun.l.google.com:19302'
                },
                {
                    urls: 'turn:192.168.192.5:3478?transport=tcp',
                    username: 'zamba',
                    credential: '3284'
                }
            ]
        }



        this.peerConnection = new RTCPeerConnection(configuration);

        this.dataChannel = this.peerConnection.createDataChannel('test');

        this.dataChannel.addEventListener('message', (msg) => {
            console.log("msg received: " + msg.data);
            this.messages.push(msg.data);
            // console.log(this.messages);
        });


        this.peerConnection.addEventListener('connectionstatechange', event => {
            console.log(this.peerConnection.connectionState);
            if (this.peerConnection.connectionState === 'connected') {
                console.log("CONNECTED YAAAAY");
            }
        });



        //on connections
        this.socket.on('new-ice-candidate', async (msg) => {
            // console.log('iceCandidate on REMOTE Peer');
            try {
                await this.peerConnection.addIceCandidate(msg);
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }

        });

        this.peerConnection.onicecandidate = event => {
            // console.log('iceCandidate on local Peer');
            if (event.candidate) {
                console.log("Candidate Sent");
                this.sendMSG('new-ice-candidate', event.candidate);
            }
        };

        this.socket.on('connection', (socket) => {
            console.log("Socket.io>> CONNECTED");
        });

        console.log('WebRTC Created');
        // offer, not used
        this.socket.on('offer', (msg) => {
            console.log("offer received!");

        });
        //Answer
        this.socket.on('answer', async (answer) => {

            if (!this.peerConnection.remoteDescription) {
                console.log("Answer Received!");
                await this.peerConnection.setRemoteDescription(answer);
            } else {
                console.log("Second answer ignored");
            }


        });
    }



    sendData(msg) {
        if (this.dataChannel) {
            this.dataChannel.send(msg);
        }
    }

    async sendMSG(event, msg) {
        this.socket.emit(event, msg);
    }

    registrarCallbackMensajes(funcion) {
        console.log("WebRTC: Message callback registered");
        if (this.dataChannel) {
            this.dataChannel.addEventListener('message', funcion);
        }
    }

    registrarCallbackMensajesID(funcion, id) {
        if (!(this.registeredCallbacks.includes(id))) {
            this.registeredCallbacks.push(id);
            console.log("WebRTC: Message callback registered: " + id);
            if (this.dataChannel) {
                this.dataChannel.addEventListener('message', funcion);
            }
            console.log(this.registeredCallbacks);
        }
    }

    async makeCall() {
        console.log("WebRTC>> makeCall()");

        this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });


        this.localStream.getTracks().forEach(track => {
            this.peerConnection.addTrack(track, this.localStream);
        });



        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        // signalingChannel.send({ 'offer': offer });
        if (this.socket.connected) {
            this.sendMSG('offer', { offer: offer })
            return true;
        } else {
            return false;
        }
    }

    async getConnectedDevices(type) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === type)
    }

    async openCamera(cameraId) {
        const constraints = {
            'audio': { 'echoCancellation': true },
            'video': {
                'deviceId': cameraId,
            }
        }

        return await navigator.mediaDevices.getUserMedia(constraints);
    }

    /**
     * Conecta el video stream local al nodo con el Id Dado
     * @param {nodo} nodeId 
     */
    connectVideoToNode(nodeId) {
        const remoteVideo = document.querySelector('#' + nodeId);
        remoteVideo.srcObject = this.localStream;
    }



}