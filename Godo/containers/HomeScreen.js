import React from "react"
import {StyleSheet, View, Text} from 'react-native';
import Map from '../components/Map';
import EventList from '../components/EventList';
import HomeHeader from '../components/HomeHeader';
import {assignCardBackgroundColor} from '../util/colorUtils';
import { DotIndicator } from 'react-native-indicators';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getLocationAction, searchAction, toggleSearchAction} from '../actions/home-action';
import colors from '../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class HomeScreen extends React.Component {

    componentDidMount() {
        this.props.getLocationAction()
    }

    handleNavigation = (routeName, params) => {
        const {navigation} = this.props;
        navigation.navigate(routeName,params)
    }

    render() {
        const {errorMessage, userLocation, nearbyEvents, isSearching, searchAction, toggleSearchAction} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <HomeHeader
                        isSearching={isSearching}
                        toggleSearchMode={toggleSearchAction}
                        handleSearch={searchAction}
                        handleNavigation={this.handleNavigation}
                    />
                    {errorMessage ?
                        <Text>{errorMessage}</Text> :
                        <View style={{ padding: 5 }}>
                            <Map userLocation={userLocation} nearbyEvents={nearbyEvents}/>
                        </View>
                        
                    }
                    {this.renderListArea()}
                </View>
            </View>
        );
    }

    renderListArea = () => {
        const {nearbyEvents, searchResult} = this.props;
        if(searchResult) {
            return this.renderEventList(searchResult,'keyword')
        } else if (nearbyEvents) {
            return this.renderEventList(nearbyEvents, 'area')
        } else {
            return <DotIndicator
                count={3}
                size={10}
                color={colors.secondary}
                animationDuration={800}
            />
        }
    };

    renderEventList = (eventList, msg) => {
        console.log(JSON.stringify(eventList))
        if (eventList.length) {
            return (
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                >
                    <EventList
                        events={eventList}
                        backgroundColor={assignCardBackgroundColor}
                        handleNavigation={this.handleNavigation}
                    />
                </KeyboardAwareScrollView>
            )
        } else {
            return (
                <Text style={styles.noResultText}>
                    {`No activities found nearby, please try another ${msg}`}
                </Text>
            )
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    noResultText: {
        margin: 20,
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    }
})

const mapStateToProps = (store) => {
    const {userLocation, nearbyEvents, errorMessage, isSearching, searchResult} = store.homeScreenState;
    return {
        userLocation,
        nearbyEvents,
        searchResult,
        errorMessage,
        isSearching
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getLocationAction, searchAction, toggleSearchAction}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

