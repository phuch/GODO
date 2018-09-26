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
        const {userLocation, eventLocations} = this.props;
        let userLatitude, userLongitude;
        if (userLocation) {
            userLatitude = userLocation.coords.latitude;
            userLongitude = userLocation.coords.longitude;
        }

        return (
            <View style={styles.container}>
                {userLocation &&
                    <MapView
                        initialRegion={{
                            latitude: userLatitude,
                            longitude: userLongitude,
                            latitudeDelta: 0.347,
                            longitudeDelta: 0.101,
                        }}
                        style={styles.map}
                        showsUserLocation={true}
                    >
                        {eventLocations && eventLocations.map(location => (
                            <Marker
                                key={location.id}
                                coordinate={location.coordinate}
                                title={location.name}
                                image={MARKER_LOGO}
                            />
                        ))}

                    </MapView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: 250,
        borderRadius: 10,
    },
});
