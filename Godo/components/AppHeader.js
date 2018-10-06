import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import colors from '../constants/colors';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const HEADER_HEIGHT_RATIO = 0.1;

const AppHeader = (props) => {
    const { title, navigation, hasBackButton, rightIcons } = props;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack(null)}>
                    { hasBackButton &&
                    <Icon
                        name='chevron-left'
                        size={40}
                        color={colors.darkGrey}
                    />
                    }
                </TouchableOpacity>
                <Text style={styles.title}> {title} </Text>
                <View style={styles.headerRight}>
                    { rightIcons }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: screenHeight * HEADER_HEIGHT_RATIO,
        width: screenWidth
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.white
    },
    title: {
        color: colors.darkGrey,
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 16,
        flex: 2
    },
    backButton: {
        flex: 1
    },
    headerRight: {
        flex: 1,
        alignItems: 'flex-end'
    }
})

export default AppHeader;
