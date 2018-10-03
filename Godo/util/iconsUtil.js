import SvgIcon from '../components/SvgIcon';

export const renderCategoryIcon = (category) => {
    switch (category) {
        case 'Sports':
            return <SvgIcon name='Football' width={30} />;
        case 'Music and Arts':
            return <SvgIcon name='Guitar' width={30} />;
        case 'Crafts':
            return <SvgIcon name='Scissors' width={30} />;
        default:
            return <SvgIcon name='Mascot' width={30} />;
    }
}

