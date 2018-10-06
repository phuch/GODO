import React from 'react';
import { G, Path, Circle }  from 'react-native-svg';
import colors from '../../constants/colors';

export default {
    ReviewStar: {
        svg:
            <G>
                <Path fill={colors.yellow} d="m499.9 188.3l-165.8-15.4-65.9-153c-4.6-10.7-19.8-10.7-24.4 0l-65.9 153-165.8 15.4c-11.6 1.1-16.3 15.5-7.5 23.2l125.1 109.9-36.7 162.5c-2.6 11.4 9.7 20.3 19.7 14.3l143.2-85 143.2 85c10 6 22.3-3 19.8-14.3l-36.6-162.5 125.1-109.9c8.8-7.7 4.1-22.2-7.5-23.2z" />
                <Path fill={colors.shadow} d="m268.2 19.9c-4.6-10.7-19.8-10.7-24.4 0l-65.9 153-165.8 15.4c-11.6 1.1-16.3 15.5-7.5 23.2l125.1 109.9-36.7 162.5c-2.6 11.4 9.7 20.3 19.7 14.3l32-19c4.4-182.1 89-310.3 156-383.7l-32.5-75.6z" />
                <Path fill={colors.white} d="m454.4 220.2h-0.8l-63.4-4.9c-5.5-0.4-9.6-5.2-9.2-10.7s5.3-9.6 10.7-9.2l63.4 4.9c5.5 0.4 9.6 5.2 9.2 10.7-0.4 5.2-4.7 9.2-9.9 9.2z" />
                <Circle fill={colors.white} cx="357.5" cy="202.7" r="10" />
            </G>,
        viewBox: '0 0 512 512'
    },
    LikeGrey: {
        svg:
            <G>
                <Path d="m488.6 264.8c13.9 24.6 5 53-16.7 66.8 13.9 24.6 5 53-16.7 66.8 19.4 34.2-5.9 74.6-43.4 74.6h-278.2v16.7c0 9.2-7.5 16.7-16.7 16.7h-100.2c-9.2 0-16.7-7.4-16.7-16.7v-300.5c0-9.2 7.5-16.7 16.7-16.7h100.2c9.2 0 16.7 7.5 16.7 16.7v16.7h9.6c86.5-89.1 110-104.9 120.8-154.3 2.1-26 24-46.4 50.6-46 27.5 0.3 49.4 23.3 49.4 50.9 0 44.5-9.7 74.5-23.6 116h121.5c27.7 0 50.1 22.4 50.1 50.1 0 17.8-9.4 33.4-23.4 42.2z" />
            </G>,
        viewBox: '0 0 512 512'
    },
    LikeColor: {
        svg:
            <G>
                <Path fill={colors.flesh} d="m364 56.5c0-27.5-21.9-50.5-49.4-50.9-26.6-0.4-48.6 20.1-50.6 46-10.7 49.4-34.3 65.2-120.8 154.3h-26.3c-9.2 0-16.7 7.5-16.7 16.7v233.7c0 9.2 7.5 16.7 16.7 16.7h295c37.5 0 62.8-40.4 43.4-74.6 21.7-13.8 30.6-42.2 16.7-66.8 21.7-13.8 30.6-42.2 16.7-66.8 14-8.9 23.4-24.4 23.4-42.2 0-27.7-22.4-50.1-50.1-50.1h-121.6c13.8-41.5 23.6-71.5 23.6-116z" />
                <Path fill={colors.primary} d="m116.9 172.5h-100.2c-9.2 0-16.7 7.5-16.7 16.7v300.5c0 9.2 7.5 16.7 16.7 16.7h100.2c9.2 0 16.7-7.5 16.7-16.7v-300.5c0-9.2-7.5-16.7-16.7-16.7z" />
                <Path fill={colors.darkPrimary} d="m116.9 172.5h-50.1v333.9h50.1c9.2 0 16.7-7.5 16.7-16.7v-300.5c0-9.2-7.6-16.7-16.7-16.7z" />
                <path fill={colors.darkFlesh} d="m461.9 172.5h-27.8l-300.5 300.5h278.3c37.5 0 62.8-40.4 43.4-74.6 21.7-13.8 30.6-42.2 16.7-66.8 21.7-13.8 30.6-42.2 16.7-66.8 14-8.9 23.4-24.4 23.4-42.2-0.1-27.7-22.5-50.1-50.2-50.1z" />
            </G>,
        viewBox: '0 0 512 512'
    },
    DislikeGrey: {
        svg: 
            <G>
                <Path d="M488.6,247.2c13.9-24.6,5-53-16.7-66.8c13.9-24.6,5-53-16.7-66.8c19.4-34.2-5.9-74.6-43.4-74.6H133.6V22.3
                c0-9.2-7.5-16.7-16.7-16.7H16.7C7.5,5.6,0,13,0,22.3v300.5c0,9.2,7.5,16.7,16.7,16.7h100.2c9.2,0,16.7-7.5,16.7-16.7v-16.7l9.6,0
                c86.5,89.1,110,104.9,120.8,154.3c2.1,26,24,46.4,50.6,46c27.5-0.4,49.4-23.4,49.4-50.9c0-44.5-9.7-74.5-23.6-116h121.5
                c27.7,0,50.1-22.4,50.1-50.1C512,271.6,502.6,256,488.6,247.2z"/>
            </G>,
        viewBox: '0 0 512 512'
    },
    DislikeColor: {
        svg:
            <G>
                <Path fill={colors.flesh} d="m364 455.5c0-44.5-9.7-74.5-23.6-116h121.5c27.7 0 50.1-22.4 50.1-50.1 0-17.8-9.4-33.4-23.4-42.2 13.9-24.6 5-53-16.7-66.8 13.9-24.6 5-53-16.7-66.8 19.4-34.2-5.9-74.6-43.4-74.6h-295c-9.2 0-16.7 7.5-16.7 16.7v233.7c0 9.2 7.5 16.7 16.7 16.7h26.3c86.5 89.1 110 104.9 120.8 154.3 2.1 26 24 46.4 50.6 46 27.6-0.3 49.5-23.3 49.5-50.9z"/>
                <Path fill={colors.secondary} d="m133.6 322.8v-300.5c0-9.2-7.5-16.7-16.7-16.7h-100.2c-9.2 0-16.7 7.4-16.7 16.7v300.5c0 9.2 7.5 16.7 16.7 16.7h100.2c9.2 0 16.7-7.5 16.7-16.7z"/>
                <Path fill={colors.darkSecondary} d="m133.6 322.8v-300.5c0-9.2-7.5-16.7-16.7-16.7h-50.1v333.9h50.1c9.1 0 16.7-7.5 16.7-16.7z"/>
                <Path fill={colors.darkFlesh} d="m512 289.4c0-17.8-9.4-33.4-23.4-42.2 13.9-24.6 5-53-16.7-66.8 13.9-24.6 5-53-16.7-66.8 19.4-34.2-5.9-74.6-43.4-74.6h-278.2l300.5 300.5h27.8c27.7 0 50.1-22.4 50.1-50.1z"/>
            </G>,
        viewBox: '0 0 512 512'
    }
}