// Really the Image Pane, includes the individual images and Upload Button

var React = require('react'),
    ReactDOM = require('react-dom'),
    UploadButton = require("../components/UploadButton"),
    ImageModal = require("../components/ImageModal"),
    UserStore = require("../stores/user"),
    ImageStore = require("../stores/image"),
    ApiUtil = require('../util/api_util');

var Images = React.createClass({
  getInitialState: function () {
    ApiUtil.fetchImages();
    this.imageListener = ImageStore.addListener(this._imagesChanged);
    return { images: [], user: this.props.user };
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
  render: function () {
    var that = this;
    if (this.state.images){
      var images = this.state.images.map(function(image){
        return <div key={image.id} className="pictures-in-pane"><img src={that.buildUrl(image.image_path)}></img></div>;
      });
  } else {
        var images = <div> no images</div>;
  }
    return (
      <div className="profile-images-pane">
        {images}
        <UploadButton />
      </div>
    );
  }
});

module.exports = Images;
