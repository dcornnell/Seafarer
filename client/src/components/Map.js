import React from "react";
import L from "leaflet";
import { Map as LeafMap, TileLayer, Marker, Popup } from "react-leaflet";

let DefaultIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/iconic/open-iconic/master/png/map-marker-8x.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

L.Marker.prototype.options.icon = DefaultIcon;

class Map extends React.Component {
  handleClick = event => {
    const { lat, lng } = event.latlng;
    console.log(`Clicked at ${lat}, ${lng}`);
  };
  render() {
    const { bounds, events } = this.props;
    return (
      <>
        <LeafMap
          className="map"
          bounds={bounds}
          boundsOptions={{ padding: [10, 10] }}
          onClick={this.handleClick}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events.map(event => {
            const position = [
              event.location.coordinates[1],
              event.location.coordinates[0]
            ];

            return (
              <Marker key={event._id} position={position}>
                <Popup>{event.description}</Popup>
              </Marker>
            );
          })}
        </LeafMap>
      </>
    );
  }
}

export default Map;
