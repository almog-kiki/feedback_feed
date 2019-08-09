import React, { Component } from 'react';
import { Modal, ModalHeader} from 'reactstrap';
import PropTypes from 'prop-types';


class Popup extends Component {

  render() {
      const { title, content, isOpen, toggle } = this.props;        
      return (      
        <div>
          <Modal isOpen={isOpen} toggle={toggle} className={this.props.className}>
            <ModalHeader toggle={toggle}>
              <div>{title}</div> 
              <div className="last-seen"> last seen {content}</div>
            </ModalHeader>
          </Modal>
      </div>          
      );
    }
}
Popup.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
}
export default Popup;
  



