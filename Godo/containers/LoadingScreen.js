import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import SvgIcon from "../components/SvgIcon";
import { LOADING } from "../images";
import firebase from "../Firebase";

class LoadingScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                this.props.navigation.navigate('App', {user})
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LoadingScreen