import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";

import CategoryListCard from "./CategoryListCard";

export default (CategoryList = props => {
  return (
    <FlatList
      data={props.category}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <CategoryListCard
          title={item}
          backgroundColor={props.backgroundColor}
          selectCategory={props.onSelectCategory}
        />
      )}
      horizontal={true}
    />
  );
});

CategoryList.propTypes = {
  category: PropTypes.array.isRequired,
  backgroundColor: PropTypes.string.isRequired
};
