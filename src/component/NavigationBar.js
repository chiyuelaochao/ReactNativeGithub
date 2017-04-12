/**
 * Created by Cai Wei on 4/7/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    TouchableOpacity
} from 'react-native';


export default class NavigationBar extends Component {
    render() {
        return <View style={barStyles.container}>
            <View>
                <StatusBar hidden={false} barStyle="light-content"/>
            </View>
            <View style={barStyles.navBar}>
                <View style={barStyles.LeftBtn}>
                    {this.props.leftBtn}
                </View>
                <View style={barStyles.titleWrapper}>
                    <Text style={barStyles.title}>{this.props.title}</Text>
                </View>
                <View style={barStyles.rightBtn}>
                    {this.props.rightBtn}
                </View>
            </View>
        </View>
    }
}

 const barStyles = StyleSheet.create({
    container: {
        backgroundColor: '#63B8FF',
        padding: 5,
    },
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : 0
    },
    navBar: {
        flexDirection: 'row',
    },
    LeftBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rightBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    titleWrapper: {
        flex: 2,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#FFF'
    }
});