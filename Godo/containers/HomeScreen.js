import React from "react"
import {StyleSheet, View, Text, FlatList} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { BarIndicator } from 'react-native-indicators';
import Map from '../components/Map';
import EventList from '../components/EventList'
import events from '../fixtures/events.json';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
            eventLocations: null,
            errorMessage: null,
            isLoading: true
        }
    }

    componentWillMount() {
        if (!Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this map will not work in an emulator.' +
                ' Try it on your device!',
            });
        } else {
            this.getLocationAsync();
        }


    }


    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                isLoading:false,
                errorMessage: 'Permission to access location was denied',
            });
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        const eventLocations = events.map(event => {
            return event.location;
        })
        this.setState({ isLoading:false, userLocation, eventLocations });
    };


    render() {
        const {isLoading, errorMessage, userLocation, eventLocations} = this.state
        return (
            <View style={styles.container}>
                {isLoading && <BarIndicator color='#FF696B' count={6}/>}
                <View style={styles.content}>
                    {errorMessage ? <Text>{errorMessage}</Text> : <Map userLocation={userLocation} eventLocations={eventLocations}/>}
                    <EventList events={events}/>
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

export default HomeScreen;
