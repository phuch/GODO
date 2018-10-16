import React from "react"
import {StyleSheet, View, Text} from 'react-native';
import { Location, Permissions } from 'expo';
import Map from '../components/Map';
import EventList from '../components/EventList';
import HomeHeader from '../components/HomeHeader';
import {assignCardBackgroundColor} from '../util/colorUtils';
import {calculateDistance} from '../util/geolocationUtils';
import {connect} from 'react-redux';
import { DotIndicator } from 'react-native-indicators';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
            nearbyEvents: null,
            errorMessage: null,
            isSearching: false
        }
    }

    componentDidMount() {
        this.getLocationAsync();
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
        const nearbyEvents = this.getNearbyEvents(userLocation);
        this.setState({ userLocation, nearbyEvents});


    };

    getNearbyEvents = (userLocation) => {
        const userLatitude = userLocation.coords.latitude;
        const userLongitude = userLocation.coords.longitude;
        const nearbyEvents = this.props.events
            .filter(event => {
                const eventLatitude = event.location.coordinate.latitude;
                const eventLongitude = event.location.coordinate.longitude;
                return calculateDistance(userLatitude, userLongitude, eventLatitude, eventLongitude, "K") <= 3;
            })
        return nearbyEvents;
    }

    toggleSearchMode = () => {
        const {isSearching} = this.state
        this.setState({isSearching: !isSearching})
    }

    handleNavigation = (routeName, params) => {
        const {navigation} = this.props;
        navigation.navigate(routeName,params)
    }

    render() {
        const {errorMessage, userLocation, nearbyEvents, isSearching} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <HomeHeader
                        isSearching={isSearching}
                        toggleSearchMode={this.toggleSearchMode}
                        handleNavigation={this.handleNavigation}
                    />
                    {errorMessage ?
                        <Text>{errorMessage}</Text> :
                        <Map userLocation={userLocation} nearbyEvents={nearbyEvents}/>
                    }
                    {nearbyEvents ?
                        (nearbyEvents.length ?
                            <EventList
                                events={nearbyEvents}
                                backgroundColor={assignCardBackgroundColor}
                                handleNavigation={this.handleNavigation}
                            />
                            :
                            <Text style={styles.noResultText}>No activities found nearby, please relocate to see more activities </Text>
                        )
                        :
                        <DotIndicator
                            count={3}
                            size={10}
                            color='#FF696B'
                            animationDuration={800}
                        />
                    }
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
    },
    noResultText: {
        margin: 20,
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    }
})

const mapStateToProps = ({events}) => {
    return {
        events: events.events
    }
}

export default connect(mapStateToProps)(HomeScreen);
