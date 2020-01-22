import React from 'react'
import {Card, Icon} from 'react-native-elements'
import {Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable'
import * as MailComposer from 'expo-mail-composer';

export default class Contact extends React.Component{

    sendMail(){
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern'
        })
    }

    render(){
        return(
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card
                        title='Contact Information'
                    >
                        <Text style={{margin: 10}}>121, Clear Water Bay Road</Text>
                        <Text style={{margin: 10}}>Clear Water Bay, Kowloon</Text>
                        <Text style={{margin: 10}}>HONG KONG</Text>
                        <Text style={{margin: 10}}>Tel: +852 1234 5678</Text>
                        <Text style={{margin: 10}}>Fax: +852 8765 4321</Text>
                        <Text style={{margin: 10}}>Fax: +852 8765 4321</Text>
                        <Text style={{margin: 10}}>Email: confusion@food.net</Text>
                        <TouchableOpacity style={styles.btn} onPress={this.sendMail}>
                            <Icon name='envelope-o' color='white' type='font-awesome' size={20} />
                            <Text style={styles.btnText}>Email</Text>
                        </TouchableOpacity>
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: '#521da8',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        height: 40,
        borderRadius: 5
    },
    btnText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        paddingLeft: 5
    }
})
