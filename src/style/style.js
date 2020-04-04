import { StyleSheet } from "react-native";
import * as theme from "./theme.json";

const style = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
    },
    border:{
        borderColor: 'red',
        borderStyle: 'dotted',
        borderWidth: 2,
    },
    download_url_input: {
        margin: 8,
        width: '80%'
    },
    download_video_button: {
        margin: 8,
    },
    download_site_select: {
        margin: 8
      },
    download_menu_backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // padding: 50
        // position: 'absolute',
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0
    },
    download_overflow_layout: {
        // minHeight: '100%',
        // padding: 100,
        flex: 1, 
        // justifyContent: 'center', 
        // alignItems: 'center',
    },
    download_overflow_menu: {
        flex:1,
        flexWrap: 'nowrap',
        flexDirection:'column',
        marginTop: 150,
        // width: '300%',
        // alignItems:'center',
        // justifyContent: 'center'
    }
});

export default style;