import React from 'react'
import { StyleSheet, Text, TouchableOpacity,View,Image } from 'react-native'
import moment from 'moment';
import categoryColors from '../constants/category-colors';
import {renderCategoryIcon} from '../util/iconsUtil';

class EventListItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { event: { name, location, time, category } } = this.props;
        const formattedDate = moment(time).format('MMM D');
        const formattedTime = moment(time).format('k:mm');
        return (
            <TouchableOpacity
                style={[styles.container, {backgroundColor: categoryColors[category]}]}
            >
                <View style={styles.icon}>
                    <Image source={renderCategoryIcon(category)} style={{width: 34, height: 34}}/>
                </View>
                <View style={styles.info}>
                    <View>
                        <Text style={styles.eventName}>
                            {name}
                        </Text>
                        <Text style={styles.text}>
                            {location.name}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.text}>
                            {formattedTime}
                        </Text>
                        <Text style={styles.text}>
                            {formattedDate}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 10,
    },
    info: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    eventName: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFF'
    },
    text: {
        fontSize: 13,
        color: '#FFF'
    }
})

export default EventListItem
