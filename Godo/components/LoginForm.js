import React from 'react';
import {StyleSheet,View,Text,TextInput,Image} from 'react-native';
import {Button} from 'react-native-elements';
import colors from '../constants/colors';
import basicStyles from '../constants/basicStyles';

class LoginForm extends React.Component {

    render() {
        const { onNavigation } = this.props;
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
                <Button
                    title="SIGN UP"
                    containerViewStyle={basicStyles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={basicStyles.buttonTitle}
                    onPress={() => onNavigation('App')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column"
    },
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
    }
});

export default LoginForm;
