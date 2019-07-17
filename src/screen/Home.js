import React, {Component} from 'react'
import {
    FlatList,
    View,
    StyleSheet,
    TouchableOpacity
}from 'react-native'
import { Container, 
    Header, 
    Text,
    Body,
    Content, 
    Button, 
    Footer} from 'native-base'
import { connect } from 'react-redux'
import { getQuestions } from '../redux/action/action'


class Home extends Component{
    
    handleStart(){
        this.props.getQuestions(this.props.navigation)

        this.props.navigation.navigate('Question')
    }
    render(){
        return(
            <Container style={styles.container}>
                <Body style={styles.body}>
                    <Content>
                    <Text style={styles.textCorp}>
                        PT. Blablabla
                    </Text>
                    <Text style={styles.textDetail}>
                        Anda akan diberikan 4 jenis pertanyaan.  Pertanyaan pertama dalam bentuk essay, kemudian multiple choice, setalah itu multi set 
                        dan terakhir live interview
                    </Text>
                    
                    </Content>
                </Body>
                <Footer>
                    <Button style={styles.startButton}
                            onPress={()=>this.handleStart()}>
                        <Text style={{alignSelf:'center'}}>
                            Mulai Interview
                        </Text>
                    </Button>
                </Footer>
                
            </Container>
        )    
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'#e07509'
        backgroundColor:'#126cfc',
    },  
    textCorp:{
        fontSize: 28,
        color:'white',
        fontWeight: 'bold',
        alignSelf:'center'
    },
    body:{
        flex:5,
        alignContent:'center',
        justifyContent:'center',
        top:80
    },
    textDetail:{
        color:'white',
        fontSize:18,
        marginTop:30,
        textAlign:'center',
        alignSelf:'center'
    },
    startButton:{
        borderWidth:1,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center'

    }
})

const mapDispatchToProps = dispatch =>{
    return{
        getQuestions: () =>{
            dispatch(getQuestions())
        }
    }
}
mapStateToProps = (state) =>({

})

export default connect(mapStateToProps, mapDispatchToProps) (Home)