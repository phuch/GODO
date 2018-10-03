import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/EvilIcons';
import colors from '../constants/colors';
import { search } from '../actions/search-action';

class SearchBar extends React.Component {
    render() {
        const { search, term, style } = this.props;

        return (
            <View style={[styles.inputField, { 'width': this.props.width }, style]}>
                <Icon name='search' color={colors.darkGrey} size={24}/>
                <TextInput
                    style={styles.textInput}
                    placeholder='Search for events'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {search(text);}}
                    value={term} />
            </View>
        )
    }
}

const mapStateToProps = ({events}) => {
    return {
        term: events.term
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ search }, dispatch)
}

const styles = StyleSheet.create({
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightGrey,
        borderColor: colors.darkGrey,
        marginTop: 10,
        marginBottom: 30,
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3
    },
    textInput: {
        flex: 1,
        color: colors.darkGrey
    }
})

SearchBar.propTypes = {
    width: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
