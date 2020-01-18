import React from 'react'
import {Text, View, ScrollView, StyleSheet, Picker, Switch, Button, TouchableOpacity, Modal} from 'react-native'
import {Card} from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Constants from 'expo-constants'


export default class Reservation extends React.Component{

    state={
        guests: 1,
        smoking: false,
        date: '',
        isDatePickerVisible: false,
        showModal: false
    }
    static navigationOptions = {
        title: 'Reserve Table'
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal})
    }

    handleReservation = () => {
        console.log(JSON.stringify(this.state))
        this.toggleModal()
    }

    resetForm = () => { 
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        })
    }
    
      
    render(){

    const showDatePicker = () => {
        this.setState({
            isDatePickerVisible: true
        });
      };

      const hideDatePicker = () => {
        this.setState({
            isDatePickerVisible: false
        });
      };

     const handleConfirm = date => {
        console.warn("A date has been picked: ", date)
        this.setState({date: date})
        hideDatePicker();
      };
        return(
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker style={styles.formItem} 
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label='1' value='1'/>
                        <Picker.Item label='2' value='2'/>
                        <Picker.Item label='3' value='3'/>
                        <Picker.Item label='4' value='4'/>
                        <Picker.Item label='5' value='5'/>
                        <Picker.Item label='6' value='6'/>
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking?</Text>
                    <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    onTintColor='#512da8'
                    onValueChange={ value => this.setState({smoking: value})}
                    />
                </View>
                <View style={styles.formRow}>
                    <TouchableOpacity  onPress={showDatePicker}><Text style={styles.pickDateBtn}>Pick a date and time</Text></TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                     />
                </View>
                <View style={styles.formRow}>
                    <TouchableOpacity style={styles.reserveBtn} onPress={() => this.handleReservation()}>
                        <Text style={styles.reserveText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
                <Modal animationType={'slide'} 
                transparent={false} 
                visible={this.state.showModal} 
                onDismiss={() => {this.resetForm()}}
                onRequestClose={() => {this.resetForm()}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking? : {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time:{this.state.date.toString()}</Text>
                        <Button onPress={() => {this.resetForm()}}
                            color='#512da8'
                            title='Close'
                        />
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        margin: 20
    },
    formLabel:{
        fontSize: 18,
        flex: 2
    },
    formItem:{
        flex: 1
    },
    date:{
        flex: 2,
        marginRight: 20
    },
    pickDateBtn:{
        color: '#007AFF',
        fontSize: 20
    },
    reserveBtn:{
        backgroundColor: '#512da8',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20

    },
    reserveText:{
        color: '#fff',
        fontSize: 30,
    },
    modal:{
        justifyContent: 'center',
        margin: 20,
        marginTop: Constants.statusBarHeight + 20
    },
    modalTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512da8' ,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText:{
        fontSize: 18,
        margin: 10
    }
    
})