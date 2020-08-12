import React from 'react';
import axios from 'axios';

export default class PersonForm extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [],
      showUpdateForm: ''
    };
  }

  componentDidMount = () => {
    axios.get('/people').then((response) => {
      this.setState({
        people: response.data
      });
    });
  };

  toggleUpdateForm = (person) => {
    const { showUpdateForm } = this.state;
    if (showUpdateForm === '' || showUpdateForm !== person.id) {
      this.setState({
        showUpdateForm: person.id,
        updatePersonAge: person.age,
        updatePersonName: person.name
      });
    } else {
      this.setState({
        showUpdateForm: ''
      });
    }
  };

  createPerson = (e) => {
    e.preventDefault();
    const { newPersonAge, newPersonName } = this.state;
    axios
      .post('/people', {
        name: newPersonName,
        age: newPersonAge
      })
      .then((response) => {
        this.setState({
          people: response.data
        });
      });
  };

  updatePerson = async (e) => {
    e.preventDefault();
    const { updatePersonAge, updatePersonName } = this.state;
    const id = e.target.getAttribute('id');
    const response = await axios.put(`/people/${id}`, {
      name: updatePersonName,
      age: updatePersonAge
    });
    this.setState({ people: response.data, showUpdateForm: '' });
  };

  deletePerson = async (e) => {
    const response = await axios.delete(`/people/${e.target.value}`);
    this.setState({ people: response.data });
  };

  changeNewPerson = (e) => {
    e.persist();
    const key = e.target.getAttribute('id');
    this.setState((state) => {
      state[key] = e.target.value;
    });
  };

  changeExistingPerson = (e) => {
    e.persist();
    console.log('the state!', this.state);
    const key = e.target.getAttribute('id');
    this.setState((state) => {
      state[key] = e.target.value;
    });
  };

  render = () => {
    const { people, showUpdateForm } = this.state;
    const {
      createPerson,
      changeNewPerson,
      deletePerson,
      updatePerson,
      changeExistingPerson,
      toggleUpdateForm
    } = this;
    return (
      <div className="container">
        <h2>Add new person</h2>
        <form onSubmit={createPerson}>
          <input
            id="newPersonName"
            onKeyUp={changeNewPerson}
            type="text"
            placeholder="name"
          />
          <br />
          <input
            id="newPersonAge"
            onKeyUp={changeNewPerson}
            type="number"
            placeholder="age"
          />
          <br />
          <button type="submit">CREATE</button>
        </form>
        <h2>Contact List</h2>
        <div className="container">
          {people.map((person) => {
            return (
              <div className="contacts" key={person.id}>
                {showUpdateForm === person.id ? (
                  <form id={person.id} onSubmit={updatePerson}>
                    <input
                      id="updatePersonName"
                      onKeyUp={changeExistingPerson}
                      type="text"
                      placeholder="name"
                      defaultValue={person.name}
                    />
                    <input
                      id="updatePersonAge"
                      onKeyUp={changeExistingPerson}
                      type="text"
                      placeholder="age"
                      defaultValue={person.age}
                    />
                    <button type="submit">Confirm</button>
                  </form>
                ) : (
                  <p className="contact-details">
                    {person.name}: {person.age}
                  </p>
                )}
                <button type="button" value={person.id} onClick={deletePerson}>
                  DELETE
                </button>
                <button
                  type="button"
                  value={person.id}
                  onClick={() => toggleUpdateForm(person)}
                >
                  CHANGE
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}
