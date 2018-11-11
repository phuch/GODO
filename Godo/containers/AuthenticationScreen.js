import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../constants/colors';
import SvgIcon from '../components/SvgIcon';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

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

    render() {
        const {showLoginForm} = this.state
        return (
            <View style={styles.container}>
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
                            <Text>Already have an account ? Sign In</Text>
                        </View>
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        flex:1,
        paddingTop: 100
    },
    authenticationForm: {
        flex: 1,
        backgroundColor: colors.darkYellow,
        marginHorizontal: 20
    }
})

export default AuthenticationScreen;
