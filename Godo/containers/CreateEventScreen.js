import React from "react"
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import colors from '../constants/colors';
import AppHeader from '../components/AppHeader';

class CreateEventScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <AppHeader
                    hasBackButton={true}
                    title="Create activity"
                    rightIcons={
                        <TouchableOpacity>
                            <Icon
                                name='check'
                                size={40}
                                color={colors.darkGrey}
                            />
                        </TouchableOpacity>
                    }
                    navigation={this.props.navigation}
                />
            </View>
        )
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

export default CreateEventScreen;
