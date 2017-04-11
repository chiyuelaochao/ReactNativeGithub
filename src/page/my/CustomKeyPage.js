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
    TouchableOpacity
} from 'react-native';

import NavigationBar from "../../component/NavigationBar";

export default class CustomKeyPage extends Component {
    render() {
        return <View style={styles.container}>
            <NavigationBar title='Custom Key'/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});