import React from 'react'
import {Text, View,  StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native'
import {Input, Icon, CheckBox, Button} from 'react-native-elements'
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-asset';

import {createBottomTabNavigator} from 'react-navigation'
import {baseUrl} from '../shared/baseUrl'

class LoginTab extends React.Component{
    state={
        username: '',
        password: '',
        remember: false
    }

    componentDidMount(){
        SecureStore.getItemAsync('userinfo')
        .then(userdata => {
            let userinfo = JSON.parse(userdata)
            if (userinfo){
                this.setState({username: userinfo.username})
                this.setState({password: userinfo.password})
                this.setState({remember: true})

            }
        })
    }


    static navigationOptions =  {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (<Icon name='sign-in' type='font-awesome' size={24} iconStyle={{color: tintColor}}/>)
    }


    handleLogin(){
        console.log(JSON.stringify(this.state))
        if(this.state.remember){
            SecureStore.setItemAsync('userinfo', 
            JSON.stringify({username: this.state.username, password: this.state.password, }))
            .catch(error => console.log('Could not save user info', error))
        } else{
            SecureStore.deleteItemAsync('userinfo')
            .catch(error => console.log('Could not delete', error))
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Input placeholder='Username' style={styles.icon} leftIcon={{type: 'font-awesome', name: 'user-o', marginRight: 15}}
                onChangeText={username => this.setState({username})}
                value={this.state.username}
                containerStyle={styles.formInput}
                 />
                 <Input  style={styles.icon} placeholder='Password' leftIcon={{type: 'font-awesome', name: 'key', marginRight: 15}}
                onChangeText={password => this.setState({password})}
                value={this.state.password}
                containerStyle={styles.formInput}
                 />
                 <CheckBox title='Remember me' checked={this.state.remember} center 
                 onPress={() => this.setState({remember: !this.state.remember})}
                 containerStyle={styles.formCheckbox}
                  />
                  <View style={styles.formButton}>
                      <TouchableOpacity style={styles.btn} onPress={() => this.handleLogin()}>
                        <Icon style={styles.icon} name='user-o' type='font-awesome' color='white' size={24}/>
                        <Text style={styles.btnText}>Login</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.formButton}>
                    <TouchableOpacity style={styles.btnRegister} onPress={() => this.props.navigation.navigate('Register')}>
                            <Icon style={styles.icon} name='user-plus' type='font-awesome' color='#512da8' size={24}/>
                            <Text style={{color: '#512da8', fontWeight: 'bold', fontSize: 17, marginLeft: 10}}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


class RegisterTab extends React.Component {
    state={
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        remember: false,
        imageUrl: baseUrl + 'images/logo.png'
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let capturedImage = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [4,3]
            })
            if(!capturedImage.cancelled){
                this.processImage(capturedImage.uri)
            }
        }

    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if(cameraRollPermission.status === 'granted'){
            let chosenImage = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [4,3]
            })
            if(!chosenImage.cancelled){
                this.processImage(chosenImage.uri)
            }
        }

    }

    processImage = async (imageUri) => {
        let processImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: {width: 400}}
            ],
            {format: 'png'}
        )
        this.setState({imageUrl: processImage.uri})
    }

    static navigationOptions =  {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (<Icon name='user-plus' type='font-awesome' size={24} iconStyle={{color: tintColor}}/>)
    }

    handleRegister(){
      console.log(JSON.stringify(this.state))
      if(this.state.remember)
        SecureStore.setItemAsync('userinfo', 
        JSON.stringify({username: this.state.username, password: this.state.password, }))
        .catch(error => console.log('Could not save user info', error)) 
   }

    render(){
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: this.state.imageUrl}}
                    loadingIndicatorSource={require('./images/logo.png')}
                    style={styles.image}
                    />
                    <TouchableOpacity style={styles.btnCamera} onPress={this.getImageFromCamera}>
                        <Icon type='font-awesome' name='camera' color='#512da8' size={18}/><Text style={[styles.btnText, styles.cameraText]}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCamera} onPress={this.getImageFromGallery}>
                        <Icon type='font-awesome' name='image' color='#512da8' size={18}/><Text style={[styles.btnText, styles.cameraText]}>Gallery</Text>
                    </TouchableOpacity>
                </View>
                <Input placeholder='Username' style={styles.icon} leftIcon={{type: 'font-awesome', name: 'user-o', marginRight: 15}}
                onChangeText={username => this.setState({username})}
                value={this.state.username}
                containerStyle={styles.formInput}
                 />
                 <Input  style={styles.icon} placeholder='Password' leftIcon={{type: 'font-awesome', name: 'key', marginRight: 15}}
                onChangeText={password => this.setState({password})}
                value={this.state.password}
                containerStyle={styles.formInput}
                 />
                 <Input placeholder='Firstname' style={styles.icon} leftIcon={{type: 'font-awesome', name: 'user-o', marginRight: 15}}
                onChangeText={firstname => this.setState({firstname})}
                value={this.state.firstname}
                containerStyle={styles.formInput}
                 />
                 <Input placeholder='Lastname' style={styles.icon} leftIcon={{type: 'font-awesome', name: 'user-o', marginRight: 15}}
                onChangeText={lastname => this.setState({lastname})}
                value={this.state.username}
                containerStyle={styles.formInput}
                 />
                 <Input placeholder='Email' style={styles.icon} leftIcon={{type: 'font-awesome', name: 'envelope-o', marginRight: 15}}
                onChangeText={email => this.setState({email})}
                value={this.state.username}
                containerStyle={styles.formInput}
                 />
                 <CheckBox title='Remember me' checked={this.state.remember} center 
                 onPress={() => this.setState({remember: !this.state.remember})}
                 containerStyle={styles.formCheckbox}
                  />
                  <View style={styles.formButton}>
                      <TouchableOpacity style={styles.btn} onPress={() => this.handleRegister()}>
                          <Icon style={styles.icon} name='user-plus' type='font-awesome' color='white' size={24}/>
                          <Text style={styles.btnText}>Register</Text>
                      </TouchableOpacity>
                  </View>
                 </View>
            </ScrollView>
        )
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions:{
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#d1c4e9',
        activeTintColor: '#fff',
        incativeTintColor: 'gray'
    }
})

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        margin: 40
    },
    imageContainer:{
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    image:{
        margin: 10,
        width: 80,
        height:60
    },
    formInput:{
        marginVertical: 10
    },
    formCheckbox:{
        margin: 20,
        backgroundColor: null
    },
    formButton:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon:{
        paddingRight: 20
    },
    btn:{
        width: 330,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#512da8',
        flexDirection: 'row'
    },
    btnRegister:{
        width: 330,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    btnCamera:{
        width: 80,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        
    },
    btnText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 10
    },
    cameraText:{
        color:'#512da8',
        fontSize:13,
        marginLeft: 0,
        marginTop: 5
    }
})


export default Login