/*global google*/
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import './GoogleLocation.css'

const searchOptions = {
  bounds: new google.maps.LatLngBounds(
    new google.maps.LatLng(-22.859315, -43.334224),//south west
    new google.maps.LatLng(-22.817668, -43.241276),
  ),
  strictBounds:true,
  types: ['address']

  }

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
  
  handleChange = address => {
    this.setState({ address });
  };
 
   isPoliticalAreaValid = element =>{
    switch(element.long_name){
        case 'Brás de Pina':
        return true
        break;

        case 'Vila da Penha':
        return true
        break;

        case 'Vicente de Carvalho':
            return true
        break;

        case 'Cordovil':
        return true
        break;

        case 'Penha Circular':
        return true
        break;

        case 'Penha':
        return true
        break;

        case 'Olaria':
        return true
        break;

        case 'Ramos':
        return true
        break;

        default:
         return false
      }
  }

  isAdmAreaValid = (element) => {
        if(element.long_name !== "Rio de Janeiro"){
          return false
        }else{
          return true
        }
  }
  
  onError = (status, clearSuggestions) => {
    console.log('Google Maps API returned error with status: ', status)
    clearSuggestions()
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        this.setState({ address })
        console.log(results)
        results[0].address_components.forEach((e,i) =>{
          
          if(e.types[0] == 'political'){
              if(!this.isPoliticalAreaValid(e)){
                throw ('Não atendemos nessa região :(')
              }
          }

          if(e.types[0] == 'administrative_area_level_1'){
            if(!this.isAdmAreaValid(e)){
              throw ('Não atendemos nessa região :(')
            }
          }

          if(i == 0 && e.types[0] != "street_number"){
             throw ('Insira o numero da residência')
          }
        
        }
      )
        console.log(results[0].formatted_address)
    })
      .then(latLng => this.props.handleGoogleError(false))
      .catch(error =>{
        this.props.handleGoogleError(error)
      });
  };
 
  render() {
  
    return (
      <PlacesAutocomplete
        searchOptions ={searchOptions}
        value={this.state.address}
        onChange={this.handleChange}
        onError={this.onError}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Insira sua localização',
                className:`location-search-input ${this.props.googleError ? 'is-incorrect' : ''}`,
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}