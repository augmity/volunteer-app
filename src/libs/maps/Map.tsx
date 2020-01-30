import React, { useRef, useState } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';

import { Place } from './Place';
import { Position } from './Position';
import { Input, Icon } from 'antd';

interface IProps {
  places?: Place[];
  showSearch?: boolean;
  onPlaceSelected?: (value: Place) => void;
}

export const Map = compose<IProps, any>(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCQmg07SqUwnRJy9mgr25bvG2V7n8zn5hY&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(({ onPlaceSelected, showSearch, places }) => {

  const [markerPos, setMarkerPos] = useState<Position>();
  const [placeName, setPlaceName] = useState<string>();

  const searchBoxRef = useRef<any>(null);
  const searchInputRef = useRef<any>(null);

  const defaultCenter = { lat: 49.279732, lng: -123.1294123 };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current!.getPlaces(); 
    if (places && places.length > 0) {
      const place = places[0];

      if (!(place.geometry === undefined || place.geometry === null )) {
        const placeObj: Place = {
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          placeName: place.formatted_address,
          placeUri: place.url
        }
        setMarkerPos(placeObj.position);
        setPlaceName(placeObj.placeName);

        if (onPlaceSelected) {
          onPlaceSelected(placeObj);
        }
      }
    }
  }

  const clearSearch = () => {
    searchInputRef.current.input.value = null;
    setMarkerPos(undefined);
    setPlaceName(undefined);
  }
  
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={defaultCenter}
      center={markerPos || defaultCenter}
    >
      { showSearch && <SearchBox
        ref={searchBoxRef}
        controlPosition={5}
        onPlacesChanged={onPlacesChanged}
      >
        <Input
          ref={searchInputRef}
          placeholder="Search.."
          suffix={<Icon type="close" style={{ color: 'rgba(0,0,0,.45)', cursor: 'pointer' }} onClick={clearSearch} />}
          style={{
            width: `240px`,
            height: `32px`,
            marginLeft: 10,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            zIndex: 1000002,
          }}
        />
      </SearchBox>}

      { markerPos && <Marker position={markerPos}>
        { placeName && <InfoWindow >
          <div>{placeName}</div>
        </InfoWindow>}
      </Marker>}

      { places && places.map((place, idx) =>
        <Marker key={idx} position={place.position}>
        
        </Marker>)}
    </GoogleMap>
  )
});
