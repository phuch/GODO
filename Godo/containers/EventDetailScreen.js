import React from "react"
import {StyleSheet,View, Text} from "react-native";
import Map from '../components/Map';
import { Location } from 'expo';

class EventDetailScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { event: {location} } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Map eventLocation={location}/>
                </View>
            </View>
        );
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

export default EventDetailScreen;
