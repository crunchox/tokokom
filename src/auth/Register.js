import React from "react";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Spinner from 'native-base';
import config from './../config';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'kuy',
            phone: '0011',
            email: 'kuy@gmail.com',
            password: '0011',
            dataSource: {}
        }
    }
    register() {
        // fetch(config.apiUrl + 'register/' + this.state.name + '/' + this.state.email + '/' + this.state.phone + '/' + this.state.password)
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({
        //             dataSource: responseJson
        //         }, function () {
        //             console.log(this.state.dataSource.result);
        //             Alert.alert(
        //                 'Success',
        //                 'Register Success',
        //                 [
        //                     { text: 'OK', onPress: () => this.props.navigation.navigate('Main') }
        //                 ],
        //                 { cancelable: false }
        //             )
        //         });
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     })
        //     .done();
        fetch(config.apiUrl+'register/'+this.state.name+'/'+this.state.email+'/'+this.state.phone+'/'+this.state.password)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson
                }, function () {
                    console.log(this.state.dataSource)
                    this.setState({ loading: false })
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                <TextInput style={{ height: 50 }} onChangeText={(name) => this.setState({ name })} placeholder='Full Name' />
                <TextInput keyboardType='email-address' style={{ height: 50 }} onChangeText={(email) => this.setState({ email })} placeholder='Email' />
                <TextInput keyboardType='phone-pad' style={{ height: 50 }} onChangeText={(phone) => this.setState({ phone })} placeholder='Phone Number' />
                <TextInput secureTextEntry={true} style={{ height: 50 }} onChangeText={(password) => this.setState({ password })} placeholder='Password' />
                <Button style={styles.button} title='Register' onPress={() => this.register()} />
            </View>
        );
    }
}
const styles = {
    button: {
        width: '100%'
    }
}
export default Register