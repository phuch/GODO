import React from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import colors from '../constants/colors';
import basicStyles from '../constants/basicStyles';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    render() {
        const { handleLogin, isLoading } = this.props;
        return (
            <View style={styles.container}>
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
                {isLoading ?
                    <Button
                        title="LOADING"
                        loading
                        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={styles.button}
                        onPress={() => handleLogin(this.state)}
                    /> :
                    <Button
                        buttonStyle={styles.button}
                        textStyle={basicStyles.buttonTitle}
                        title="LOG IN"
                        onPress={() => handleLogin(this.state)}
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
    },
    disabledButton: {
        backgroundColor: "#FFC7C7",
        borderRadius: 10
    }

});

export default LoginForm;
