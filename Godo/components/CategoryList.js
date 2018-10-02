import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import CategoryListCard from './CategoryListCard';



export default CategoryList = (props) => {

    return (
        <FlatList
            data={props.category}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <CategoryListCard title={item} backgroundColor={props.backgroundColor} />}
            horizontal={true}
        />
    )
}

CategoryList.propTypes = {
    category: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string.isRequired
}
