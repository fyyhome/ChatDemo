import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import { Screen } from '../../utils/screen';

export default class Modal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{
                width: 200,
                height: 200,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.3)',
                position: "absolute",
                top: Screen.height / 2 - 100,
                left: Screen.width / 2 - 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    width: 100,
                    textAlign: "center",
                    color: 'white'
                }}>
                    {this.props.content}
                </Text>
            </View>
        )
    }
}
