import React from 'react';
import {StyleSheet, View } from 'react-native';
import AppTextInput from './AppTextInput';
import {Button} from 'react-native-elements';
import colors from '../constants/colors';
import basicStyles from '../constants/basicStyles'
import validator from "../util/formValidator";

/*redux*/
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userSignUp } from "../actions/user-action";

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            confirmPassword: '',
            confirmPasswordError: '',
            fullName: '',
            fullNameError:'',
        }
    }

    handleSignUp = () => {
        const {fullName, email, password, confirmPassword} = this.state
        const newUser = {email, password, fullName};
        const fullNameError = validator('fullName', fullName)
        const emailError = validator('email', email)
        const passwordError = validator('password', password)
        const confirmPasswordError = validator('confirmPassword', confirmPassword, 'password', password);

        this.setState({emailError, passwordError, confirmPasswordError, fullNameError});

        if (!fullNameError && !emailError && !passwordError && !confirmPasswordError) {
            this.props.handleSignup(newUser)
            this.setState({
                email: '',
                emailError: '',
                password: '',
                passwordError: '',
                confirmPassword: '',
                confirmPasswordError: '',
                fullName: '',
                fullNameError:'',
            })
        }
    };

    render() {
        const {fullName, email, password, confirmPassword, fullNameError, emailError, passwordError, confirmPasswordError} = this.state;
        const {isLoading} = this.props
        return (
            <View style={styles.container}>
                <AppTextInput
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Full name"
                    placeholderTextColor={colors.darkGrey}
                    onChangeText={fullName => this.setState({fullName})}
                    onBlur={() => {
                        this.setState({
                            usernameError: validator('fullName', fullName)
                        })
                    }}ror
                    error={fullNameError}
                />
                <AppTextInput
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Email address"
                    placeholderTextColor={colors.darkGrey}
                    onChangeText={email => this.setState({email})}
                    onBlur={() => {
                        this.setState({
                            emailError: validator('email', email)
                        })
                    }}
                    error={emailError}
                />
                <AppTextInput
                    secureTextEntry={true}
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Password"
                    placeholderTextColor={colors.darkGrey}
                    onChangeText={password => this.setState({password})}
                    onBlur={() => {
                        this.setState({
                            passwordError: validator('password', password)
                        })
                    }}
                    error={passwordError}
                />
                <AppTextInput
                    secureTextEntry={true}
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Confirm password"
                    placeholderTextColor={colors.darkGrey}
                    onChangeText={confirmPassword => this.setState({confirmPassword})}
                    onBlur={() => {
                        this.setState({
                            confirmPasswordError: validator('confirmPassword', confirmPassword, 'password', password)
                        })
                    }}
                    error={confirmPasswordError}
                />

                {isLoading ?
                    <Button
                        title="LOADING"
                        loading
                        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={styles.button}
                        onPress={this.handleSignUp}
                    /> :
                    <Button
                        title="SIGN UP"
                        buttonStyle={styles.button}
                        textStyle={basicStyles.buttonTitle}
                        onPress={this.handleSignUp}
                    />
                }
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
        message: store.userState.message
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ userSignUp }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);
