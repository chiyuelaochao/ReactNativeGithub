/**
 * Created by Cai Wei on 4/7/2017.
 */
import React, {Component, PropTypes} from 'react';
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
    static propTypes = {
        //验证，不传element组件类型，会报错提示
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
        titleView: PropTypes.element
    }
    static defaultProps = {
        title: ''
    }

    renderTitle = ()=> {
        let view = (this.props.title.length != 0)
            ? <Text style={barStyles.title}>{this.props.title}</Text>
            : this.props.titleView;
        return <View style={barStyles.titleWrapper}>
            {view}
        </View>;
    }

    render() {
        return <View style={barStyles.container}>
            <View>
                <StatusBar hidden={false} barStyle="light-content"/>
            </View>
            <View style={barStyles.navBar}>

                <View style={barStyles.LeftBtn}>
                    {this.props.leftBtn}
                </View>

                {this.renderTitle()}

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