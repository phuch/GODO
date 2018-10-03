import React from "react"
import {StyleSheet, View, Text} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { BarIndicator } from 'react-native-indicators';
import Map from '../components/Map';
import EventList from '../components/EventList';
import HomeHeader from '../components/HomeHeader';
import {assignCardBackgroundColor} from '../util/colorUtil';
import {connect} from 'react-redux';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
            eventLocations: null,
            errorMessage: null,
            isSearching: false,
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
        const eventLocations = this.props.events.map(event => {
            return event.location;
        })
        this.setState({ isLoading:false, userLocation, eventLocations });
    };

    toggleSearchMode = () => {
        const {isSearching} = this.state
        this.setState({isSearching: !isSearching})
    }

    handleNavigation = (routeName, params) => {
        const {navigation} = this.props;
        navigation.navigate(routeName,params)
    }

    render() {
        const {isLoading, errorMessage, userLocation, eventLocations, isSearching} = this.state
        return (
            <View style={styles.container}>
                {isLoading && <BarIndicator color='#FF696B' count={6}/>}
                <View style={styles.content}>
                    <HomeHeader
                        isSearching={isSearching}
                        toggleSearchMode={this.toggleSearchMode}
                        handleNavigation={this.handleNavigation}
                    />
                    {errorMessage ?
                        <Text>{errorMessage}</Text> :
                        <Map userLocation={userLocation} eventLocations={eventLocations}/>
                    }
                    <EventList
                        events={this.props.events}
                        backgroundColor={assignCardBackgroundColor}
                        handleNavigation={this.handleNavigation}
                    />
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

const mapStateToProps = ({events}) => {
    return {
        events: events.events
    }
}

export default connect(mapStateToProps)(HomeScreen);
