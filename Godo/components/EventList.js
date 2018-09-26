import React from 'react'
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import EventListItem from './EventListItem';


const EventList = (props) => {
    const { events } = props
    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={event => `${event.id}`}
                renderItem={({ item }) => <EventListItem event={item}/>}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        padding: 10,
    }
})

export default EventList;
