import React from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import colors from '../constants/colors';
import basicStyles from '../constants/basicStyles';

class LoginForm extends React.Component {

    render() {
        const { onNavigation } = this.props;
        return (
            <View style={styles.container}>
                <TextInput
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Email address"
                    placeholderTextColor={colors.darkGrey}
                />
                <TextInput
                    secureTextEntry={true}
                    style={[basicStyles.textInput, styles.userInput]}
                    placeholder="Password"
                    placeholderTextColor={colors.darkGrey}
                />
                <Button
                    buttonStyle={styles.button}
                    textStyle={basicStyles.buttonTitle}
                    title="LOG IN"
                    onPress={() => onNavigation('App')}
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

export default LoginForm;
