import React from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';

class TwitterSearch extends React.Component{

    state = {
        isHashTag: false,
        user: null,
        hashTag: null,
        options: [],
        selected: []
    }

    getUsers = e =>{
        const topThis = this;
        if(e && e !== null && e !== '' && e.trim() !== ''){
            if(e.substring(0,1) === '#'){
                topThis.setState({options:[], isHashTag: true, hashTag: e});
            }else{
                axios.get(`https://newsafar.herokuapp.com/users?q=${e}`)
                .then(res=>{
                    topThis.setState({options: res.data});
                })
                .catch(err=>{
                    topThis.setState({options:[]});
                });
            }
        }else{
            topThis.setState({options:[]});
        }
    }

    render(){
        return(
            <Container style={{marginTop:'15%'}}>
                <Row>
                    <Col style={{textAlign:'center'}}>
                        <h2>Tweet <i className="fab fa-twitter" style={{color:'#00ade2'}} aria-hidden="true"></i> Search</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="searchControl">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend" style={{backgroundColor:'white', borderRight:'0px'}}><i className="fa fa-search"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Typeahead
                                        className={'border-left-0'}
                                        id="searchField"
                                        labelKey="name"
                                        multiple={false}
                                        onInputChange={this.getUsers}
                                        onChange={(a)=>this.setState({selected:a, user:a})}
                                        placeholder="Choose any option..."
                                        selected={this.state.selected}
                                        options={this.state.options}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{backgroundColor:'#4ea6e9', border:'0px'}} onClick={()=>{this.props.updateState({
                            isHashTag:this.state.isHashTag, user: this.state.user, hashTag: this.state.hashTag, clicked: true
                        })}}>Search</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TwitterSearch;