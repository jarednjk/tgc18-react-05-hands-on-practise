import React from 'react';
import axios from 'axios';

export default class ContactForm extends React.Component {

    async componentDidMount() {
        let enquiryRequest = axios.get('/enquiries.json');
        let countryRequest = axios.get('/countries.json');
        let contactRequest = axios.get('/contacts.json');

        let [enquiryResponse, countryResponse, contactResponse] = await axios.all([enquiryRequest, countryRequest, contactRequest]);

        this.setState({
            allEnquiries: enquiryResponse.data,
            allCountries: countryResponse.data,
            allContacts: contactResponse.data,
            loaded: true
        })
    }

    // the state variables are the data that component has responsbility for
    // make sure that there are no derived values
    state = {
        firstName: '',
        lastName: '',
        enquiry: 'support',
        country: 'singapore',
        contacts: [],
        allCountries: [],
        allEnquiries: [],
        allContacts: [],
        loaded: false
    }

    // make sure event handlers (i.e functions that are called in response to an event happening)
    // are arrow functions
    updateFirstName = (event) => {
        // the first argument is the event object. It represents the event that has happened
        // event.target => element that the event happens on
        // event.target.value => the content of the element
        this.setState({
            firstName: event.target.value,  // set the firstName state property to be whatever is inside the textbox
        })
    }

    updateLastName = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    updateEnquiry = (event) => {
        this.setState({
            enquiry: event.target.value
        })
    }

    updateCountry = (event) => {
        this.setState({
            country: event.target.value
        })
    }

    updateContacts = (event) => {
        // is the checkbox that is being clicked on already checked or unchecked?
        if (this.state.contacts.includes(event.target.value)) {
            // the user is unchecking the checkbox
            let indexToRemove = this.state.contacts.indexOf(event.target.value);

            // 1. clone the array
            let cloned = this.state.contacts.slice();
            // 2. modify the cloned array (removing the element at indexToRemove)
            cloned.splice(indexToRemove, 1);
            // 3. replace the original array in the state with the cloned
            this.setState({
                'contacts': cloned
            })


        } else {
            // the user is checking the checkbox
            // 1. clone the array
            let cloned = this.state.contacts.slice();
            // 2. modify the cloned array
            cloned.push(event.target.value);
            // 3. replace the cloned array into the state
            this.setState({
                'contacts': cloned
            })
        }
    }

    render() {

        if (this.state.loaded){

            // 1. make sure do not call setState in the render function
            // under any circumistances
            // 2. derived values should go into render
            return (<div>
                <div>
                    <label>First Name:</label>
                    <input type="text"
                        value={this.state.firstName}
                        onChange={this.updateFirstName}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text"
                        value={this.state.lastName}
                        onChange={this.updateLastName}
    
                    />
                </div>
                <div>
                    <label>Type of enquiry</label>
                    {this.state.allEnquiries.map ( enquiry => <React.Fragment key={enquiry.value}>
                        <input type="radio"
                               name="enquiry"
                               value={enquiry.value}
                               onChange={this.updateEnquiry}
                               checked={this.state.enquiry === enquiry.value} />
                        <label>{enquiry.display}</label>
                    </React.Fragment>)}
                </div>
    
                <div>
                    <select value={this.state.country} onChange={this.updateCountry}>
                        {this.state.allCountries.map(country => <React.Fragment key={country.value}>
                            <option value={country.value}>{country.display}</option>
                        </React.Fragment>)}
                    </select>
                </div>
    
                <div>
                    {this.state.allContacts.map(contact => <React.Fragment key={contact.value}>
                        <input type="checkbox"
                            value={contact.value}
                            onChange={this.updateContacts}
                            // checked={this.state.contacts.includes(contact.value)}
                            checked={this.updateContacts === contact.value} />
                        <label>{contact.display}</label>
                    </React.Fragment>)}
                </div>
    
            </div>) 
        } else {
            return <p>Loading...</p>
        }

        
    }
}