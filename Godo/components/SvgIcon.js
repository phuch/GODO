import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ViewPropTypes } from 'react-native';
import { Svg } from 'expo';
import { svgs } from '../assets/svgs/CombineSvgs';

const SvgIcon = (props) => {
    if (!props.name) {
        return null;
    }

    const name = svgs[`${props.name}.${Platform.OS}`] || svgs[props.name];

    if (!name) {
        return null;
    }

    const height = props.height && props.height.toString();
    const width = props.width && props.width.toString();
    const strokeWidth = props.strokeWidth && props.strokeWidth.toString();

    const isSimple = React.isValidElement(name);
    const svgEl = isSimple ? name : name.svg;

    let viewBox;

    if (props.viewBox && props.viewBox !== SvgIcon.defaultProps.viewBox) {
        viewBox = props.viewBox;
    }
    else if (!isSimple && name.viewBox) {
        viewBox = name.viewBox;
    }
    else if (props.defaultViewBox) {
        viewBox = props.defaultViewBox;
    }
    else {
        viewBox = SvgIcon.defaultProps.viewBox;
    }

    return (
        <Svg height={height} width={width} viewBox={viewBox} style={props.style}>
            {React.cloneElement(svgEl, {
                fill: props.fill,
                fillRule: props.fillRule,
                stroke: props.stroke,
                strokeWidth: strokeWidth
            })}
        </Svg>
    );
};

SvgIcon.defaultProps = {
    fill: '#000',
    fillRule: 'evenodd',
    height: '44',
    width: '44',
    viewBox: '0 0 100 100'
};

SvgIcon.propTypes = {
    fill: PropTypes.string.isRequired,
    fillRule: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.oneOfType([ViewPropTypes.style, PropTypes.array, PropTypes.object]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    viewBox: PropTypes.string
};

export default SvgIcon;