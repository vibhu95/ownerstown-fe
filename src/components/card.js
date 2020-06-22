import React from 'react';
import {Card, Col, Media, Row} from 'react-bootstrap';
import moment from 'moment';

const CustomCard = props => {
    return(
        <Card style={{width:'450px', margin:'10px 15px 10px 0px'}}>
            <Card.Body>
                <Card.Title>
                    <Media>
                        <img
                            width={60}
                            height={60}
                            className="mr-3"
                            src={props.image}
                            alt="Profile Pic"
                            style={{borderRadius:'50%'}}
                        />
                        <Media.Body>
                            <Row>
                                <Col>
                                    <p style={{fontSize:'15px', margin:'10px 0 0 0'}}>{props.name}</p>
                                    <small style={{fontSize:'11px'}}>@{props.screenName}</small>
                                </Col>
                                <Col>
                                    <small style={{float:'right',fontSize:'11px'}}>{moment(props.date,'ddd MMM DD HH:mm:ss Z YYYY').format('MMM DD, YYYY')}</small>
                                </Col>
                            </Row>
                        </Media.Body>
                        </Media>
                </Card.Title>
                <Card.Text style={{fontSize:'11px', minHeight:'50px'}}>
                    {props.text}
                </Card.Text>
                <Card.Link style={{textDecoration:'none', color:'black',fontSize:'11px'}}><i className='fas fa-retweet'></i> {props.retweetCount > 999 ? `${props.retweetCount/1000}k` : props.retweetCount} </Card.Link>
                <Card.Link style={{textDecoration:'none', color:'black', fontWeight:'400',fontSize:'11px'}}><i className='far fa-heart'></i> {props.favoriteCount > 999 ? `${props.favoriteCount/1000}k` : props.favoriteCount} </Card.Link>
            </Card.Body>
        </Card>
    );
}

export default CustomCard;