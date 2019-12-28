import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {
    ListItem,
    Header
} from 'react-native-elements';
import {
    observer,
    inject
} from 'mobx-react';

@inject('messageStore', 'baseStore')
@observer
export default class MessageView extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.messageStore;
        this.baseStore = this.props.baseStore;
    }

    render() {
        return (
            <>
                <Header
                    centerComponent={{
                        text: '消息',
                        style: {
                            fontSize: 24
                        }
                    }}
                    containerStyle={{
                        height: 60,
                        backgroundColor: '#f1f1f1'
                    }}
                />
                <View>
                    {
                        this.baseStore.friendList.map((item, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{ source: { uri: item.avatar_url } }}
                                title={item.nick_name}
                                subtitle={item.subtitle}
                                bottomDivider
                                onPress={() => {this.props.navigation.navigate('Chat', {
                                    user: item
                                })}}
                            />
                        ))
                    }
                </View>
            </>
        )
    }
}

