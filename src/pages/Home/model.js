import {
    observable,
    action,
    computed
} from 'mobx';

export default class HomeModel {
    @observable friendList;

    constructor() {
        this.friendList = [];
        // this.mock();
    }

    @action
    setFriendList(list) {
        this.friendList = list || [];
    }

    mock() {
        this.friendList = [
            {
                nick_name: 'fyy001',
                avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                subtitle: 'hhhhhhhhhhhhh'
            },
            {
                nick_name: 'fyy002',
                avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                subtitle: '你好了噜啦啦噜啦啦'
            }
        ]
    }
}