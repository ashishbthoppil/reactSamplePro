import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    renderDish(){
        if(this.props.dish != null){
            return(
                <Card>
                    <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle heading>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }else{
            return(
                <div></div>
            );
        }
    }

    renderComments(){
        
        if(this.props.dish != null){
            const comments = this.props.dish.comments.map((comment) =>{
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
                    <div>{comments}</div>
                </div>      
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish()}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;