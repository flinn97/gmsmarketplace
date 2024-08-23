import React, { Component } from 'react';
import arr from '../../../pics/arrLeft.png';
import VideoPlayer from './videoJS';


export default class ViewMedia2 extends Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.state = {
      showNum: 2,
      showMin: 0,
      translateX: 0,
      currentIndex: 0,
    }
    this.renderMediaItem = this.renderMediaItem.bind(this);
    this.getMimeType = this.getMimeType.bind(this);
  }

  getMimeType(url) {
    const extension = url.split('?')[0].split('.').pop().toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'mov':
        return 'video/quicktime'; // Correct MIME type for .mov files
      default:
        return 'application/octet-stream'; // Use a generic byte stream type for unknown extensions
    }
  }

  renderMediaItem(mediaItem, index) {
    const media = Array.isArray(this.props?.media) ? this.props?.media : [this.props?.media];
    const s = this.props.scale || 1;
    const style = {
      width: `${15 * s}vmin`,
      height: 'fit-content',
      minHeight: `${15 * s}vmin`,
      objectFit: 'cover',
      borderRadius: '1vmin',
      cursor: 'pointer',
      userSelect:"none" 
    };

    const exitButtonStyle = {
      color: '#A80303',
      fontWeight: '600',
      fontSize: '2.3vmin',
      textShadow: '0px 0px 2px white',
      width: 'fit-content',
      height: 'fit-content',
      position: 'absolute',
      cursor: 'pointer',
      right: '.4vmin',
      top: '.35vmin',
      padding: '.3vmin',
    };

    const mimeType = this.getMimeType(mediaItem);
    const isVideo = mimeType.includes('video');

    return (
      <div key={index} style={{ position: 'relative', borderRadius: '1vmin', marginRight: '1.5vmin' }}>
        {this.props.editable && (
          <div style={exitButtonStyle} onClick={() => this.props.removeMedia({ content: mediaItem, index })}>
            X
          </div>
        )}
        {isVideo ? (
          <div className="hover-img" 
          style={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', }}>
            {/* Placeholder for video thumbnail */}
            <VideoPlayer draggable={false} disablePlayButton={this.props.disablePlayButton} options={{
              autoplay: false,
              bigPlayButton: this.props.disablePlayButton ? false : true,
              controls: true,
              width: "35vw",
              height: "fit-content",
              marginBottom: "1vmin",
              sources: [{
                src: mediaItem, // Assuming mediaItem is the URL
                type: this.getMimeType(mediaItem) // Dynamically determine the MIME type
              }]
            }} />
          </div>
        ) : (
          <img draggable={false} className="hover-img" style={style} src={mediaItem} alt="img" />
        )}
      </div>
    );
  }


  handleNext = () => {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex + 1) % this.props.media.length,
      animatingDirection: 'left', // Update direction in the same setState call
    }));
  };

  handlePrev = () => {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex - 1 + this.props.media.length) % this.props.media.length,
      animatingDirection: 'right', // Update direction in the same setState call
    }));
  };


  render() {

    const { currentIndex } = this.state;
    const itemsToShow = this.props.nToShow? this.props.nToShow:5;
    const media = Array.isArray(this.props.media) ? this.props.media : [this.props.media];
    const { translateX } = this.state;
    const s = this.props.scale || 1;
    const containerStyle = {
      transform: `translateX(${translateX}px)`,
      flexDirection: "row", width: "100%",
      display: 'flex',
      minHeight: `${20 * s}vmin`,
      maxHeight: `${20 * s}vmin`,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '1vmin',
      flexWrap: 'wrap',
      userSelect:"none",
    };
    const { showMin, showNum } = this.state;
    
    const arrStyle = {
      width: `${15 * s}vmin`,
      height: 'fit-content',
      minHeight: `${15 * s}vmin`,
      maxHeight: '45vmax',
      objectFit: 'contain',
      borderRadius: '1vmin',
      cursor: 'pointer',
    };

    let endIndex = currentIndex + itemsToShow;
    let visibleItems = endIndex > media.length
      ? [...media.slice(currentIndex, media.length), ...media.slice(0, endIndex - media.length)]
      : media.slice(currentIndex, endIndex);

    return (
      <div draggable={false} className={`carousel-container ${this.state.animatingDirection}`}

        style={containerStyle}
      >
        <div className="hover-arr" style={{ scale: this.props.arrowScale?this.props.arrowScale: "88%", marginRight: '-.5vmin' }}>
          <img onClick={this.handlePrev} draggable={false}
            style={{ ...arrStyle, }} src={arr} />
        </div>


        {visibleItems.map((mediaItem, index) => (
          <div
            onClick={(e) => {
              console.log("Media item clicked:", mediaItem);  // Debugging line
              if (this.props.onClick) {
                this.props.onClick(e, { media: mediaItem });
              }else{
                const mimeType = this.getMimeType(mediaItem);
                const isVideo = mimeType.includes('video');
                this.props.app.dispatch({currentMedia:mediaItem, isVideo:isVideo})
                
              }
            }}
            key={index} className="carousel-items">
            {this.renderMediaItem(mediaItem, index)}
          </div>
        ))}

        <div  className="hover-arr" style={{ scale: this.props.arrowScale?this.props.arrowScale: "88%" }}>
          <img onClick={this.handleNext} draggable={false}
            style={{ ...arrStyle, transform: "rotate(180deg)", marginLeft: '-1.5vmin', }} src={arr} />
        </div>

      </div>
    );
  }
}