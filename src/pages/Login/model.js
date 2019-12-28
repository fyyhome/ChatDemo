import {
    observable,
    action,
    computed
} from 'mobx';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export default class HomeModel {
    @observable user;
    @observable password;
    @observable avatar_url;
    @observable subtitle;
    @observable type;
    @observable tip = false;
    @observable tipText = '';
    @observable file = {};

    constructor() {
        this.user = '';
        this.password = '';
        this.type = LOGIN;
    }

    @action
    setUser(user) {
        this.user = user || '';
    }

    @action
    setPassword(password) {
        this.password = password || '';
    }

    @action
    setAvatarUrl(url) {
        this.avatar_url = url || '';
    }

    @action
    setType(type) {
        this.type = type
    }

    @action
    setTip(tip) {
        this.tip = tip;
    }

    @action
    setTipText(tipText) {
        this.tipText = tipText;
    }

    @action
    setFile(file) {
        this.file = file;
    }

    @action
    setSubtitle(subtitle) {
        this.subtitle = subtitle;
    }
}