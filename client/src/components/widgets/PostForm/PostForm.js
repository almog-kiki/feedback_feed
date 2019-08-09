import React, { Component } from 'react';
import { Button,Form, FormGroup, Input, Label} from 'reactstrap';
import { inject, observer } from "mobx-react";
import * as dataService from '../../../lib/data.service'
import PropTypes from 'prop-types';

const FORM_EMAIL_ID = "FORM_EMAIL_ID";
const FORM_CONTENT_ID="FORM_CONTENT_ID";
const FROM_RATING_ID="FROM_RATING_ID";

const FORM_EMAIL_NAME = "Email";
const FORM_CONTENT_NAME="Comment";
const FROM_RATING_NAME="Rating";

@inject("RootStore")
@observer
class PostForm extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          email:"",
          content:"",
          rating:0
      };
    }

    clearInputs =()=>{
        this.setState({
          email:"",
          content:"",
          rating:0
        })
    }

    handleOnInputChange =(event)=>{
      let inputValue = event.target.value;
      switch( event.target.id){
        case FORM_EMAIL_ID:{
          this.setState({email: inputValue})
          break;
        }
        case FORM_CONTENT_ID:{
          this.setState({content: inputValue})
          break;
        }
          case FROM_RATING_ID:{
          this.setState({rating: inputValue})
          break;
        }
        default:{
          console.log("no Input to handle")
        }
      }
    }

    sendPostToServer = (newPost) =>{      
      dataService.addPost(newPost).then(data =>{
        this.props.onSubmit(data)
        this.clearInputs();
      })
    }

    handleSubmit=(event)=>{
      event.preventDefault(); 
      const data = new FormData(event.target);
      let newPost = {
        email:   data.get(FORM_EMAIL_NAME),
        content: data.get(FORM_CONTENT_NAME),
        rating:  data.get(FROM_RATING_NAME)
      }
      this.sendPostToServer(newPost)
    }
      
    render() {
        return (          
          <Form className="form" onSubmit={ this.handleSubmit}>
            <FormGroup>
              <Label for={FORM_EMAIL_ID}>{FORM_EMAIL_NAME}</Label>
              <Input type="email"  value={this.state.email}  onChange={this.handleOnInputChange} name={FORM_EMAIL_NAME} id={FORM_EMAIL_ID} placeholder="Enter Email" required/>
            </FormGroup>
            <FormGroup>
              <Label for={FORM_CONTENT_ID}>{FORM_CONTENT_NAME}</Label>
              <Input type="text" value={this.state.content}  onChange={this.handleOnInputChange} name={FORM_CONTENT_NAME} id={FORM_CONTENT_ID} placeholder="Add your commnet" minLength="5" maxLength="128" required/>
            </FormGroup>
            <FormGroup>
              <Label for={FROM_RATING_ID}>{FROM_RATING_NAME}</Label>
              <Input type="select" name={FROM_RATING_NAME} id={FROM_RATING_ID} value={this.state.rating}  onChange={this.handleOnInputChange}  required>
                <option value="">Pick 1-5</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        );
      }
}
PostForm.propTypes = {
  onSubmit: PropTypes.func
}
export default PostForm;


