import React, {Component} from 'react'
import {TextInput,
    StyleSheet,
    TouchableOpacity
    } from 'react-native'
import {Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon} from 'native-base'
import {connect} from 'react-redux'
import {setUser} from '../redux/action/action'

class Submit extends Component{
    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            phoneNumber:""
        }
        
    }
    async handleSubmit(){
       
        const data = {
            name: this.state.name,
            email: this.state.email,
            phone_number: this.state.phoneNumber
        }
        this.props.setUser(data, this.props.navigation)
        // alert("Berhasil menyimpan!!")
    }
    render(){
        return(
           <Container style={styles.container}>
               <Text transparent style={styles.labelLogo}>InterviewApp</Text>
               
                <Content style={styles.content}>
                    <Form style={styles.form}>
                        <Item>
                            <Icon type="SimpleLineIcons"
                                name="user"
                                size={25}
                                style={styles.iconUser}/>
                            <Input style={styles.inputUsername}
                                    value={this.state.name}
                                    onChangeText={(name) => this.setState({name})}
                                    placeholder={"Username"}
                                    placeholderTextColor={'white'}/>
                        </Item>
                        <Item>
                            <Icon type="MaterialIcons"
                                name="email"
                                size={25}
                                style={styles.iconUser}/>
                            <Input style={styles.inputUsername}
                                    value={this.state.email}
                                    onChangeText={(email) => this.setState({email})}
                                    placeholder={"Email"}
                                    placeholderTextColor={'white'}
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}/>
                        </Item>
                        <Item>
                            <Icon type="AntDesign"
                                    name="phone"
                                    size={25}
                                    style={styles.iconLock}/>
                            <Input style={styles.inputPhoneNumber}
                                    value={this.state.phoneNumber}
                                    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                                    keyboardType={'numeric'}
                                    placeholder={"Phone Number"}
                                    placeholderTextColor={'white'}/>
                            <TouchableOpacity>
                                <Icon type="Entypo"
                                    // name={this.state.showPassword==false?"eye":"eye-with-line"}
                                    size={25}
                                    style={styles.iconEye}/>
                            </TouchableOpacity>
                        </Item>
                    </Form>
                    <Button style={styles.button}
                            onPress={()=>this.handleSubmit()}>
                        <Text styles={{textAlign:'center'}}>Submit</Text>
                    </Button>
                </Content>
            </Container>   
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex: 1,
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'#e07509'
        backgroundColor:'#126cfc',
    },
    topView:{
        flex: 8,
        // justifyContent:'center',
        // alignItems:'center',
        margin: 10,
    },
    button:{
        backgroundColor:'#ffb300',
        width: 400,
        textAlign: 'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 80
    },
    content:{
        
    },
    inputUsername:{
        // borderBottomWidth: 1,
        borderColor: 'white',
        fontSize:14,
        color:'white',
    }, 
    inputPhoneNumber:{
        // borderBottomWidth: 1,
        borderColor: 'white',
        color:'white',
        fontSize:14,
        
    },
    iconUser:{
        color:'white',
    },
    iconLock:{
        color:'white'
    },
    iconEye:{
        color:'white'
    },  
    form:{
        marginTop:50,
        
    },
    labelLogo:{
        marginTop:80,
        fontSize: 30,
        fontWeight:'bold',
        backgroundColor:'#126cfc',
        color:'white'
    }
})
const mapDispatchToProps = dispatch =>{
    return{
        setUser: (data, nav) => {
            dispatch(setUser(data,nav))
        }
    }
}
const mapStateToProps = (state) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Submit)