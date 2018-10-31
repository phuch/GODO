import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default BaseText = (props) => {
    return (
        <Text {...props} style={[styles.base, props.style]}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    base: {
        color: colors.darkGrey
    },
});
