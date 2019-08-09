// import {  autorun , action, observable } from "mobx";
import { observable,action ,runInAction} from "mobx";
import * as dataService from '../lib/data.service'
import LoaderStore from './LoaderStore'


class RootStore {
    @observable posts =[]
    @observable filteredPosts = [];

    constructor(){
        this.loadPosts();
        this.LoaderStore = new LoaderStore(this)
    }

    loadPosts = () =>{
        dataService.getPosts().then(posts=>{
            this.posts = posts;
        })
    }

    getPosts =()=>{
       return this.posts;
    }

    addNewPost = (post) =>{
        this.posts.push(post);
    }

    getFilteredPosts = () =>{
        return this.filteredPosts
    }
    
    setFilteredPosts = (posts) => {
        this.filteredPosts = posts;
    }

}

export default  RootStore;
