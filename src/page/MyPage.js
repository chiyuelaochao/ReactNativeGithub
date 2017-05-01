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
import SortKeyPage from './my/SortKeyPage'
import ToastAndroid from '../component/ToastAndroid'
import DialogAndroid from '../component/DialogAndroid'

export default class MyPage extends Component {
    goToPage(key) {
        let page;
        if (key === 'Custom') {
            page = CustomKeyPage;
        } else if (key === 'Sort') {
            page = SortKeyPage;
        }
        this.props.navigator.push({
            component: page
        });
    }

    showAndroidNative(){
        DialogAndroid.alert(result=>{
            ToastAndroid.show(result,ToastAndroid.LONG);
        },error=>{
            console.log(error);
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
                    <Text onPress={this.goToPage.bind(this,'Custom')}>
                        Custom Category
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text onPress={this.goToPage.bind(this,'Sort')}>
                        Category Sort
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text onPress={this.showAndroidNative}>
                        Android Native
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