var React = require("react");
var ApiUtil = require('../util/api_util');

var UploadButton = React.createClass({
  upload: function (e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, results){
      if(!error){
        ApiUtil.createImage(results[0]);
      }
    }.bind(this));
  },
  render: function () {
    return (
      <div className="upload-form">
        <button className="button" onClick={this.upload}>Upload New Picture</button>
      </div>
    );
  }
});

module.exports = UploadButton;
