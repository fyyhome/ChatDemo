import {
    observable,
    action
} from 'mobx';

export default class BaseModel {
    @observable userInfo = {};
    @observable friendList = [];
    @observable token;

    constructor() {};

    @action
    setUserInfo(userInfo) {
        Object.assign(this.userInfo, userInfo);
    }

    @action
    setToken(token) {
        this.token = token;
    }

    @action
    setFriendList(friendList) {
        this.friendList = friendList || [];
    }
}