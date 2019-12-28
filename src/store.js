import HomeModel from './pages/Home/model';
import LoginModel from './pages/Login/model';
import MessageModel from './pages/Message/model';
import ChatModel from './pages/Chat/model';
import BaseModel from './baseModel';

export default {
    homeStore: new HomeModel(),
    loginStore: new LoginModel(),
    messageStore: new MessageModel(),
    chatStore: new ChatModel(),
    baseStore: new BaseModel(),
}
