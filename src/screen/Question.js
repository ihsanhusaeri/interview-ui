import React, {Component }from 'react'
import {
    StyleSheet,
    FlatList,
    ActivityIndicator,
    View,
    TextInput
}from 'react-native'
import {
    Container,
    Header,
    Body,
    Left,
    Right,
    Text,
    Button,
    Footer,
    Input,
    Form,
    Item,
    ListItem,
    CheckBox,
    Radio
    
}from 'native-base'
import CountDown from 'react-native-countdown-component'
import {connect} from 'react-redux'
import {setAnswer} from '../redux/action/action'


class Question extends Component{
    constructor(){
        super()
    }
    state = {
        questions:[],
        currentQuestion: 0,
        options:null,
        isRadioSelected:false,
        isCheckBoxSelected:false,
        // radioAnswer:"",
        checkAnswer:[],
        // textAnswer:"",
        answer:"",
        type:""
    }
    componentDidMount(){
        if(this.props.fetched){
            this.setState({totalQuestion:this.props.questions.length})
        }
    }
    handleNext(){
        // if(this.state.currentQuestion < this.props.questions.length-1){
            // if(this.props.questions[this.state.currentQuestion].type == 'text'){    
                // const data ={
                //     userId: 25,
                //     questionId: this.props.questions[this.state.currentQuestion].id,
                //     answer:this.state.answer
                // }
                // this.props.setAnswer(data)
            // }else if()
        let data
        switch(this.props.questions[this.state.currentQuestion].type){
            case 'text':
                data ={
                    userId: this.props.userId,
                    questionId: this.props.questions[this.state.currentQuestion].id,
                    answer:this.state.answer
                }
                this.props.setAnswer(data)
                break;
            case 'multiple choice':
                data ={
                    userId:this.props.userId,
                    questionId:this.props.questions[this.state.currentQuestion].id,
                    answer:this.state.answer
                }
                this.props.setAnswer(data)
                break;
            case 'multi select':
                data = {
                    userId:this.props.userId, 
                    questionId:this.props.questions[this.state.currentQuestion].id,
                    answer:this.state.checkAnswer.toString()
                }
                this.props.setAnswer(data)
                console.log(data)
                break
            default:
                alert("interview")
        }
        if(this.state.currentQuestion < this.props.questions.length-1){
            this.setState({currentQuestion : this.state.currentQuestion + 1})
            this.setState({questions:this.props.questions[this.state.currentQuestion]})
        }else{
            // this.props.navigation.navigate('Interview')
        }
        
    }
    handleRadio(option){
        this.setState({answer:option})
        // console.log(option)
    }
    handleCheckBox(option){
        let temp = this.state.checkAnswer

        if(temp.includes(option)){
            temp.splice(temp.indexOf(option),1)
        }else{
            temp.push(option)
        }
        this.setState({checkAnswer:temp})
        // console.log(this.state.checkAnswer)
    }

    render(){
       
        if(this.props.fetching){
            return(
                <View style={{flex:1, justifyContent:'center'}}>
                    <ActivityIndicator size = "large" color="#AAA"/>
                </View>
            )
        }else{
            if(this.props.fetched){
                const {currentQuestion} = this.state
                const {questions} = this.props
                const options = []
               
                if(questions[currentQuestion].type != 'text'){
                    let optionsProps = questions[currentQuestion].options.split(',')
                    for(let i =0; i < optionsProps.length; i++){
                        options.push({option: optionsProps[i]})
                    }
                }
                return(
                    <Container style={styles.container}>
                        <Header style={styles.header}>
                            <Left>
                                <Text>
                                    Question {this.state.currentQuestion+1} of {this.props.questions.length}
                                </Text>
                            </Left>
                            <Right>
                                <CountDown
                                    until={5}
                                    onFinish={() => this.handleNext()}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{m: '', s: ''}}
                                    size={15}
                                    digitStyle={{backgroundColor: '#FFF'}}
                                    digitTxtStyle={{color: '#000'}}
                                    timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                                    separatorStyle={{color: '#000'}}
                                    showSeparator
                                />
                            </Right>
                        </Header>
                        <Body>
                            <Form>
                                <Text style={styles.textQuestion}>
                                    {currentQuestion + 1}. {questions[currentQuestion].description}
                                </Text>
                                {questions[currentQuestion].type == 'text'?
                                    <Item>
                                        <Input placeholder='Jawaban'
                                            placeholderTextColor='white'
                                            style={styles.inputAnswer}
                                            multiline={true}
                                            // value={this.state.textAnswer}
                                            // onChangeText={(textAnswer) => this.setState({textAnswer})}
                                            value={this.state.answer}
                                            onChangeText={(answer) => this.setState({answer})}/>
                                    </Item>
                                :questions[currentQuestion].type == 'multi select'?
                                            
                                    <FlatList
                                        data = {options}
                                        numColumns={1}
                                        renderItem={({item, index}) =>{
                                            return(
                                                <ListItem>
                                                    <CheckBox
                                                        checked={this.state.checkAnswer.includes(item.option)? true :false}
                                                        onPress={() => this.handleCheckBox(item.option)}/>
                                                    <Body>
                                                        <Text style={styles.textMultipleChoice}>{item.option}</Text>
                                                    </Body>
                                                </ListItem>
                                            )
                                        }} 
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                :<FlatList
                                    data = {options}
                                    numColumns={1}
                                    
                                    renderItem={({item, index}) =>{
                                        return(
                                            <ListItem>
                                                <Left>
                                                    <Text style={styles.textMultipleChoice}>{options[index].option}</Text>
                                                </Left>
                                                <Right>
                                                    {/* <Radio selected={this.state.radioAnswer === options[index].option}
                                                        onPress={()=> this.handleRadio(options[index].option)}
                                                        value={this.state.radioAnswer}/> */}
                                                        <Radio selected={this.state.answer === item.option}
                                                        onPress={() => this.handleRadio(item.option)}
                                                        value={this.state.answer}/>
                                                </Right>
                                            </ListItem>
                                        )
                                    }} 
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                }
                            </Form>
                        </Body>
                        <Footer style={styles.footer}>
                            <Button onPress={()=>this.handleNext()}>
                                <Text>
                                    Next
                                </Text>
                            </Button>
                        </Footer>
                    </Container>
                )
            }   
           
        }
       
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#126cfc'
    },
    header:{
        backgroundColor:'#ffb300'
    },
    textQuestion:{
        color:'white',
        fontSize:18,
        textAlign:'left',
        marginTop:30,
        marginLeft:20,
    },
    footer:{
        backgroundColor:'#126cfc'
    },
    inputAnswer:{
        width:300,
        color:'white',
        borderBottomColor:'white',
        borderBottomWidth: 1
        
    },
    textMultipleChoice:{
        color:'white'
    }

})
const mapDispatchToProps = dispatch => {
    return{
        setAnswer: (data, nav) => {
            dispatch(setAnswer(data,nav))
        }
    }   
}
const mapStateToProps = (state) =>({
    questions: state.reducer.questions,
    fetched:state.reducer.fetched,
    fetching: state.reducer.fetching,
    // userId: state.reducer.user[0].id,
    // user:state.reducer.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Question)