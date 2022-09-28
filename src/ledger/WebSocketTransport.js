import Transport from '@ledgerhq/hw-transport';
import { TransportError } from '@ledgerhq/errors';
import { log } from '@ledgerhq/logs';

let _a;

// eslint-disable-next-line global-require
const WebSocket = global.WebSocket || require('ws');
/**
 * WebSocket transport implementation
 */
export default class WebSocketTransport extends Transport {
  constructor(hook) {
    super();
    this.hook = hook;
    hook.onDisconnect = () => {
      this.emit('disconnect');
      this.hook.rejectExchange(new TransportError('WebSocket disconnected', 'WSDisconnect'));
    };
  }

  static async open(url) {
    const exchangeMethods = await new Promise((resolve, reject) => {
      try {
        const socket = new WebSocket(url);
        // eslint-disable-next-line no-shadow
        const exchangeMethods = {
          resolveExchange: () => { },
          rejectExchange: () => { },
          onDisconnect: () => { },
          close: () => socket.close(),
          send: (msg) => socket.send(msg),
        };
        socket.onopen = () => {
          socket.send('open');
        };
        socket.onerror = (e) => {
          exchangeMethods.onDisconnect();
          reject(e);
        };
        socket.onclose = () => {
          exchangeMethods.onDisconnect();
          reject(new TransportError('OpenFailed', 'OpenFailed'));
        };
        socket.onmessage = (e) => {
          if (typeof e.data !== 'string') return;
          const data = JSON.parse(e.data);
          // eslint-disable-next-line default-case
          switch (data.type) {
            case 'opened':
              // eslint-disable-next-line consistent-return
              return resolve(exchangeMethods);
            case 'error':
              reject(new Error(data.error));
              // eslint-disable-next-line consistent-return
              return exchangeMethods.rejectExchange(new TransportError(data.error, 'WSError'));
            case 'response':
              // eslint-disable-next-line consistent-return
              return exchangeMethods.resolveExchange(Buffer.from(data.data, 'hex'));
          }
        };
      } catch (e) {
        reject(e);
      }
    });
    return new WebSocketTransport(exchangeMethods);
  }

  async exchange(apdu) {
    const hex = apdu.toString('hex');
    log('apdu', `=> ${hex}`);
    const res = await new Promise((resolve, reject) => {
      this.hook.rejectExchange = (e) => reject(e);
      this.hook.resolveExchange = (b) => resolve(b);
      this.hook.send(hex);
    });
    log('apdu', `<= ${res.toString('hex')}`);
    return res;
  }

  // eslint-disable-next-line class-methods-use-this
  setScrambleKey() { }

  async close() {
    this.hook.close();
    return new Promise((success) => {
      setTimeout(() => {
        success(undefined);
      }, 200);
    });
  }
}
// _a = WebSocketTransport;
// WebSocketTransport.isSupported = () => Promise.resolve(typeof WebSocket === 'function');
// // this transport is not discoverable
// WebSocketTransport.list = () => Promise.resolve([]);
// WebSocketTransport.listen = () => ({
//   unsubscribe: () => { },
// });
WebSocketTransport.check = async (url, timeout = 5000) => new Promise((resolve, reject) => {
  const socket = new WebSocket(url);
  let success = false;
  setTimeout(() => {
    socket.close();
  }, timeout);
  socket.onopen = () => {
    success = true;
    socket.close();
  };
  socket.onclose = () => {
    if (success) resolve(undefined);
    else {
      reject(new TransportError(`failed to access WebSocketTransport(${url})`, 'WebSocketTransportNotAccessible'));
    }
  };
  socket.onerror = () => {
    reject(new TransportError(`failed to access WebSocketTransport(${url}): error`, 'WebSocketTransportNotAccessible'));
  };
});
