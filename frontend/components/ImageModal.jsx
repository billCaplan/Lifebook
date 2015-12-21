var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var Modal = require('react-modal');

var ApiUtil = require('../util/api_util');

var customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var ImageModal = React.createClass({

   getInitialState: function() {

     return { modalIsOpen: false };
   },

   openModal: function() {
     this.setState({modalIsOpen: true});
   },

   closeModal: function() {
     this.setState({modalIsOpen: false});
   },

   render: function() {
     return (
       <div>
         <Modal
           isOpen={this.state.modalIsOpen}
           onRequestClose={this.closeModal}
           style={customStyles} >

           <h2>Hello</h2>
           <button onClick={this.closeModal}>close</button>
           <div>I am a modal</div>
           <form>
             <input />
             <button>tab navigation</button>
             <button>stays</button>
             <button>inside</button>
             <button>the modal</button>
           </form>
         </Modal>
       </div>
     );
   }
 });

module.exports = ImageModal;
