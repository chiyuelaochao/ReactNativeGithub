/**
 * Created by Cai Wei on 4/6/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import NavigationBar from '../component/NavigationBar'
import CustomKeyPage from './my/CustomKeyPage'

export default class MyPage extends Component {
    goToCustomKeyPage() {
        this.props.navigator.push({
            component: CustomKeyPage
        });
    }

    renderRightBtn() {
        return <TouchableOpacity
            activeOpacity={0.7}>
            <Image source={require('../../res/images/ic_more_vert_white_48pt.png')} style={styles.navBtn}/>
        </TouchableOpacity>
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title='My' rightBtn={this.renderRightBtn()}/>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text onPress={this.goToCustomKeyPage.bind(this)}>
                        Custom Category
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10
    },
    navBtn: {
        width: 24,
        height: 24
    }
});