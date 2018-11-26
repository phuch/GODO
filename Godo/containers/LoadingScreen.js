import React from 'react'
import { View, ActivityIndicator, StyleSheet, AsyncStorage, Image } from 'react-native'
import SvgIcon from "../components/SvgIcon";
import { LOADING } from "../images";

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
                <View style={styles.logo}>
                    <SvgIcon name='GodoLogo' width={250} height={70}/>
                </View>
                <Image
                    style={{width: 100, height: 100}}
                    source={LOADING}
                />
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