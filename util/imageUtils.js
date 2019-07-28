import {AVATAR_1,AVATAR_2,AVATAR_3,AVATAR_4,AVATAR_5,AVATAR_6} from '../images';

export const randomImage = () => {
    let choice = Math.floor(Math.random() * 6) + 1
    switch (choice) {
        case 1:
            return AVATAR_1
        case 2:
            return AVATAR_2
        case 3:
            return AVATAR_3
        case 4:
            return AVATAR_4
        case 5:
            return AVATAR_5
        case 6:
            return AVATAR_6
        default:
            return AVATAR_6
    }
}
