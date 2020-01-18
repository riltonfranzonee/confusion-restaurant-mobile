import React from 'react'
import Menu from './MenuComponent'
import Home from './HomeComponent'
import Dishdetail from './DishDetailComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import Reservation from './ReservationComponent'
import {View, Platform, StyleSheet, ScrollView, Image, Text} from 'react-native'
import {createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation'
import Constants from 'expo-constants';
import { Icon } from 'react-native-elements'



const MenuNavigator = createStackNavigator({
    Menu: {screen: Menu,
        navigationOptions:({navigation}) => ({
            headerLeft: <View style={{marginLeft:10}}>
                            <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()} />
                        </View>
        }) 
        },
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
    navigationOptions: ({navigation}) =>({
        
        headerStyle:{
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTItleStyle:{
            color: '#fff'
        },
        headerLeft: <View style={{marginLeft:10}}>
                        <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()} />
                    </View>
    })
})

const ContactNavigator = createStackNavigator({
    Contact: {screen: Contact},
},{
    navigationOptions: ({navigation}) =>({
        headerStyle:{
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTItleStyle:{
            color: '#fff'
        },
        headerLeft: <View style={{marginLeft:10}}>
                        <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()} />
                    </View>
    })
})

const AboutNavigator = createStackNavigator({
    About: {screen: About},
},{
    navigationOptions:  ({navigation}) =>({
        headerStyle:{
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTItleStyle:{
            color: '#fff'
        },
        headerLeft: <View style={{marginLeft:10}}>
                        <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()} />
                    </View>
    })
})

const ReservationNavigator = createStackNavigator({
    Reservation: {screen: Reservation},
},{
    navigationOptions: ({navigation}) =>({
        headerStyle:{
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTItleStyle:{
            color: '#fff'
        },
        headerLeft: <View style={{marginLeft:10}}>
                        <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()} />
                    </View>
    })
})


const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage}/>
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
)




const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions:{
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({tintColor}) => (<Icon name='home' type='font-awesome' size={24} color={tintColor} />)
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions:{
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({tintColor}) => (<Icon name='list' type='font-awesome' size={24} color={tintColor} />)
        }
    },
    Contact:{
        screen: ContactNavigator,
        navigationOptions:{
            title: 'Contact Us',
            drawerLabel: 'Contact us',
            drawerIcon: ({tintColor}) => (<Icon name='address-card' type='font-awesome' size={22} color={tintColor} />)
            
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions:{
            title: 'About Us',
            drawerLabel: 'About us',
            drawerIcon: ({tintColor}) => (<Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />)
        }
    },
    Reservation:{
        screen: ReservationNavigator,
        navigationOptions:{
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({tintColor}) => (<Icon name='cutlery' type='font-awesome' size={24} color={tintColor} />)
            
        }
    }
},{
    drawerBackgroundColor: '#d1c4e9',
    contentComponent: CustomDrawerContentComponent
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

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    drawerHeader:{
        backgroundColor: '#512da8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    },
    drawerHeaderText:{
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage:{
        margin: 10,
        width: 80,
        height: 60
    }
})