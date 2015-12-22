// Really the Image Pane, includes the individual images and Upload Button

var React = require('react'),
    ReactDOM = require('react-dom'),
    UploadButton = require("../components/UploadButton"),
    ImageModal = require("../components/ImageModal"),
    UserStore = require("../stores/user"),
    ImageStore = require("../stores/image"),
    Modal = require('react-modal'),
    ApiUtil = require('../util/api_util');

    var customStyles = {
      overlay : {
       position          : 'fixed',
       top               : 0,
       left              : 0,
       right             : 0,
       bottom            : 0,
       backgroundColor   : 'rgba(255, 255, 255, 0.75)'
   },
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        position              : 'fixed',
      }
    };


var ImagesBody = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    ApiUtil.fetchImages();
    return { images: ImageStore.getByUserId(this.props.user),
              user: this.props.user,
              modalIsOpen: false,
              selectedImage: "" };
  },
  openModal: function(event) {
    this.setState({modalIsOpen: true,
                  selectedImage: event.image_path });
  },

  closeModal: function() {
    this.setState({modalIsOpen: false, selectedImage: ""});
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchImages();
    this.setState({user: newProps.user});
    this.setState({images: ImageStore.getByUserId(newProps.user)});

  },
  // componentWillUnmount: function(){
  //   this.setState({user: null});
  // },
  buildUrl: function(image_path){
    var url = "http://res.cloudinary.com/lifebook/image/upload/c_scale,h_200,w_200/v1450463928/" + image_path;
    return url;
  },
  buildModalUrl: function(image_path){
    var url = "http://res.cloudinary.com/lifebook/image/upload/v1450463928/" + image_path;
    return url;
  },
  modal: function(){
    return ;
  },

  render: function () {
    var that = this;
    if (this.state.images){
      var images = this.state.images.map(function(image){
        return <div key={image.id}
                    className="image-body-image">
          <img onClick={this.openModal.bind(null, image)}
              src={that.buildUrl(image.image_path)}>
            </img></div>;
      }.bind(this));
  } else {
        var images = <div> no images</div>;
  }
    return (
      <div className="profile-images-body">
        {images}
        <div>
          <div>
             <Modal
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}
               style={customStyles} >

               <h2>Picture</h2>
               <button onClick={this.closeModal}>close</button>
               <div>I am a modal</div>
               <img src={that.buildModalUrl(that.state.selectedImage)}></img>
             </Modal>
           </div>
        </div>
      </div>
    );
  }
});

module.exports = ImagesBody;
