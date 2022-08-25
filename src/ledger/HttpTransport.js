import { TransportError } from '@ledgerhq/errors';
import axios from 'axios';
import Transport from '@ledgerhq/hw-transport';

let _a;
/**
 * HTTP transport implementation
 */
export default class HttpTransport extends Transport {
  constructor(url) {
    super();
    this.url = url;
  }

  static async open(url, timeout) {
    await HttpTransport.check(url, timeout);
    return new HttpTransport(url);
  }

  async exchange(apdu) {
    const apduHex = apdu.toString('hex');
    // log("apdu", `=> ${apduHex}`);
    console.log('apdu: ', apduHex);
    const response = await axios({
      method: 'POST',
      url: `${this.url}/apdu`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        data: apduHex,
      }),
    });
    console.log('exchange r: ', response);
    if (response.status !== 200) {
      throw new TransportError(`failed to communicate to server. code=${response.status}`, `HttpTransportStatus${response.status}`);
    }
    const body = response.data;
    // if (body.error) throw body.error;
    // log("apdu", `<= ${body.data}`);
    return Buffer.from(body.data, 'hex');
  }

  // eslint-disable-next-line class-methods-use-this
  setScrambleKey() { }

  // eslint-disable-next-line class-methods-use-this
  close() {
    return Promise.resolve();
  }
}
_a = HttpTransport;
HttpTransport.isSupported = () => Promise.resolve(typeof fetch === 'function');
// this transport is not discoverable
HttpTransport.list = () => Promise.resolve([]);
// eslint-disable-next-line no-unused-vars
HttpTransport.listen = (_observer) => ({
  unsubscribe: () => { },
});
HttpTransport.check = async (url, timeout = 5000) => {
  const response = await axios({
    url,
    timeout,
  });
  if (response.status !== 200) {
    throw new TransportError(`failed to access HttpTransport(${url}): status ${response.status}`, 'HttpTransportNotAccessible');
  }
};
// # sourceMappingURL=HttpTransport.js.map
