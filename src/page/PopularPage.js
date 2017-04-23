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
import ProjectRow from '../component/ProjectRow'
import DetailPage from './DetailPage'

export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: [
                {name: 'Android', isChecked: true},
                {name: 'IOS', isChecked: false},
                {name: 'Java', isChecked: true},
                {name: 'React', isChecked: true},
                {name: 'JS', isChecked: true}
            ],
            favoritePopularData: []
        };
    }

    renderRightBtn = () => {
        return <View style={styles.rightBtn}>
            <TouchableOpacity
                activeOpative={0.7}>
                <Image source={require('../../res/images/ic_search_white_48pt.png')} style={styles.navBtn}/>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}>
                <Image source={require('../../res/images/ic_more_vert_white_48pt.png')} style={styles.navBtn}/>
            </TouchableOpacity>
        </View>
    };

    render() {
        // console.log('render');
        return <View style={styles.container}>
            <NavigationBar title='Popular' rightBtn={this.renderRightBtn()}/>
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="silver"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                {
                    this.state.languages.map((item, i)=> {
                        return item.isChecked
                            ? <PopularTab
                            {...this.props}
                            key={`tab${i}`}
                            tabLabel={item.name}
                            isFavorite={(item)=>this.isFavorite(item)}
                            onFavorite={(obj)=>this.addToFavoritePopularData(obj)}/>
                            : null;
                    })
                }
            </ScrollableTabView>
        </View>
    }

    componentWillMount() {
        this.loadLanguages();
        this.getFavoritePopularData();
    };

    loadLanguages = ()=> {
        AsyncStorage.getItem('custom_key').then((value)=> {
            if (value != null) {
                this.setState({languages: JSON.parse(value)});
                // console.log(this.state.languages);
            }
        });
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
                this.setState({favoritePopularData: JSON.parse(value)});
                console.log(this.state.favoritePopularData);
            }
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

    isFavorite = (obj)=> {
        let is = this.state.favoritePopularData.indexOf(obj) != -1;
        console.log(is);
        return is;
    };


    remove = (arr, item)=> {
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === item) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }
}

class PopularTab extends Component {
    static defaultProps = {
        tabLabel: 'Android'
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}), //是一个优化，节省无用的UI渲染
            isLoading: true
        };
    }

    handleProjectSelect = (obj)=> {
        this.props.navigator.push({
            component: DetailPage,
            params: {title: obj.full_name, url: obj.html_url, item: obj}
        });
    };

    renderRow = (obj)=> {
        return <ProjectRow
            item={obj}
            onSelect={()=>this.handleProjectSelect(obj)}
            onFavoriteClick={()=>this.props.onFavorite(obj)}
            isFavorite={()=>this.props.isFavorite(obj)}
        />
    };

    /*handleFavorite = (obj)=> {
     console.log('handleFavorite');
     console.log(obj);
     };*/

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

    handleRefresh = ()=> {
        this.loadData();
    };

    componentDidMount() {
        this.loadData();
    };

    loadData() {
        this.setState({isLoading: true});
        fetch(`https://api.github.com/search/repositories?q=${this.props.tabLabel}&sort=stars`)
            .then(response=>response.json())
            .then(json=> {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(json.items),
                    isLoading: false
                })
            })
            .catch((error)=> {
                console.log(error);
            })
            .done();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    rightBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    navBtn: {
        width: 24,
        height: 24
    }
});