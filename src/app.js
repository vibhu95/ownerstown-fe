import React from 'react';
import './app.css';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TwitterSearch from './components/twitterSearch';
import Tweets from './components/tweets';

class App extends React.Component{

    state = {
        isHashTag: false,
        user: null,
        hashTag: null,
        clicked: false
    }

    updateState = data=>{
        console.log(data);
        this.setState({...data});
        console.log('pushed');
    }

    render(){
        return(
            <Container fluid>
                {this.state.clicked ? 
                    <Tweets 
                        isHashTag={this.state.isHashTag} 
                        hashTag={this.state.hashTag} 
                        user={this.state.user} 
                        unClick={()=>this.setState({clicked:false})} updateState={this.updateState} /> 
                    : <TwitterSearch updateState={this.updateState} />}
            </Container>
        )
    }
}

export default App; 