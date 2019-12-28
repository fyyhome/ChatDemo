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

@inject('homeStore', 'baseStore')
@observer
export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.homeStore;
        this.baseStore = this.props.baseStore;
    }

    render() {
        return (
            <>
                <Header
                    centerComponent={{
                        text: '联系人',
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
                            />
                        ))
                    }
                </View>
            </>
        )
    }
}

