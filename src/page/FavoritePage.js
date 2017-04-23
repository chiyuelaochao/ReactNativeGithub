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
    ListView,
    RefreshControl,
    TouchableOpacity,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import NavigationBar from '../component/NavigationBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DetailPage from './DetailPage'
import ProjectRow from "../component/ProjectRow";

export default class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {name: 'Popular'},
                {name: 'Trending'}
            ]
        };
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title='Favorite'/>
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="silver"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                {
                    this.state.categories.map((item, i)=> {
                        return <FavoriteTab {...this.props} key={`tab${i}`} tabLabel={item.name}/>;
                    })
                }
            </ScrollableTabView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});


class FavoriteTab extends Component {
    static defaultProps = {
        tabLabel: 'Popular'
    };

    constructor(props) {
        super(props);
        this.state = {
            favoritePopularData: [],
            //是一个优化，节省无用的UI渲染
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: true
        };
    }

    handleProjectSelect = (obj)=> {
        this.props.navigator.push({
            component: DetailPage,
            params: {title: obj.full_name, url: obj.html_url}
        });
    };

    renderRow = (obj)=> {
        return <ProjectRow item={obj} onSelect={()=>this.handleProjectSelect(obj)}/>
    };

    handleRefresh = ()=> {
        this.getFavoritePopularData();
    };

    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={this.handleRefresh}
                    tintColor='#63B8FF'
                    title='loading...'
                    titleColor='#63B8FF'
                    colors={['#63B8FF']}
                    />
                }
            />
        </View>
    }

    componentDidMount() {
        this.getFavoritePopularData();
    };

    saveFavoritePopularData = ()=> {
        AsyncStorage.setItem('favorite_popular', JSON.stringify(this.state.favoritePopularData))
            .then(()=> {
                this.refs.toast.show('Save success');
            });
    };

    getFavoritePopularData = ()=> {
        AsyncStorage.getItem('favorite_popular').then((value)=> {
            if (value != null) {
                this.setState({
                    favoritePopularData: JSON.parse(value),
                    dataSource: this.state.dataSource.cloneWithRows(JSON.parse(value)),
                    isLoading: false
                });
            }
            // console.log(this.state.favoritePopularData);
            console.log(this.state.dataSource);
        });
    };

    addToFavoritePopularData = (obj)=> {
        if (this.state.favoritePopularData.indexOf(obj) == -1) {
            this.state.favoritePopularData.push(obj);
        }
        /*else {
         this.setState({
         favoritePopularData: remove(this.state.favoritePopularData, obj)
         });
         }*/
        this.saveFavoritePopularData();
        console.log(this.state.favoritePopularData);
    };
}