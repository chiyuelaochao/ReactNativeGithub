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

    render() {
        return <View style={styles.container}>
            <NavigationBar title='My'/>
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
        backgroundColor: 'green'
    },
    buttonWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10
    }
});