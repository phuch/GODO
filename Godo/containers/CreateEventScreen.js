import React from "react"
import {StyleSheet,View, Text} from "react-native";

class CreateEventScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text>Here goes create activity screen</Text>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})

export default CreateEventScreen;
