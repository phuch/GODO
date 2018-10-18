import React from 'react'
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import EventListItem from './EventListItem';


const EventList = (props) => {
    const { events, handleNavigation } = props
    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={event => `${event.id}`}
                renderItem={({ item }) =>
                    <EventListItem
                        event={item}
                        onPress={handleNavigation}
                        backgroundColor={props.backgroundColor(item.category)}/>
                }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        padding: 10,
        paddingBottom: 0
    }
})

export default EventList;
