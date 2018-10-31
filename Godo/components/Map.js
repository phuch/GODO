import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {MARKER_LOGO} from '../images';

export default class Map extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {userLocation, eventLocation, nearbyEvents} = this.props;
        let latitude, longitude, initialRegion;
        if (userLocation) {
            latitude = userLocation.coords.latitude;
            longitude = userLocation.coords.longitude;
            initialRegion = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.017,
                longitudeDelta: 0.003,
            }
        } else if (eventLocation) {
            latitude = eventLocation.coordinate.latitude;
            longitude = eventLocation.coordinate.longitude;
            initialRegion = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0074,
                longitudeDelta: 0.0033,
            }
        }

        return (
            <View>
                <MapView
                    initialRegion={initialRegion}
                    style={styles.map}
                    showsUserLocation={true}
                >
                    {nearbyEvents && nearbyEvents.map(event => {
                        const {id, coordinate,name} = event.location;
                        return (
                            <Marker
                                key={id}
                                coordinate={coordinate}
                                title={name}
                                image={MARKER_LOGO}
                            />
                        )
                    })}

                    {eventLocation &&
                        <Marker
                            key={eventLocation.id}
                            coordinate={eventLocation.coordinate}
                            title={eventLocation.name}
                            image={MARKER_LOGO}
                        />
                    }
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height: 230,
        borderRadius: 10,
    },
});
