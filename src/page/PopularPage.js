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
    AsyncStorage
} from 'react-native';

import NavigationBar from '../component/NavigationBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import ProjectRow from '../component/ProjectRow'

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
            ]
        };
    }

    renderRightBtn() {
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
    }

    render() {
        console.log('render');
        return <View style={styles.container}>
            <NavigationBar title='Popular' rightBtn={this.renderRightBtn()}/>
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="silver"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                {
                    this.state.languages.map((item, i)=> {
                        return item.isChecked ? <PopularTab key={`tab${i}`} tabLabel={item.name}/> : null;
                    })
                }
            </ScrollableTabView>
        </View>
    }

    componentWillMount = ()=> {
        console.log('componentWillMount');
        this.loadLanguages();
    }
    componentDidMount = ()=> {
        console.log('componentDidMount');
    }

    loadLanguages = ()=> {
        AsyncStorage.getItem('custom_key').then((value)=> {
            if (value != null) {
                this.setState({languages: JSON.parse(value)});
                console.log(this.state.languages);
            }
        });
    }
}

class PopularTab extends Component {
    static defaultProps = {
        tabLabel: 'Android'
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}), //是一个优化，节省无用的UI渲染
            isLoading: true
        };
    }

    renderRow(obj) {
        return <ProjectRow item={obj}/>
    }

    handleRefresh = ()=> {
        this.loadData();
    }

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
                    title='loding'
                    titleColor='#63B8FF'
                    colors={['#63B8FF']}
                    />
                }
            />
        </View>
    }

    componentDidMount = ()=> {
        this.loadData();
    }

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
        justifyContent: 'flex-end',
    },
    navBtn: {
        width: 24,
        height: 24
    }
});