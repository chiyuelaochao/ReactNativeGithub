/**
 * Created by Cai Wei on 4/16/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage,
    Alert,
    DeviceEventEmitter
} from 'react-native';

import NavigationBar from "../../component/NavigationBar";
import Toast from "react-native-easy-toast";
import SortableListView from "react-native-sortable-listview";

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    handleBack = ()=> {
        this.doBack();
    }

    doBack = ()=> {
        this.props.navigator.pop();
    }

    renderLeftBtn() {
        return <View style={styles.navBtn}>
            <TouchableOpacity
                activeOpative={0.7}
                onPress={this.handleBack}>
                <Image source={require('../../../res/images/ic_arrow_back_white_36pt.png')} style={styles.navBtn}/>
            </TouchableOpacity>
        </View>
    }

    handleSave = ()=> {
        AsyncStorage.setItem('custom_key', JSON.stringify(this.state.data)).then(()=> {
            this.refs.toast.show('Save success');
            this.doBack();
            DeviceEventEmitter.emit('HOMEPAGE_RELOAD', 'HomePage_ReLoad');
        });
    }

    renderRightBtn() {
        return <TouchableOpacity
            activeOpative={0.7}
            onPress={this.handleSave}>
            <Text style={{color:'white',alignContent:'center'}}>
                Save
            </Text>
        </TouchableOpacity>
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title='Category Sort' leftBtn={this.renderLeftBtn()} rightBtn={this.renderRightBtn()}/>
            <SortableListView
                data={this.state.data}
                order={Object.keys(this.state.data)}
                renderRow={item=><RowComponent data={item}/>}
                onRowMoved={e=>{
                    //onRowMoved要返回一个在删除时传递单个对象的函数
                    //e对象有三个属性，from、to、row
                    this.state.data.splice(e.to,0,this.state.data.splice(e.from,1)[0]);
                    this.forceUpdate();
                }}/>
            <Toast ref='toast'/>
        </View>
    }

    componentDidMount = ()=> {
        AsyncStorage.getItem('custom_key').then(value=> {
            if (value !== null) {
                //只获取checked为true语言，进行排序
                /*let d = [];
                 JSON.parse(value).forEach((item)=> {
                 if (item.isChecked) d.push(item);
                 });
                 this.setState({data: d});*/
                console.log(this.state.data);
                this.setState({data: JSON.parse(value)});
            }
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    navBtn: {
        width: 24,
        height: 24
    },
    item: {
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#EEE',
        height: 50,
        justifyContent: 'center'
    },
    image: {
        width: 16,
        height: 16,
        marginRight: 10,
        tintColor: '#63B8FF'
    }
});

class RowComponent extends Component {
    static defaultProps = {
        data: {name: ''}
    }

    render() {
        return <TouchableHighlight
            underlayColor='#EEE'
            style={styles.item}
            {...this.props.sortHandlers}>
            <View style={{flexDirection:'row',paddingLeft:10}}>
                <Image source={require('../../../res/images/ic_sort.png')} style={styles.image}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}