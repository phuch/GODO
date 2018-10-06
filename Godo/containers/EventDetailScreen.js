import React from "react"
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Map from '../components/Map';
import AppHeader from '../components/AppHeader';
import { Button } from 'react-native-elements';
import IconInfo from '../components/IconInfo';
import Icon from 'react-native-vector-icons/EvilIcons';
import colors from '../constants/colors';
import moment from 'moment/moment';

const screenWidth = Dimensions.get("window").width;

class EventDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isGoing: false
        }
    }

    toggleGoingStatus = () => {
        const {isGoing} = this.state
        this.setState({isGoing: !isGoing})
    }

    render() {
        const {isGoing} = this.state;
        const { event: {location, name, description, time, publisher, slots, joined, fee} } = this.props.navigation.state.params;
        const formattedDate = moment(time).format('MMM D');
        const formattedTime = moment(time).format('k:mm');
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <AppHeader
                        hasBackButton={true}
                        title={name}
                        rightIcons={
                            <TouchableOpacity>
                                <Icon
                                    name='pencil'
                                    size={40}
                                    color={colors.darkGrey}
                                />
                            </TouchableOpacity>
                        }
                        navigation={this.props.navigation}
                    />
                    <Map eventLocation={location}/>
                        <View style={styles.infoSubContainer}>
                            <IconInfo iconName="Calendar" title={`${formattedDate},${formattedTime}`}/>
                            <IconInfo iconName="User" title={`${joined}/${slots}`}/>
                        </View>
                        <View style={styles.infoSubContainer}>
                            <IconInfo iconName="Mascot" title={publisher}/>
                            <IconInfo iconName="Money" title={fee}/>
                        </View>
                        <View style={{padding:20}}>
                            <Text>{description}</Text>
                        </View>
                        {isGoing ?
                            <Button
                                containerViewStyle={styles.buttonContainer}
                                title="NOT GOING"
                                buttonStyle={styles.notGoingButton}
                                textStyle={styles.buttonTitle}
                                onPress={this.toggleGoingStatus}
                            /> :
                            <Button
                                containerViewStyle={styles.buttonContainer}
                                title="GOING"
                                buttonStyle={styles.goingButton}
                                textStyle={styles.buttonTitle}
                                onPress={this.toggleGoingStatus}
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
        justifyContent: 'space-between',
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    infoSubContainer: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    buttonContainer: {
        flex:1,
        width: screenWidth,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        justifyContent: 'flex-end'
    },
    buttonTitle: {
        fontWeight: "700",
        color: colors.white
    },
    goingButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
    },
    notGoingButton: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
    }

});

export default EventDetailScreen;
