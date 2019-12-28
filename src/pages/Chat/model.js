import {
    observable,
    action,
    computed
} from 'mobx';

/**
 * message schemal
 * {
 *      type: 'SEND' | 'RECEIVE',
 *      message: string,
 *      time: number,
 * }
 * 
 * 
 * user schemal
 * {
 *      nick_name: string,
 *      avatar_url: string,
 *      subtitle: string
 * }
 */

export default class ChatModel {
    @observable user;
    @observable messages;
    @observable message;
    @observable token;

    constructor() {
        this.user = {
            nick_name: '',
            avatar_url: '',
            subtitle: '',
            token: null
        };
        this.messages = [];
        this.token = null;
        this.mock();
    }

    @action
    setUser(user) {
        Object.assign(this.user, user);
    }

    @action
    setMessages(messages) {
        this.messages = messages || [];
    }

    @action
    setMessage(msg) {
        this.message = msg;
    }

    @action
    addMessage(message) {
        this.messages.push(message);
    }

    @action
    setToken(token) {
        this.token = token;
    }

    @action
    mock() {
        this.user = {
            nick_name: 'fyy'
        }
    }
}