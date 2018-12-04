import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

export default class AppTextInput extends Component {
    render() {
        return (
            <View style={this.props.containerStyle}>
                <TextInput
                    {...this.props}
                    underlineColorAndroid="transparent"
                />
                {this.props.error ? <Text style={styles.errorText}>{this.props.error}</Text> : null}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10
    }
});
