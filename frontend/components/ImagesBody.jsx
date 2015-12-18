// Really the Image Pane, includes the individual images and Upload Button

var React = require('react'),
    ReactDOM = require('react-dom'),
    UploadButton = require("../components/UploadButton"),
    ImageModal = require("../components/ImageModal"),
    UserStore = require("../stores/user"),
    ImageStore = require("../stores/image"),
    ApiUtil = require('../util/api_util');

var ImagesBody = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    ApiUtil.fetchImages();
    return { images: ImageStore.getByUserId(this.props.user), user: this.props.user };
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchImages();
    debugger
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
  render: function () {
    var that = this;
    if (this.state.images){
      var images = this.state.images.map(function(image){
        return <div key={image.id}><img src={that.buildUrl(image.image_path)}></img></div>;
      });
  } else {
        var images = <div> no images</div>;
  }
    debugger
    return (
      <div className="profile-images-body">
        {images}
      </div>
    );
  }
});

module.exports = ImagesBody;
