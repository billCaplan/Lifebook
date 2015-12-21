// Really the Image Pane, includes the individual images and Upload Button

var React = require('react'),
    ReactDOM = require('react-dom'),
    UploadButton = require("../components/UploadButton"),
    ImageModal = require("../components/ImageModal"),
    UserStore = require("../stores/user"),
    ImageStore = require("../stores/image"),
    ApiUtil = require('../util/api_util'),
    Modal = require('react-modal'),
    ImageModal = require('../components/ImageModal');

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

var Images = React.createClass({
  getInitialState: function () {
    ApiUtil.fetchImages();
    this.imageListener = ImageStore.addListener(this._imagesChanged);
    return { images: [], user: this.props.user, modalIsOpen: false, selectedImage: "" };
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
  _imagesChanged: function(){
    this.setState({images: ImageStore.getByUserId(this.state.user)});
  },
  componentWillUnmount: function(){
    this.imageListener.remove();
  },
  buildUrl: function(image_path){
    var url = "http://res.cloudinary.com/lifebook/image/upload/c_scale,h_50,w_50/v1450463928/" + image_path;
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
                    className="pictures-in-pane">
                    <img onClick={this.openModal.bind(null, image)}
                         src={that.buildUrl(image.image_path)}>
                    </img>
              </div>;
      }.bind(this));
  } else {
        var images = <div> no images</div>;
  }


    return (
      <div className="profile-images-pane">
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
        <UploadButton />
      </div>
    );
  }
});

module.exports = Images;
