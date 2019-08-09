import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import {Post , Filter, PostForm} from '../'
import {Popup } from '../../common'
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import * as dataService from '../../../lib/data.service'


@inject("RootStore")
@observer
class Feed extends Component {
  _isMounted = false;

    constructor(props) {
      super(props);      
      this.handleNewPost = this.handleNewPost.bind(this);
      this.handleFilter = this.handleFilter.bind(this);
      this.toggle = this.toggle.bind(this);

      this.state = {
        isOpen: false,
        email:"",
        lastActive:""
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    componentDidMount() {
      this._isMounted = true;
      const {RootStore} = this.props;       
      RootStore.getPosts();
    }

    handleNewPost(post) {
      this.props.RootStore.addNewPost(post);
    }
  
    handleFilter(filter) {
      let posts = toJS(this.props.RootStore.getPosts());
      let filteredPosts = posts.filter((post) => post.email.toLowerCase() === filter.toLowerCase() )
      this.props.RootStore.setFilteredPosts(filteredPosts);
    }

    toggle() {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }));
    }

    handleLastActive = (email) =>{
      this.props.RootStore.LoaderStore.isLoaderToFront = true;
      this.setState({
        email: email,
      }, ()=> {
        dataService.getLastActive(email).then(lastActive =>{
          if(this._isMounted){
            this.setState({
              lastActive: lastActive,
            }, ()=>{
              this.props.RootStore.LoaderStore.isLoaderToFront = false;
              this.toggle();
            })
          }
        })
      })
    }

    getPostComponent = (index, post)=>{
      return (
        <Post key={index} data={post} openPopup={this.handleLastActive}/>
      )
    }

    getPostsIfExists = (posts) =>{
      if(posts){
        posts = posts.map((post, index) => this.getPostComponent(index, post))
      }
      return posts;
    }
   
    drawLoading = () =>{
      return (
            <div className="loader-container">
                  <div className="loader"> </div>
            </div>
      )
    }

    render() {
      const { email , lastActive , isOpen } = this.state;
      const { RootStore } = this.props;
      let isLoading = RootStore.LoaderStore.isLoaderToFront;
      let disabledEventStyle = isLoading ? " disabled-event " : "";
      const posts = this.getPostsIfExists(toJS(RootStore.getPosts()))
      const filteredPosts = this.getPostsIfExists(toJS(RootStore.getFilteredPosts()));

      return (
          <div className="feed">
            <PostForm onSubmit={this.handleNewPost} />
            <Filter onFilter={this.handleFilter} />
            <div className= { "post-container " + disabledEventStyle }>
              { isLoading && this.drawLoading() }
              {filteredPosts.length > 0 ? filteredPosts : posts}
            </div>
            <Popup title={email} content={lastActive} isOpen={isOpen} toggle={this.toggle}></Popup>
          </div>
      )
    }
}
Feed.propTypes = {
  RootStore: PropTypes.object
}
export default Feed;

