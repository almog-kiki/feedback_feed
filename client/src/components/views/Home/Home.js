import React, { Component, Fragment} from 'react';
import { Feed } from '../../widgets'

class Home extends Component {

    render() {
        return (
            <Fragment> 
                <div className="m-5">
                    <Feed></Feed>
                </div>
            </Fragment>
        );
    }
}

export default Home;
