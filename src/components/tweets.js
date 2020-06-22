import React from 'react';
import {Button, CardColumns, Col, Form, InputGroup, Row, Spinner} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import CustomCard from './card';
import axios from 'axios';

class Tweets extends React.Component{

    state = {
        tweets: [],
        isHashTag: this.props.isHashTag,
        user: this.props.user,
        hashTag: this.props.hashTag,
        options: [],
        selected: [],
        loading: true
    }

    componentDidMount(){
        const query = this.state.isHashTag ? this.state.hashTag : this.state.user && this.state.user.length > 0 ? `from:${this.state.user[0].screenName}` : null;
        console.log('query ::: ',query);
        if(query){
            const url = `https://newsafar.herokuapp.com/tweets?q=${encodeURIComponent(query)}`;
            axios.get(url).then(res=>{
                console.log(res.data);
                this.setState({tweets: res.data.statuses, loading: false});
            }).catch(err=>{
                console.log(err);
            });
        }
    }

    updateTweets = ()=>{
        const query = this.state.isHashTag ? this.state.hashTag : this.state.user && this.state.user.length > 0 ? `from:${this.state.user[0].screenName}` : null;
        console.log('query ::: ',query);
        if(query){
            const url = `https://newsafar.herokuapp.com/tweets?q=${encodeURIComponent(query)}`;
            axios.get(url).then(res=>{
                console.log(res.data);
                this.setState({tweets: res.data.statuses, loading: false});
            }).catch(err=>{
                console.log(err);
            });
        }
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
            <div>
                <Row style={{padding:'20px 10px'}}>
                    <Col md={3}>
                        <h3 className={'hover-pointer'} onClick={this.props.unClick}>Tweet <i className="fab fa-twitter" style={{color:'#4ea6e9'}} aria-hidden="true"></i> Search</h3>
                    </Col>
                    <Col md={5}>
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
                                        placeholder="Enter Name to search account (like 'Vibhuti Narayan') or hashtag with # (like '#HappyFathersDay2020')"
                                        selected={this.state.selected}
                                        options={this.state.options}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" style={{backgroundColor:'#4ea6e9', border:'0px'}} 
                            onClick={()=>{
                                this.props.updateState({
                                    isHashTag:this.state.isHashTag, user: this.state.user, hashTag: this.state.hashTag, clicked: true
                                });
                                this.setState({loading: true});
                                this.updateTweets();
                            }}>Search</Button>
                    </Col>
                </Row>
                <Row style={{backgroundColor:'#f7f7f7', minHeight:'90vh', paddingTop:'30px'}}>
                    <Col>
                        {
                            this.state.loading ?
                                <div>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        Loading...
                                </div> :
                                <CardColumns>
                                    {
                                        this.state.tweets.map(i=>{
                                            return <CustomCard 
                                                        key={i.id_str}
                                                        date={i.created_at}
                                                        text={i.text}
                                                        retweetCount={i.retweet_count}
                                                        favoriteCount={i.favorite_count}
                                                        name={i.user.name}
                                                        screenName={i.user.screen_name}
                                                        image={i.user.profile_image_url_https}
                                            />;
                                        })
                                    }
                                </CardColumns>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Tweets;