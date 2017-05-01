/**
 * Created by Cai Wei on 5/1/2017.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Popover from "./Popover";

export const MORE_MENU = {
    Custom_key: 'Custom Category',
    Sort_Key: 'Category Sort',
    Share: 'Sharing'
};

export default class MenuMore extends Component {
    static propTypes = {
        anchorView: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: []
        };
    }

    showPopover = ()=> {
        let anchorView = this.props.anchorView();
        anchorView.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    };

    closePopover = ()=> {
        this.setState({isVisible: false});
    };

    handleOptionSelect = (k, v)=> {
        switch (k) {
            case MORE_MENU.Share:
                //分享
                break;
        }
        this.closePopover();
    };

    renderOptions = ()=> {
        var views = [];
        for (let opt in MORE_MENU) {
            views.push(<TouchableOpacity key={`pop_${opt}`} onPress={()=>this.handleOptionSelect(opt,MORE_MENU[opt])}>
                <Text style={{fontSize:18,color:'#FFF',padding:8}}>{MORE_MENU[opt]}</Text>
            </TouchableOpacity>);
        }
        return <View style={{alignItems:'center'}}>
            {views}
        </View>;
    };

    render() {
        return <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            onClose={this.closePopover}
            contentStyle={{backgroundColor:'#343434',opacity:0.8}}
            placement="bottom">
            {this.renderOptions()}
        </Popover>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});