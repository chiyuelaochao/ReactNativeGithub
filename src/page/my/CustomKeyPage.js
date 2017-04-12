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
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import NavigationBar from "../../component/NavigationBar";
import CheckBox from 'react-native-check-box'
import Toast from "react-native-easy-toast";

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Android', isChecked: true},
                {name: 'IOS', isChecked: false},
                {name: 'Java', isChecked: true},
                {name: 'React', isChecked: true},
                {name: 'JS', isChecked: true}
            ]
        }
    }

    renderLeftBtn() {
        return <View style={styles.navBtn}>
            <TouchableOpacity
                activeOpative={0.7}>
                <Image source={require('../../../res/images/ic_arrow_back_white_36pt.png')} style={styles.navBtn}/>
            </TouchableOpacity>
        </View>

    }

    handleSave() {
        AsyncStorage.setItem('custom_key', JSON.stringify(this.state.data))
            .then(()=>this.refs.toast.show('Save success'));
    }

    renderRightBtn() {
        return <TouchableOpacity
            activeOpative={0.7}>
            <Text style={{color:'white',alignContent:'center'}} onPress={this.handleSave.bind(this)}>
                Save
            </Text>
        </TouchableOpacity>
    }

    handleClick(item) {
        item.isChecked = !item.isChecked;
        console.log(item);
    }

    renderCheckBox() {
        return this.state.data.map((item, i)=> {
            return <CheckBox
                key={`box${i}`}
                style={styles.checkboxStyle}
                onClick={this.handleClick.bind(this,item)}
                leftText={item.name}
                isChecked={item.isChecked}
                unCheckedImage={<Image source={require('../../../res/images/ic_check_box_outline_blank.png')} style={styles.checkbox}/>}
                checkedImage={<Image source={require('../../../res/images/ic_check_box.png')} style={styles.checkbox}/>}
            />
        })
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title='Custom Key' leftBtn={this.renderLeftBtn()} rightBtn={this.renderRightBtn()}/>
            <View style={styles.checkBoxContainer}>
                {this.renderCheckBox()}
            </View>
            <Toast ref='toast'/>
        </View>
    }

    componentDidMount() {
        //加载本地数据
        AsyncStorage.getItem('custom_key').then(value=> {
            if (value !== null) {
                // this.setState({data: JSON.parse(value)});
                console.log(value);
            }
        });

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    checkBoxContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'column'
    },
    navBtn: {
        width: 24,
        height: 24
    },
    checkbox: {
        tintColor: '#63B8FF'
    },
    checkboxStyle: {
        marginTop: 3,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        padding: 5
    }
});