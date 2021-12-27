import React from "react";
import { useEffect, useState } from "react";
import "./mailsender.css";
import swal from 'sweetalert';


export default function Mailsender() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
    

  const handleBlur = (e) => {
    if (e.target.value.length !== 0) {
      e.target.className = "valid";
      setError("");
    } else {
      e.target.className = "invalid";
      setError(`Please, complete ${e.target.name} input.`);
    }
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once discard, you will write all inputs again!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("All inputs were deleted!", {
          icon: "success",
        })
        .then(() => {
          window.location.reload();
        });
      } else {
        swal("You can continue writing.");
      }
    });
  }

  const handleEmail = (e) => {
    if (
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
        e.target.value
      )
    ) {
      setError("");
      e.target.className = "valid";
    } else {
      (e.target.className = "invalid")
        setError(`Please, put a valid Email.`);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    
    if (
        document.getElementById("address").className === "valid" &&
        document.getElementById("subject").className === "valid" &&
        document.getElementById("message").className === "valid"
    )
     {
    document.getElementById("spinner").style.display = "block";
    setTimeout(() => {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("address").classList.remove("valid");
        document.getElementById("subject").classList.remove("valid");
        document.getElementById("message").classList.remove("valid");
        setMessage("Your message has been sent successfully.");
        document.getElementById("form").reset();
        setTimeout(() => {
        setMessage("");
       
        }, 2000);
        }
        , 2500);
    } else {
        setError("Please, complete all inputs.");
    }
  }

  return (
    <div className="container">
      <h1 className="title">E-Mail simulator</h1>
      <div className="form">
        <form id="form">
          <label>
            <h3>Address</h3>
            <input
              className="writing"
              id="address"
              onChange={handleEmail}
              type="email"
              name="address"
              placeholder="Example@mail.com"
              autoComplete="off"
              required
            />
          </label>
          <label>
            <h3>Subject</h3>
            <input
              className="writing"
              onChange={handleBlur}
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              autoComplete="off"
              required
            />
          </label>

          <label>
            <h3>Message</h3>
            <textarea
              className="writing"
              onChange={handleBlur}
              id="message"
              type="text"
              name="Message"
              placeholder="Message"
              autoComplete="off"
              required
            />
          <div className="spinner" id="spinner"></div>
          </label>
          <p className="error">{error}</p>
            <p className="send">{message}</p>
          <div className="btnContainer">
            <button className="sendBtn" type="submit" onClick={handleSend}>Send</button>
            <button className="discard" onClick={handleDiscard}>Discard</button>
          </div>
        </form>
      </div>
    </div>
  );
}
