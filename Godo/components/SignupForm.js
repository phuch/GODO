import React from 'react';
import {StyleSheet, View, TextInput } from 'react-native';
import {Button} from 'react-native-elements';
import colors from '../constants/colors';
import basicStyles from '../constants/basicStyles'

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={basicStyles.textInput}
                    placeholder="Email address"
                    placeholderTextColor={colors.darkGrey}
                />
                <TextInput
                    secureTextEntry={true}
                    style={basicStyles.textInput}
                    placeholder="Password"
                    placeholderTextColor={colors.darkGrey}
                />
                <TextInput
                    secureTextEntry={true}
                    style={basicStyles.textInput}
                    placeholder="Confirm password"
                    placeholderTextColor={colors.darkGrey}
                />
                <Button
                    title="SIGN UP"
                    containerViewStyle={basicStyles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={basicStyles.buttonTitle}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
    }

});

export default SignupForm;
