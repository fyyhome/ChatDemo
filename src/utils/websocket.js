import {host} from './fetch';

export default function WS(url, protocols = '', options = {}) {
    console.log(url)
    this.url = (url || '').includes('ws') ? url : `ws://${host}:8899${url}`;
    this.protocols = protocols;
    this.options = options;
    this.socket = new WebSocket(this.url, this.protocols);
    this.dumpCount = 0;
}

WS.prototype.init = function({
    onclose,
    onerror,
    onmessage,
    onopen,
}) {
    this.onclose = onclose;
    this.onerror = onerror;
    this.onmessage = onmessage;
    this.onopen = onopen;

    this.socket.addEventListener('close', e => {
        this.onclose(e);
        if (e.code !== 1005 && this.dumpCount <= this.options.dumpLimit) {
            this.netdump(1000);
        }
    });
    this.socket.addEventListener('error', e => {
        this.onerror(e);
        if (this.dumpCount <= this.options.dumpLimit) {
            this.netdump(1000);
        }
    });
    this.socket.addEventListener('message', e => {
        this.onmessage(e);
    });
    this.socket.addEventListener('open', e => {
        this.onopen(e);
        this.dumpCount = 0;
    });
}

WS.prototype.reconnect = function() {
    const readyState = this.socket.readyState;
    if (readyState !== WebSocket.CLOSED && readyState !== WebSocket.CLOSING) {
        return;
    }
    this.socket = new WebSocket(this.url, this.protocols);
    this.init({
        onclose: this.onclose,
        onerror: this.onerror,
        onmessage: this.onmessage,
        onopen: this.onopen
    });
}

WS.prototype.netdump = function(dumptime) {
    let timer = setTimeout(() => {
        this.reconnect();
        this.dumpCount++;
        const readyState = this.socket.readyState;
        if (readyState === WebSocket.OPEN) {
            clearTimeout(timer);
            return;
        }
    }, dumptime);
}