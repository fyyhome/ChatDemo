import { PixelRatio, Dimensions } from 'react-native';

export const Screen = {
    ratio: PixelRatio.get(),
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
};
