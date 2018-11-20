import React from 'react';
import {StyleSheet, View, TextInput } from 'react-native';
import {Button} from 'react-native-elements';
import colors from '../constants/colors';
import basicStyles from '../constants/basicStyles'

/*redux*/
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userSignUp } from "../actions/user-action";

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            fullName: ''
        }
    }

    handleSignUp = () => {
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.fullName
        };
        this.props.userSignUp(newUser);
        console.log('hehe');
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Full name"
                    placeholderTextColor={colors.darkGrey}
                    onChangeText={fullName => this.setState({fullName})}
                />
                <TextInput
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Email address"
                    placeholderTextColor={colors.darkGrey}
                    onChangeText={email => this.setState({email})}
                />
                <TextInput
                    secureTextEntry={true}
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Password"
                    placeholderTextColor={colors.darkGrey}
                    onChangeText={password => this.setState({password})}
                />
                <TextInput
                    secureTextEntry={true}
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Confirm password"
                    placeholderTextColor={colors.darkGrey}
                    onChangeText={confirmPassword => this.setState({confirmPassword})}
                />
                <Button
                    title="SIGN UP"
                    buttonStyle={styles.button}
                    textStyle={basicStyles.buttonTitle}
                    onPress={() => this.handleSignUp()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    userInput: {
        borderRadius: 10,
        height: 40,
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
    }
});

const mapStateToProps = (store) => {
    return {
        auth: store.firebase.auth,
        authErr: store.userState.authErr
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ userSignUp }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);
