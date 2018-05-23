import React from 'react';
import { connect } from 'react-redux';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import { CarouselImageLoadAction, OnClickHandlerAction, ImagesLoadAction } from '../Actions/CarouselImageLoadAction';

import LazyLoad from 'react-lazy-load';
// import CSSTransitionGroup from 'react-transition-group/TransitionGroup';

class CarouselComponent extends React.Component {

  constructor(props) {
      super(props);
  }
  componentWillMount() {
      this.props.dispatch(CarouselImageLoadAction());
      this.props.dispatch(OnClickHandlerAction(this.props.isOnProps, this, this.props.animating));
  }

  componentDidMount() {
      const parentNode = document.getElementsByClassName('carousel-inner');
      this.props.dispatch(ImagesLoadAction(this,parentNode));
  }
  

  render() {
    const { items, activeIndex, animating, status, error,  isOnProps, imageLoadStatus, ride} = this.props;
    const slides = items.map((item, index) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >

        <img onLoad = {this.onLoad.bind(this,items.length, index)} onError = {this.onError} style={{width:'100%', height:'auto'}} src={ imageLoadStatus ===  "Loaded" ? item.src : "http://www.mediaevent.de/javascript/svg/onload.png"} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div>

        <div>Image data loading:{status}</div>
        <div>Image load status:{imageLoadStatus}</div>
        <Carousel
          ride = {ride}
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators id="carousel" items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}



// Add this function:
function mapStateToProps(state) {
  return {
    items: state.CarouselReducer.items,
    activeIndex:state.CarouselReducer.activeIndex,
    animating:state.CarouselReducer.animating,
    status: state.CarouselReducer.status,
    error:state.CarouselReducer.error,
    isOnProps:state.CarouselReducer.isOnProps,
    imageLoadStatus: state.CarouselReducer.imageLoadStatus,
    ride:state.CarouselReducer.ride
  };
}

export default connect(mapStateToProps)(CarouselComponent);


