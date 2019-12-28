import {
    View,
    Image,
    ImageBackground,
    PermissionsAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import React, { Component } from 'react';
import {
    Input,
    Icon,
    Button,
    Avatar,
} from 'react-native-elements';
import {
    observer,
    inject
} from 'mobx-react';
import styles from './style';
import Storage from '../../utils/storage';
import {post} from '../../utils/fetch';
import {
    LOGIN,
    REGISTER
} from './model';
import Modal from '../../components/Modal';
import {
    uploadImage
} from '../../api-services/index';

@inject('loginStore', 'baseStore')
@observer
export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.loginStore;
        this.baseStore = this.props.baseStore;
    }

    componentDidMount() {
        this.getPermission();
    }

    onUserChange = text => {
        this.store.setUser(text);
    }

    onPasswordChange = text => {
        this.store.setPassword(text);
    }

    onSubtitleChange = text => {
        this.store.setSubtitle(text);
    }

    async getPermission() {
        try {
            //返回string类型
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    'title': '我要读写权限',
                    'message': '没权限我不能工作，同意就好了'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("你已获取了读写权限")
            } else {
                console.log("获取读写权限失败")
            }
        } catch (err) {
            console.log(err.toString())
        }
    }
    
    uploadAvatar = () => {
        const options = {
            title: '选择照片',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.store.setFile({uri: response.uri, type: 'multipart/form-data', name: 'image.png'});
                this.store.setAvatarUrl(source)
            }
        });
    }

    login = async () => {
        // let token = await Storage.load({
        //     key: 'token',
        // });
        if (true) {
            try {
                const res = await post('/api/login', {
                    nick_name: this.store.user,
                    password: this.store.password,
                    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
                });
                if (res.status === 'ok') {
                    // Storage.save({
                    //     key: 'token',
                    //     data: res.data.token,
                    // });
                    this.baseStore.setToken(res.data.token);
                    const userRes = await post('/api/userInfo', {
                        token: this.baseStore.token
                    });
                    if (userRes.status === 'ok') {
                        const userInfo = userRes.data;
                        this.baseStore.setUserInfo({
                            nick_name: userInfo.nick_name,
                            avatar_url: userInfo.avatar_url,
                            subtitle: userInfo.subtitle,
                        });
                        console.log(userInfo);
                        this.baseStore.setFriendList(userInfo.friends);
                    }
                    this.props.navigation.navigate('App');
                } else {
                    console.log(res);
                }
            } catch (error) {
                console.log(error)
            } 
        }
    }

    register = async () => {
        try {
            const res = await post('/api/register', {
                nick_name: this.store.user,
                password: this.store.password,
                subtitle: this.store.subtitle,
            });
            const avatarRes = await uploadImage(this.store.file, this.store.user);
            if (res.status === 'ok' && avatarRes.status === 'ok') {
                this.store.setTipText('注册成功！');
                this.store.setTip(true);
                setTimeout(() => {
                    this.store.setTip(false);
                    this.store.setType(LOGIN);
                }, 800);
            } else {
                this.store.setTipText('注册失败！');
                this.store.setTip(true);
                setTimeout(() => {
                    this.store.setTip(false);
                }, 800);
            }
            console.log(res, 'register');
        } catch (error) {
            console.log(error)
        }
    }

    renderLogin() {
        return (
            <View>
                <Input
                    placeholder='学号'
                    onChangeText={this.onUserChange}
                    leftIcon={
                        <Icon
                            type='entypo'
                            name='user'
                            size={24}
                            color='gray'
                        />
                    }
                    containerStyle={{
                        width: 300,
                        marginBottom: 10
                    }}
                />
                <Input
                    placeholder='密码'
                    secureTextEntry={true}
                    onChangeText={this.onPasswordChange}
                    leftIcon={
                        <Icon
                            type='entypo'
                            name='lock'
                            size={24}
                            color='gray'
                        />
                    }
                    containerStyle={{
                        width: 300,
                        marginBottom: 10
                    }}
                />
            </View>
        )
    }

    renderRegister() {
        return (
            <View>
                <Input
                    placeholder='学号'
                    onChangeText={this.onUserChange}
                    leftIcon={
                        <Icon
                            type='entypo'
                            name='user'
                            size={24}
                            color='gray'
                        />
                    }
                    containerStyle={{
                        width: 300,
                        marginBottom: 10
                    }}
                />
                <Input
                    placeholder='密码'
                    secureTextEntry={true}
                    onChangeText={this.onPasswordChange}
                    leftIcon={
                        <Icon
                            type='entypo'
                            name='lock'
                            size={24}
                            color='gray'
                        />
                    }
                    containerStyle={{
                        width: 300,
                        marginBottom: 10
                    }}
                />
                <Input
                    placeholder='无签名，不个性'
                    onChangeText={this.onSubtitleChange}
                    leftIcon={
                        <Icon
                            type='entypo'
                            name='user'
                            size={24}
                            color='gray'
                        />
                    }
                    containerStyle={{
                        width: 300,
                        marginBottom: 10
                    }}
                />
            </View>
        )
    }

    render() {
        const view = {
            [LOGIN]: this.renderLogin(),
            [REGISTER]: this.renderRegister()
        }
        return (
            <ImageBackground source={require('../../assets/images/app-background.jpg')} style={styles.containerBackground}>
                <View style={styles.container}>
                    <View style={styles.contentWrap}>
                        <Avatar
                            size='large'
                            rounded
                            source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
                            }}
                            onPress={() => this.uploadAvatar()}
                        >
                        </Avatar>
                        <View>
                            {view[this.store.type]}
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <Button
                                    title='登录'
                                    containerStyle={{
                                        width: 80,
                                    }}
                                    buttonStyle={{
                                        borderWidth: 0,
                                        backgroundColor: 'rgba(0,0,0,0)'
                                    }}
                                    onPress={() => this.store.setType(LOGIN)}
                                />
                                <Button
                                    title='注册'
                                    containerStyle={{
                                        width: 80
                                    }}
                                    buttonStyle={{
                                        borderWidth: 0,
                                        backgroundColor: 'rgba(0,0,0,0)'
                                    }}
                                    onPress={() => this.store.setType(REGISTER)}
                                />
                            </View>
                            <View>
                                <Button
                                    title={this.store.type === LOGIN ? '登录' : '注册'}
                                    type='solid'
                                    titleStyle={{
                                        fontSize: 24,
                                    }}
                                    containerStyle={{
                                        width: 100,
                                        marginTop: 30,
                                        marginLeft: 20,
                                        marginRight: 20,
                                        alignSelf: "center",
                                    }}
                                    onPress={() => {
                                        this.store.type === LOGIN ?
                                            this.login() : this.register();
                                    }}
                                />
                            </View>
                        </View>

                        <View>
                            
                        </View>
                    </View>
                </View>
                {this.store.tip ? (
                    <Modal
                        content={this.store.tipText}
                    />
                ) : null}
            </ImageBackground>
        )
    }
}
