import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default class VideoPlayer extends React.Component {

  componentDidMount() {
    // Ensure the element ID is unique to avoid conflicts with multiple players
    const videoElementId = this.createUUID(5);
    this.videoElement = document.getElementById("videoJSComponent");
    if (this.videoElement) {
      this.videoElement.id = videoElementId;
      
      // Adjust options to include dynamic MIME type based on file extension
      const adjustedOptions = {
        ...this.props.options,
        sources: this.props.options.sources.map(source => ({
          ...source,
          type: this.getMimeType(source.src)
        }))
      };

      this.player = videojs(this.videoElement.id, adjustedOptions, function onPlayerReady() {
        videojs.log('onPlayerReady', this);
      });
    }
  }

  getMimeType(url) {
    const extension = url.split('.').pop();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'mov':
        return 'video/quicktime'; // MIME type for .mov files
      default:
        return 'video/mp4'; // Default to mp4 if unsure
    }
  }


  createUUID(length){
    var result = 'id';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789-';
    var charactersLength = characters.length;
    for(var i =0; i<length; i++){
        result +=characters.charAt(Math.floor(Math.random()*charactersLength));
    }
    return result;
}

  // Dispose the player when the component will unmount
  componentWillUnmount() {
    // if (this.player) {
    //   this.player.dispose();
    // }
  }

  // Wrap the player in a `div` with a `data-vjs-player` attribute, so Video.js
  // won't create additional wrapper in the DOM.
  //
  // See: https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        {/* {this.props.disablePlayButton?(<div><video style={{marginLeft:-2000, position:"absolute", pointerEvents:"none"}} id="videoJSComponent" className="video-js"></video><img src = {this.player?.poster}/></div>):(<video id="videoJSComponent" className="video-js"></video>)} */}
       <video style={{pointerEvents:this.props.disablePlayButton?"none":"auto"}} id="videoJSComponent" className="video-js" alt="vid"></video>

      </div>
    );
  }
}