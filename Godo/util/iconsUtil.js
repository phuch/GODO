import {CRAFT_ICON, SPORTS_ICON, AM_ICON, DEFAULT_ICON} from '../images';

export const renderCategoryIcon = (category) => {
    switch (category) {
        case 'Sports':
            return SPORTS_ICON;
        case 'Arts & Music':
            return AM_ICON;
        case 'Craft':
            return CRAFT_ICON;
        case 'Outdoor':
            return DEFAULT_ICON;
        default:
            return DEFAULT_ICON;
    }
}

