import {
    observable,
    action,
    computed
} from 'mobx';

export default class MessageModel {
    @observable messageList;

    constructor() {
        this.messageList = [];
        this.mock();
    }

    @action
    setMessageList(list) {
        this.messageList = list || [];
    }

    mock() {
        this.messageList = [
            {
                nick_name: 'fyy001',
                avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                subtitle: 'hhhhhhhhhhhhh',
                token: 1
            },
            {
                nick_name: 'fyy002',
                avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                subtitle: '你好了噜啦啦噜啦啦',
                token: 2
            }
        ]
    }
}