import React from "react"
import { StyleSheet, View, Text, SectionList, Dimensions } from "react-native";
import SvgIcon from '../components/SvgIcon';
import colors from '../constants/colors';
import categories from '../fixtures/categories.json';
import CategoryList from '../components/CategoryList';

class BrowseScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    assignCardBackgroundColor = (type) => {
        switch (type) {
            case "Sports":
                return colors.secondary;
            case "Music and Arts":
                return colors.primary;
            case "Crafts":
                return colors.yellow;
            default:
                return colors.blue;
        }
    }

    render() {
        const screenWidth = Dimensions.get("window").width;
        const ICON_WIDTH_RATIO = 0.8;

        return (
            <View style={styles.container}>
                <SvgIcon name='LookingFor' width={600}/>
                <SectionList
                    sections={categories}
                    keyExtractor={(item, index) => item + index}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionTitle}>{title}</Text>
                    )}
                    renderItem={({ item, index, section }) =>
                        <CategoryList category={item} backgroundColor={this.assignCardBackgroundColor(section.title)} />
                    }
                    stickySectionHeadersEnabled={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#FFF",
        alignItems: 'center'
    },
    sectionTitle: {
        fontWeight: 'bold',
        color: colors.darkGrey,
        marginLeft: 15
    }
})

export default BrowseScreen;
