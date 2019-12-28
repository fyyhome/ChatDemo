import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {
    Header, Input, Button, Avatar, Text
} from 'react-native-elements';
import {
    NavigationEvents
} from 'react-navigation';
import {
    observer,
    inject
} from 'mobx-react';
import WS from '../../utils/websocket';
import Storage from '../../utils/storage';
import style from '../Login/style';
import { Screen } from '../../utils/screen';
import { ScrollView } from 'react-native-gesture-handler';

export const MESSAGE_TYPE = {
    SEND: 'SEND',
    RECIVE: 'RECIVE'
};
export const AVATAR = 'AVATAR';
export const MESSAGE = 'MESSAGE';

@inject('chatStore', 'baseStore')
@observer
export default class ChatView extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.chatStore;
        this.baseStore = this.props.baseStore;
    }

    initWs() {
        this.ws = new WS(`/?token=${this.baseStore.token}&friend=${this.store.user.id}`, '', {
            dumpLimit: 10
        });
        this.ws.init({
            onopen: () => console.log('ws open!'),
            onerror: (e) => console.log('error! ' + e.message),
            onclose: () => console.log('ws close'),
            onmessage: (e) => {
                this.store.addMessage({
                    type: MESSAGE_TYPE.RECIVE,
                    message: e.data,
                    time: +new Date()
                })
            }
        })

        console.log(this.props.navigation.state.routeName);
    }

    sendMsg() {
        this.ws.socket.send(this.store.message);
        this.store.addMessage({
            type: MESSAGE_TYPE.SEND,
            message: this.store.message,
            time: +new Date()
        })
    }

    onMessageChange = text => {
        this.store.setMessage(text);
    }

    renderMsg(uri, msg, type, key) {
        const view = {
            [AVATAR]: <Avatar
                rounded
                source={{
                    uri: uri
                }}
                containerStyle={{
                    marginLeft: 15,
                    marginRight: 15
                }}
            />,
            [MESSAGE]: <Text
                style={{
                    maxWidth: 200,
                    marginTop: 10,
                    padding: 10,
                    borderStyle: "solid",
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: "#f1f1f1",
                    backgroundColor: "#2089dc"
                }}
            >{msg}</Text>
        };
        const priority = type === MESSAGE_TYPE.SEND ? [MESSAGE, AVATAR] : [AVATAR, MESSAGE];
        const containStyle = type === MESSAGE_TYPE.SEND ? {
            justifyContent: 'flex-end'
        } : {
            justifyContent: 'flex-start'
        };

        return (
            <View style={{
                display: "flex",
                flexDirection: "row",
                ...containStyle
            }} key={key}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    marginBottom: 20
                }}>
                   {priority.map((key) => view[key])}
                </View>
            </View>
        )
    }

    render() {
        return (
            <>
                <NavigationEvents
                    onDidFocus={() => {
                        const user = this.props.navigation.getParam('user', {});
                        console.log(user, 'user');
                        this.store.setUser(user);
                        this.initWs();
                    }}
                />
                <Header
                    centerComponent={{
                        text: this.store.user.nick_name,
                        style: {
                            fontSize: 24
                        }
                    }}
                    containerStyle={{
                        height: 60,
                        backgroundColor: '#f1f1f1'
                    }}
                />
                <ScrollView style={{
                    marginBottom: 100
                }}>
                    {this.store.messages.map((item, index) => this.renderMsg(this.store.user.avatar_url, item.message, item.type, index))}
                </ScrollView>
                <View style={{
                    position: "absolute",
                    bottom: 0,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around"
                }}>
                    <Input
                        multiline={true}
                        containerStyle={{
                            width: 300,
                            height: 100
                        }}
                        onChangeText={this.onMessageChange}
                    />
                    <Button
                        title='发送'
                        containerStyle={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 100,
                            height: 50
                        }}
                        onPress={() => {this.sendMsg()}}
                    />
                </View>
            </>
        )
    }
}