import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from "react-native";



class siteData extends Component {
    constructor(props) {
        super(props);
    }




    render() {
        return (
            <Fragment>
                <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
                    <Text style={{ textAlignVertical: 'bottom', fontSize: 20 }}> Hello {this.props.siteCFS} ft</Text>
                    <Text style={{ lineHeight: 22, fontSize: 12, textAlignVertical: "top" }} >3</Text>
                    <Text style={{ textAlignVertical: 'bottom', fontSize: 20 }}>/s</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20 }}>Hello {this.props.siteRivHeight} ft</Text>
                </View>
            </Fragment>
        )
    }


}

export default siteData;