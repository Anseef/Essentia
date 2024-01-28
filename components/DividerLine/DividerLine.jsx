import { View } from 'react-native'
import React, { Component } from 'react'

export class DividerLine extends Component {
  render() {
    return (
      <View style = {{ height: 1, backgroundColor: '#acaeb3', width: '93%', alignSelf: 'center',marginTop: 12,marginBottom: 12 }}></View>
    )
  }
}
export default DividerLine