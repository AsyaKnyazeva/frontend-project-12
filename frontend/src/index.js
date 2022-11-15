import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import App from './App.js';

const socket = io();
const vdom = App(socket);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(vdom);
