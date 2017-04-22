/**
 * Created by Cai Wei on 4/11/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';
import HomePage from './src/page/HomePage';

export default function AppSetup() {

    class Root extends Component {
        renderScene(route, navigator) {
            let Page = route.component;
            return <Page {...route.params} navigator={navigator}/>
        }

        /*
         initialRoute初始化路由，传入组件的名称
         在renderScene（渲染场景）中完成页面跳转
         renderScene指定一个函数，函数会被传入route和navigator对象，返回一个需要跳转到的页面
         route（transition路由）类似于intent，component类似于intent.setComponent()
         renderScene类似于startActivity，会传入intent，这里传入的route

         传参：{{component : HomePage,params:{title:'ABC'}}}
         configureScene={route=>Navigator.SceneConfigs.FadeAndroid} 设置动画*/

        render() {
            return (
                <View style={styles.container}>
                    <Navigator
                        initialRoute={{component:HomePage}}
                        renderScene={(route,navigator)=>this.renderScene(route,navigator)}
                    />
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1
        }
    });

    return <Root/>;
}