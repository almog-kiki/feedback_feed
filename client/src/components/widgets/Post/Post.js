import React, { Component , Fragment} from 'react';
import { Row,Col} from 'reactstrap';
import PropTypes from 'prop-types';

class Post extends Component {

  render() {
    const {data,openPopup} = this.props;

    return (
      <Fragment>
        <Row className="post">
          <Col md={1}>
            <img onClick={()=>openPopup(data.email)} className="gravatar" src={data.gravatar}  alt="" />
          </Col>
          <Col>
            <Row  className="email">  
              <a href={"mailto:"+data.email}>{data.email}</a>
            </Row>
            <Row  className="content"> {data.content}</Row>
          </Col>
          <Col>
            <Row className="rating"> 
                <span className="star"><i className="fa fa-star"></i>  </span>
                <span className="rating"> {data.rating}</span>
            </Row>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
Post.propTypes = {
  data: PropTypes.object,
  openPopup: PropTypes.func
}
export default Post;

