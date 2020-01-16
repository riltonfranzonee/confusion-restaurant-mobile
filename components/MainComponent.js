import React from 'react'
import Menu from './MenuComponent'
import Home from './HomeComponent'
import Dishdetail from './DishDetailComponent'
import {View, Platform} from 'react-native'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation'
import Constants from 'expo-constants';


const MenuNavigator = createStackNavigator({
    Menu: {screen: Menu},
    Dishdetail: {screen: Dishdetail}
},{
    initialRouteName: 'Menu',
    navigationOptions:{
        headerStyle:{
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTItleStyle:{
            color: '#fff'
        }
    }
})

const HomeNavigator  = createStackNavigator({
    Home: {screen: Home},
},{
    navigationOptions:{
        headerStyle:{
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTItleStyle:{
            color: '#fff'
        }
    }
})

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions:{
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions:{
            title: 'Menu',
            drawerLabel: 'Menu'
        }
    }
},{
    drawerBackgroundColor: '#d1c4e9'
})


export default class Main extends React.Component{ 
   
    static navigationOptions = {
        title: 'Menu'
    }
     render(){
         return(
             <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
               <MainNavigator />
            </View>
         )
     }
}