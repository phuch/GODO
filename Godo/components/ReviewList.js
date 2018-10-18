import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import PropTypes from "prop-types";

import ReviewListItem from "./ReviewListItem";

const ReViewList = props => {
  return <FlatList 
    data={}
    keyExtractor={}
    renderItem={({item}) => <ReviewListItem />}
  />;
};

export default ReviewList;
