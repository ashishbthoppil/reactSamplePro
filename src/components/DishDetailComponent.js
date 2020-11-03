import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem,
     Breadcrumb, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) =>!(val) || (val.length) <= len
const minLength = (len) => (val) =>!(val) || (val.length) >= len


    function RenderDish({dish}){
        return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle heading>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
    }

    function RenderComments({comments}){
            const comm = comments.map((comment) =>{
                return(
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} ,{new Intl.DateTimeFormat('en-US', {year:'numeric', month : 'short', day : '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                );
            });

            return(
               <div>
                    <h3>Comments</h3>
                    <div>{comm}</div>
                </div>      
            );
    }

    class DishDetail extends Component{

        constructor(props) {
            super(props);
            this.state = {
                isModalOpen: false
            }

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
       
    
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values){
            console.log("Current State is: " + JSON.stringify(values));
            alert("Current State is: " + JSON.stringify(values));
        }

        render(){
            if(this.props.dish != null){
                return(
                        <div className="container">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>{this.props.dish.name}</h3>
                                    <hr />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-5 m-1">
                                    <RenderDish dish={this.props.dish} />
                                </div>
                                <div className="col-12 col-md-5 m-1">
                                    <RenderComments comments={this.props.comments} />
                                    <Button outine onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Submit Comment
                                    </Button>
                                </div>
                            </div>
                            <div className="col-12 col-md-8">
                                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                    <ModalHeader toggle={this.toggleModal}>New Comment</ModalHeader>
                                        <ModalBody>
                                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                                <Row className="form-group">
                                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                                    <Col md={6}>
                                                        <Control.select model=".rating" className="form-control" name="rating">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </Control.select>
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Label htmlFor="name" md={2}>Name</Label>
                                                    <Col md={6}>
                                                    <Control.text model=".name" id="name" name="name"
                                                    validators={{
                                                        required, 
                                                        minLength: minLength(3), 
                                                        maxLength: maxLength(15)
                                                    }}/>
                                                            <Errors className="text-danger" model=".name" show="touched"
                                                        messages={{
                                                            required: 'Required',
                                                            minLength: 'Must be greater than 2 numbers',
                                                            maxLength: 'Must be 15 numbers or less',
                                                        }} />  
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Label htmlFor="comment" md={2}>Comment</Label>
                                                    <Col md={6}>
                                                        <Control.textarea model=".comment" id="comment" name="comment" rows="5"/>
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Col md={{size:1, offset:7}}>
                                                        <Button type="submit" value="submit" color="primary">Submit</Button>
                                                    </Col>
                                                </Row>
                                            </LocalForm>
                                        </ModalBody>
                                </Modal>
                            </div>
                        </div>
                    );
            }else{
                return(
                    <div></div>
                );
            }  
        }
    }

export default DishDetail;