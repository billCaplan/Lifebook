// Really the Image Pane, includes the individual images and Upload Button

var React = require('react'),
    ReactDOM = require('react-dom'),
    UploadButton = require("../components/UploadButton"),
    ImageModal = require("../components/ImageModal"),
    UserStore = require("../stores/user"),
    ImageStore = require("../stores/image"),
    LikeStore = require("../stores/like"),
    ApiUtil = require('../util/api_util'),
    Modal = require('react-modal'),
    ImageComments = require('../components/ImageComment'),
    NewImageComment = require('../components/NewImageComment'),
    ImageLikeButton = require('../components/ImageLikeButton'),
    ProfilePicChangeButton = require('../components/ProfilePicChangeButton'),
    ImageModal = require('../components/ImageModal');

    var customStyles = {
      overlay : {
       position          : 'fixed',
       backgroundColor   : 'rgba(255, 255, 255, 0.90)',
       zIndex            : 5
   },
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        height                : '600px',
        width                 : '1200px',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

var Images = React.createClass({
  getInitialState: function () {
    ApiUtil.fetchImages();
    this.imageListener = ImageStore.addListener(this._imagesChanged);
    this.likesListener = LikeStore.addListener(this._likesChanged);

    return { images: [], user: this.props.user, modalIsOpen: false, selectedImage: "" };
  },
  _likesChanged: function(){
    this.forceUpdate();
  },
  openModal: function(event) {

    this.setState({modalIsOpen: true,
                  selectedImage: event });
  },

  closeModal: function() {
    this.setState({modalIsOpen: false, selectedImage: ""});
  },
  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchImages();
    this.setState({user: newProps.user});
    this.setState({images: ImageStore.getByUserIdOnlyFirstNine(newProps.user)});
  },
  _imagesChanged: function(){
    this.setState({images: ImageStore.getByUserIdOnlyFirstNine(this.state.user)});
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
  likeButtonLogic: function(image){
    var likes = LikeStore.all();
    var current_image = image;
    var current_user = UserStore.getCurrentUser();

    if (!current_image.id){
      return false;
    }
    var liking = false;
    var that = this;

    likes.forEach(function(like){
      if (like.post_id === current_image.id &&
          like.author_id === current_user.id &&
          like.like_type === "image"){
        liking = true;
      }
    });

    return liking;
  },
  _buttonRenderFunction: function(image){
    var placeholder = this.likeButtonLogic(image);
    var likeButton;
    var currentUser = UserStore.getCurrentUser();

    if (placeholder === true) {
      likeButton = <div className="like-button">
                        <ImageLikeButton currentUser={currentUser}
                        image={image}
                        like={true}/>
                    </div>;
    } else {
      likeButton =  <div className="like-button">
                        <ImageLikeButton currentUser={currentUser}
                        image={image}
                        like={false}/>
                    </div>;
    }

    return likeButton;
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
          <div className="image-modal-outside">
             <Modal
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}
               style={customStyles}
               className="image-modal" >

               <h2>Picture</h2>
               <button onClick={this.closeModal}>close</button>
               <ProfilePicChangeButton image={this.state.selectedImage}/>
               {that._buttonRenderFunction(this.state.selectedImage)}
               <img src={that.buildModalUrl(that.state.selectedImage.image_path)} className="image-modal-image"></img>
               <NewImageComment image={this.state.selectedImage} className="image-modal-new-comments"/>
               <ImageComments image={this.state.selectedImage} className="image-modal-image-comments"/>
             </Modal>
           </div>
        </div>
        <UploadButton />
      </div>
    );
  }
});

module.exports = Images;
