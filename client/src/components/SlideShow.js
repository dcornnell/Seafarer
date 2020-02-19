import React from "react";
import API from "../util/API";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./SlideShow.css";

class SlideShow extends React.Component {
  state = {
    images: []
  };
  getImages() {
    API.getEvents().then(res => {
      const events = res.data;
      let images = [];
      for (let i = 0; i < events.length; i++) {
        if (events[i].img) {
          images.push(events[i].img);
        }
      }

      let filterimages = images.filter((a, b) => images.indexOf(a) === b);
      let shuffled = this.shuffleArray(filterimages);
      this.setState({ images: shuffled });
    });
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  componentDidMount() {
    this.getImages();
  }
  render() {
    var settings = {
      className: "center",

      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,

      variableWidth: true,
      centerMode: true,
      autoplay: true,
      speed: 2000,
      cssEase: "linear"
    };

    return (
      <Slider {...settings}>
        {this.state.images.map(image => (
          <div>
            <img className="slideImage" src={image} alt="slide"></img>
          </div>
        ))}
      </Slider>
    );
  }
}

export default SlideShow;
