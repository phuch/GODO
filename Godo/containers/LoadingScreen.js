import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        AsyncStorage.getItem("authToken")
            .then(value => {
                if(value) {
                    this.props.navigation.navigate('App')
                } else {
                    this.props.navigation.navigate('Authentication')
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})