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
    this.state = {results: '' };
  }
  
  handleChange = address => {
    this.props.handleGoogleError("",false)
    this.props.handleAddress("")
    this.setState({ address });
  };
 
   isPoliticalAreaValid = element =>{
    return new Promise((resolve,reject) => {
      switch(element){
        case 'Brás de Pina':
        return resolve(true)
        break;

        case 'Vila da Penha':
          return resolve(true)
        break;

        case 'Vicente de Carvalho':
          return resolve(true)
        break;

        case 'Cordovil':
          return resolve(true)
        break;

        case 'Penha Circular':
          return resolve(true)
        break;

        case 'Penha':
          return resolve(true)
        break;

        case 'Olaria':
          return resolve(true)
        break;

        case 'Ramos':
          return resolve(true)
        break;

        default:
          return reject('Não atendemos nessa região :( ')
      }
    })
   
  }

  isAdmAreaValid = (element) => {
    return new Promise((resolve,reject) => {
      if(element !== "Rio de Janeiro"){
        reject('Não atendemos nessa região')
      }else{
        return resolve(true)
      }
    })
        
  }

  verifyAddressNumber = (element) => {
    return new Promise((resolve,reject) => {
      if(element !== "street_number"){
        reject('Insira o numero da residência')
      }else{
        resolve(true)
      }
    })
  }
   
  onError = (status, clearSuggestions) => {
    console.log('Google Maps API returned error with status: ', status)
    clearSuggestions()
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then( async results => {
          this.setState({ address })
          this.setState({results})
          await this.verifyAddressNumber(results[0].address_components[0].types[0])
          await this.isAdmAreaValid(results[0].address_components[4].long_name)
          await this.isPoliticalAreaValid(results[0].address_components[2].long_name)
    })
      .then(latLng => {
        this.props.handleGoogleError("",true)
        this.props.handleAddress(this.state.address,this.state.results)
      })
      .catch(error =>{
        this.props.handleGoogleError(error,false)
        this.props.handleAddress("")
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