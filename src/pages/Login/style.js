import {StyleSheet} from 'react-native';
import { Screen } from '../../utils/screen';

export default StyleSheet.create({
    containerBackground: {
        width: Screen.width,
        height: Screen.height,
        resizeMode: 'contain',
    },
    container: {
        width: Screen.width,
        height: Screen.height,
        margin: 0,
        backgroundColor: "rgba(0,0,0,0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    contentWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        width: 70,
        height: 70,
        marginBottom: 20,
        borderRadius: 35,
        backgroundColor: "#ffffff",
    },
});
