import React from 'react';
import {StyleSheet,View, KeyboardAvoidingView} from 'react-native';
import colors from '../constants/colors';
import SvgIcon from '../components/SvgIcon';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import BaseText from '../components/Text/BaseText';
import LinkText from '../components/Text/LinkText';

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

    render() {
        const {showLoginForm} = this.state
        return (
            <KeyboardAvoidingView style={styles.container} enabled>
                <View style={styles.logo}>
                    <SvgIcon name='GodoLogo' width={250} height={70}/>
                </View>
                <View style={styles.authenticationForm}>
                    {showLoginForm ?
                        <View>
                            <LoginForm
                                onNavigation={this.handleNavigation}
                            />
                        </View>
                        :
                        <View>
                            <SignupForm/>
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
            </KeyboardAvoidingView>
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

export default AuthenticationScreen;
