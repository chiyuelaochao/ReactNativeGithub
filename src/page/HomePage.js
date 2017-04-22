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
    DeviceEventEmitter
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import PopularPage from '../../src/page/PopularPage';
import TrendingPage from '../../src/page/TrendingPage';
import FavoritePage from '../../src/page/FavoritePage';
import MyPage from './MyPage';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'popular'
        }
    }

    render() {
        return <View style={styles.container}>
            <TabNavigator>

                <TabNavigator.Item
                    onPress={()=>this.setState({selectedTab:'popular'})}
                    selected={this.state.selectedTab==='popular'}
                    title="Popular"
                    selectedTitleStyle={styles.selectedTitleStyle}
                    renderSelectedIcon={()=><Image style={[styles.icon,styles.selectedIconStyle]} source={require('../../res/images/ic_popular.png')}/>}
                    renderIcon={()=><Image style={styles.icon} source={require('../../res/images/ic_popular.png')}/>}>

                    <PopularPage {...this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    onPress={()=>this.setState({selectedTab:'trending'})}
                    selected={this.state.selectedTab==='trending'}
                    title="Trending"
                    selectedTitleStyle={styles.selectedTitleStyle}
                    renderSelectedIcon={()=><Image style={[styles.icon,styles.selectedIconStyle]} source={require('../../res/images/ic_trending.png')}/>}
                    renderIcon={()=><Image style={styles.icon} source={require('../../res/images/ic_trending.png')}/>}>

                    <TrendingPage/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    onPress={()=>this.setState({selectedTab:'favorite'})}
                    selected={this.state.selectedTab==='favorite'}
                    title="Favorite"
                    selectedTitleStyle={styles.selectedTitleStyle}
                    renderSelectedIcon={()=><Image style={[styles.icon,styles.selectedIconStyle]} source={require('../../res/images/ic_favorite.png')}/>}
                    renderIcon={()=><Image style={styles.icon} source={require('../../res/images/ic_favorite.png')}/>}>

                    <FavoritePage/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    onPress={()=>this.setState({selectedTab:'my'})}
                    selected={this.state.selectedTab==='my'}
                    title="my"
                    selectedTitleStyle={styles.selectedTitleStyle}
                    renderSelectedIcon={()=><Image style={[styles.icon,styles.selectedIconStyle]} source={require('../../res/images/ic_my.png')}/>}
                    renderIcon={()=><Image style={styles.icon} source={require('../../res/images/ic_my.png')}/>}>

                    <MyPage {...this.props}/>
                </TabNavigator.Item>

            </TabNavigator>
        </View>
    }

    componentDidMount() {
        //添加事件监听
        this.listener = DeviceEventEmitter.addListener('HOMEPAGE_RELOAD', (n)=> {
            //Homepage reLoad and route to new page and rest the whole router
            this.props.navigator.resetTo({
                component: HomePage
            });
        });
    }

    componentWillUnmount() {
        this.listener.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        width: 26,
        height: 26
    },
    selectedTitleStyle: {
        color: '#63B8FF'
    },
    selectedIconStyle: {
        tintColor: '#63B8FF'
    }
});