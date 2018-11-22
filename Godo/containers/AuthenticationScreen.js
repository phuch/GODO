import React from 'react';
import {StyleSheet,View} from 'react-native';
import colors from '../constants/colors';
import SvgIcon from '../components/SvgIcon';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import BaseText from '../components/Text/BaseText';
import LinkText from '../components/Text/LinkText';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userSignIn, userSignUp} from "../actions/user-action";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'

class AuthenticationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoginForm: true
        }
    }

    handleNavigation = (routeName, params) => {
        const { navigation } = this.props;
        navigation.navigate(routeName, params);
    }

    toggleForm = () => {
        this.setState({
            showLoginForm: !this.state.showLoginForm
        })
    }

    handleLogin = (credentials) => {
        this.props.userSignIn(credentials).then(() => {
            const {message, auth} = this.props
            if (message !== null) {
                this.refs.toast.show(message, 1500);
            } else {
                this.handleNavigation('App', {user: auth})
            }
        })
    }

    handleSignup = (newUser) => {
        this.props.userSignUp(newUser).then(() => {
            console.log(this.props.auth)
            const {message} = this.props
            if (message !== null) {
                this.refs.toast.show(message, 1500);
            } else {
                this.handleNavigation('App', {user: auth})
            }
        })
    }

    render() {
        const {showLoginForm} = this.state
        const {isLoading} = this.props
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                style={{ backgroundColor: 'white' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <Toast
                    ref="toast"
                    style={{backgroundColor: colors.secondary}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={1}
                    textStyle={{color:'white'}}
                />
                <View style={styles.logo}>
                    <SvgIcon name='GodoLogo' width={250} height={70}/>
                </View>
                <View style={styles.authenticationForm}>
                    {showLoginForm ?
                        <View>
                            <LoginForm handleLogin={this.handleLogin} isLoading={isLoading}/>
                        </View>
                        :
                        <View>
                            <SignupForm handleSignup={this.handleSignup} isLoading={isLoading}/>
                        </View>
                    }
                </View>
                <View style={styles.toggleFormContainer}>
                    {showLoginForm ?
                        <View style={styles.toggleFormText}>
                            <BaseText>Don't have an account?</BaseText>
                            <LinkText onPress={this.toggleForm}> Sign Up</LinkText>
                        </View>
                        :
                        <View style={styles.toggleFormText}>
                            <BaseText>Already have an account?</BaseText>
                            <LinkText onPress={this.toggleForm}> Sign In</LinkText>
                        </View>
                    }
                </View>
            </KeyboardAwareScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    logo: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50
    },
    authenticationForm: {
        flex: 2,
        marginHorizontal: 20
    },
    toggleFormContainer: {
        flex: 0.5,
        alignItems: 'center'
    },
    toggleFormText: {
        flexDirection: 'row'
    }
})

const mapStateToProps = (store) => {
    return {
        auth: store.firebase.auth,
        message: store.userState.message,
        isLoading: store.userState.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ userSignUp, userSignIn }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationScreen);
