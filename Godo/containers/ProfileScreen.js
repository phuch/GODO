import React from "react"
import {StyleSheet,View, Text} from "react-native";

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Here goes profile screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#FFF",
        alignItems: 'center'
    }
})

export default ProfileScreen;
