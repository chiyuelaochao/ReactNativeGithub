/**
 * Created by Cai Wei on 4/20/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    WebView,
    AsyncStorage,
} from 'react-native';

import NavigationBar from '../component/NavigationBar'

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canGoBack: false,
            favoritePopularData: [],
            isFavorite: false
        };
    }

    handleBack = ()=> {
        if (this.state.canGoBack) {
            this.refs.webview.goBack();
        } else {
            this.props.navigator.pop();
        }
    };

    renderLeftBtn() {
        return <View style={styles.navBtn}>
            <TouchableOpacity
                activeOpative={0.7}
                onPress={this.handleBack}>
                <Image source={require('../../res/images/ic_arrow_back_white_36pt.png')} style={styles.navBtn}/>
            </TouchableOpacity>
        </View>

    }

    renderRightBtn = ()=> {
        return <View style={{flexDirection:'row'}}>
            <TouchableOpacity activeOpacity={0.5}>
                <Image
                    style={{width:20,height:20,marginRight:10,tintColor:'#FFF'}}
                    source={require('../../res/images/ic_share.png')}/>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}
                              onPress={this.onFavoriteClick}>
                <Image
                    style={{width:20,height:20,marginRight:10}}
                    source={this.state.isFavorite?require("../../res/images/ic_star.png")
                        :require("../../res/images/ic_unstar_transparent.png")}/>
            </TouchableOpacity>
        </View>;
    };

    render() {
        // console.log(this.props.title + ',' + this.props.url);
        return <View style={styles.container}>
            <NavigationBar title={this.props.title} leftBtn={this.renderLeftBtn()} rightBtn={this.renderRightBtn()}/>
            <WebView
                ref="webview"
                startInLoadingState={true}
                source={{uri:this.props.url}}
                onNavigationStateChange={this.handleNavStateChange}/>
        </View>
    }

    handleNavStateChange = (s)=> {
        //是否能够返回，存入状态
        this.setState({canGoBack: s.canGoBack});
    };
    onFavoriteClick = ()=> {
        if (this.state.isFavorite) {
            console.log('do remove');
        } else {
            // do remove
            console.log('do save');
            this.addToFavoritePopularData(this.props.item);
        }
        this.setState({isFavorite: !this.state.isFavorite});

    };

    componentWillMount() {
        this.getFavoritePopularData();
    };

    saveFavoritePopularData = ()=> {
        AsyncStorage.setItem('favorite_popular', JSON.stringify(this.state.favoritePopularData))
            .then(()=> {
                // this.refs.toast.show('Save success');
            });
    };

    getFavoritePopularData = ()=> {
        AsyncStorage.getItem('favorite_popular').then((value)=> {
            if (value != null) {
                this.setState({favoritePopularData: JSON.parse(value)});
                console.log(this.state.favoritePopularData);
                let is = false;
                this.state.favoritePopularData.map((item, i)=> {
                    if (this.props.url == item.html_url) {
                        console.log('isFavorite true');
                        is = true;
                        console.log(is);
                    }
                    this.setState({isFavorite: is});
                });
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
        // this.setState({isFavorite: this.isFavorite(obj.html_url)});
        console.log(this.state.favoritePopularData);
    };
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