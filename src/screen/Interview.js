import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    StyleSheet,
    ActivityIndicator
}from 'react-native'
import {Container,
Text} from 'native-base'
import {
    RNCamera
} from 'react-native-camera'


export default class Interview extends Component{
    constructor(){
        super()
        this.state= {
            recording:true,
            processing:false
        }
    }
    async startRecording(){
        this.setState({recording:true})
        const {uri, codec = "mp4"} = await this.camera.recordAsync()
    }
     stopRecording(){
        this.camera.stopRecording()
    }
    render(){
        const {recording, processing} = this.state

        let button = (
            <TouchableOpacity
                onPress={this.startRecording.bind(this)}
                ><Text style={{fontSize:14}}>Record</Text>
            </TouchableOpacity>
        )
        if(recording){
            button = (
                <TouchableOpacity 
                    onPress={this.stopRecording.bind(this)}
                    >
                        <Text>STOP</Text>
                </TouchableOpacity>
            )
        }
        // if(processing){
        //     button = (
        //         <View >
        //             <ActivityIndicator animating size ={18}/>
        //         </View>
        //     )
        // }
        return(
            <Container> 
                <RNCamera 
                    ref={ref => {
                        this.camera = ref
                    }}
                        
                        type={RNCamera.Constants.Type.back}
                        flashMode ={RNCamera.Constants.FlashMode.on}
                        
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                          }}
                          androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                          }}
                />
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})