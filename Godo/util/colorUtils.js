import colors from '../constants/colors';

export const assignCardBackgroundColor = (type) => {
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