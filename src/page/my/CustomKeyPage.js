/**
 * Created by Cai Wei on 4/11/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import NavigationBar from "../../component/NavigationBar";

export default class CustomKeyPage extends Component {
    renderLeftBtn() {
        return <View style={styles.navBtn}>
            <TouchableOpacity
                activeOpative={0.7}>
                <Image source={require('../../../res/images/ic_arrow_back_white_36pt.png')} style={styles.navBtn}/>
            </TouchableOpacity>
        </View>

    }

    renderRightBtn() {
        return <TouchableOpacity
            activeOpative={0.7}>
            <Text style={{color:'white',alignContent:'center'}}>
                Save
            </Text>
        </TouchableOpacity>
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title='Custom Key' leftBtn={this.renderLeftBtn()} rightBtn={this.renderRightBtn()}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navBtn: {
        width: 24,
        height: 24
    }
});