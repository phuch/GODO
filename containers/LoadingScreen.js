import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import SvgIcon from "../components/SvgIcon";
import { LOADING } from "../images";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { getCurrentUser } from "../actions/user-action";

class LoadingScreen extends React.Component {
    componentDidMount() {
        this.props.getCurrentUser().then(() => {
            const { currentUser, navigation } = this.props
            navigation.navigate(currentUser ? 'App' : 'Authentication')
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

const mapStateToProps = (store) => {
    return {
        currentUser: store.userState.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getCurrentUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)