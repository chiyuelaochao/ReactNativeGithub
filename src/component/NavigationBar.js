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
        return <View style={styles.container}>
            <View>
                <StatusBar hidden={false} barStyle="light-content"/>
            </View>
            <View style={styles.navBar}>
                <View style={styles.LeftBtn}>

                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={styles.rightBtn}>
                    <TouchableOpacity
                        activeOpative={0.7}>
                        <Image source={require('../../res/images/ic_search_white_48pt.png')} style={styles.navBtn}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}>
                        <Image source={require('../../res/images/ic_more_vert_white_48pt.png')} style={styles.navBtn}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
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
    navBtn: {
        width: 24,
        height: 24
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