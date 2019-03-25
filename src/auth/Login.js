import React from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { style } from './../style'
import config from './../config';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: ''
        }
    }
    login(){

    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                <TextInput keyboardType='phone-pad' style={{ height: 50 }} onChangeText={(phone) => this.setState({ phone })} placeholder='Phone Number' />
                <TextInput keyboardType='default' style={{ height: 50 }} onChangeText={(password) => this.setState({ password })} placeholder='Password' />
                <Button style={styles.button} title='Login' onPress={() => this.login()} />

                <Text style={styles.baseText}>Don't have account?</Text>

                <Button onPress={() => this.props.navigation.navigate('Register')} style={styles.buttonRegister} title='REGISTER HERE'>
                </Button>
            </View>
        );
    }
}
const styles = {
    button: {
        width: '100%'
    },
    baseText: {
        fontSize: 12,
        marginTop: 12,
        textAlign: 'center'
    },
    buttonRegister: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#526FB3'
    }
};

export default Login