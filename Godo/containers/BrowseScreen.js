import React from "react"
import { StyleSheet, View, Text, SectionList, Dimensions, TextInput } from "react-native";
import { connect } from 'react-redux'
import SvgIcon from '../components/SvgIcon';
import categories from '../fixtures/categories.json';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import EventList from '../components/EventList';
import {assignCardBackgroundColor} from '../util/colorUtils';
import colors from '../constants/colors'

class BrowseScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    renderSectionList = () => {
        return <SectionList
            sections={categories}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionTitle}>{title}</Text>
            )}
            renderItem={({ item, index, section }) =>
                <CategoryList category={item} backgroundColor={assignCardBackgroundColor(section.title)} />
            }
            stickySectionHeadersEnabled={false}
        />
    }

    renderResultEventList = () => {
        return <EventList events={this.props.events} backgroundColor={assignCardBackgroundColor}/>
    }

    render() {
        const { isSearching } = this.props;

        const screenWidth = Dimensions.get("window").width;
        const ICON_WIDTH_RATIO = 0.6;

        return (
            <View style={styles.container}>
                <SvgIcon name='LookingFor' width={screenWidth * ICON_WIDTH_RATIO} height={80} />
                <SearchBar width={screenWidth * ICON_WIDTH_RATIO} />
                {isSearching ? this.renderResultEventList() : this.renderSectionList()}
            </View>
        );
    }
}

const mapStateToProps = ({events}) => {
    return {
        isSearching: events.isSearching,
        events: events.events
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#FFF",
        alignItems: 'center',
        paddingTop: 90
    },
    sectionTitle: {
        fontWeight: 'bold',
        color: colors.darkGrey,
        marginLeft: 15
    }
})

export default connect(mapStateToProps)(BrowseScreen);
