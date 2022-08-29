import React, { useState, useEffect } from "react";
import editImg from '../assets/edit.png'
import deleteImg from '../assets/delete.png'
import uuid from 'react-uuid'
function Home() {
  const [loginDetails, setLoginDetails] = useState();
  const [contactList, setContactList] = useState([]);
  const [getUsers, setGetusers] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [contact, setContact] = useState({
    id: uuid(),
    name: "",
    email: "",
    phoneNumber: "",
    contactImage: "",
  });

  let loginDetailsdata = JSON.parse(localStorage.getItem("loginDetails"));
  let usersData = JSON.parse(localStorage.getItem("users"));

  useEffect(() => {
    setGetusers(usersData);
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
    setLoginDetails({ ...loginDetailsdata });
    const loginData = usersData.find((obj) => obj.id === loginDetailsdata.id);
    setContactList(loginData.contacts);
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    //eslint-disable-next-line no-useless-escape
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const phoneno = /^[1-9]{1}[0-9]{9}$/;

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!phoneno.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone Number is maximum 10 characters";
    }

    if (!values.contactImage) {
      errors.contactImage = "Please select Image";
    }
    return errors;
  };

  const changeValue = (e) => {
    let key = e.target.id;
    let value = e.target.value;
    // if (key === "contactImage") {
    //   const files = e.target.files[0];
    //   var reader = new FileReader();
    //   reader.readAsDataURL(files);
    //   reader.onload = (evt) => {
    //     value = evt.target.result;
    //     setContact({ ...contact, [key]: value });
    //   };
    // }
    setContact({ ...contact, [key]: value });
  };

  const addContact = (e) => {
    e.preventDefault();
    setFormErrors(validate(contact));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      var index = getUsers.findIndex((obj) => obj.id === loginDetails.id);
      var loginData = getUsers.find((obj) => obj.id === loginDetails.id);
      var contactArray = [];
      if (loginData) {
        if (loginData.contacts === null) {
          contactArray = [];
        } else {
          contactArray = loginData.contacts;
        }
        contactArray.push(contact);
        getUsers[index].contacts = contactArray;
        getUsers.push();
        localStorage.setItem("users", JSON.stringify(getUsers));
      }
    }
  };

  const editContact = (item) => {
    setContact(item)
  }

  const deleteContact = (item) => {
    contactList.splice(contactList.findIndex((obj) => obj.id === item.id),1)
  }

  return (
    <>
      <div className="d-flex justify-content-center row">
        <div className="mt-5 col-sm-9">
          <button
            type="button"
            style={{ float: "right" }}
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@getbootstrap"
          >
            Add Contact
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Contact
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={addContact}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="col-form-label">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        value={contact.name}
                        onChange={(e) => changeValue(e)}
                      />
                      <div className="text-danger">{formErrors.name}</div>
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">Email:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        id="email"
                        value={contact.email}
                        onChange={(e) => changeValue(e)}
                      />
                      <div className="text-danger">{formErrors.email}</div>
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">Phone Number:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={contact.phoneNumber}
                        onChange={(e) => changeValue(e)}
                      />
                      <div className="text-danger">{formErrors.phoneNumber}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image Upload</label>
                      <input
                        className="form-control"
                        type="file"
                        name="contactImage"
                        id="contactImage"
                        value={contact.contactImage}
                        onChange={(e) => changeValue(e)}
                      />
                      <div className="text-danger">{formErrors.contactImage}</div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-9 mt-5">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Image</th>
                <th scope="col" className="text-center" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contactList.length &&
                contactList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                      {" "}
                      <img
                        src={item.contactImage}
                        alt="Img"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td colSpan="2" className="text-center">
                        <img src={editImg} style={{width: "40px",cursor: "pointer"}} onClick={() => {editContact(item)}} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap"/><img src={deleteImg} onClick={() => {deleteContact(item)}} style={{width: "32px",cursor: "pointer"}}/>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
