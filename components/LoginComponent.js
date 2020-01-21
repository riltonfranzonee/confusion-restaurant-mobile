import React from 'react'
import {Text, View,  StyleSheet, TouchableOpacity} from 'react-native'
import {Card, Input, Icon, CheckBox} from 'react-native-elements'
import * as SecureStore from 'expo-secure-store';

class Login extends React.Component{
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
        title: 'Login'
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
                          <Text style={styles.btnText}>Login</Text>
                      </TouchableOpacity>
                  </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        margin: 40
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
        backgroundColor: '#512da8'
    },
    btnText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    }
})


export default Login