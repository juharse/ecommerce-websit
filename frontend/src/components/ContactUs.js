// ContactUs.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUs = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Contact Us</h1>

      <section>
        <h2>Our Information</h2>
        <p>
          <strong>Address:</strong> 123 Company Street, Cityville, State, ZIP
        </p>
        <p>
          <strong>Email:</strong> info@example.com
        </p>
        <p>
          <strong>Phone:</strong> (555) 123-4567
        </p>
      </section>

      <section>
        <h2>Contact Form</h2>
        <p>
          Have questions or comments? Feel free to reach out to us using the
          form below.
        </p>

        {/* Add your contact form here */}
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input type="text" className="form-control" id="name" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Your Message
            </label>
            <textarea className="form-control" id="message" rows="4"></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>

      
    </div>
  );
};

export default ContactUs;
