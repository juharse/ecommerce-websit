// AboutUs.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">About Us</h1>

      {/* Mission Section */}
      <section>
        <h2>Mission</h2>
        <p>
          Our mission is To be a customer-centric company, where customers can find and discover things they might want to buy online, and endeavors to offer its customers the most affordable prices.
        </p>
      </section>

      {/* Vision Section */}
      <section>
        <h2>Vision</h2>
        <p>
          Our vision is to be Make commerce better for our customers, so businesses can focus on what they do best.
        </p>
      </section>

      {/* Values Section */}
      <section>
        <h2>Values</h2>
        <ul>
          <li>
            <strong>Integrity:</strong> We conduct our business with honesty,
            transparency, and ethical behavior.
          </li>
          <li>
            <strong>Customer Focus:</strong> Our customers are at the center
            of everything we do. We listen, understand, and exceed their
            expectations.
          </li>
          <li>
            <strong>Innovation:</strong> We embrace creativity and
            forward-thinking to drive continuous improvement and stay ahead in
            a dynamic market.
          </li>
          <li>
            <strong>Teamwork:</strong> Collaboration and teamwork are
            fundamental to our success. We value diversity and work together to
            achieve common goals.
          </li>
          <li>
            <strong>Social Responsibility:</strong> We are committed to
            contributing positively to the communities we serve and minimizing
            our environmental impact.
          </li>
        </ul>
      </section>

    </div>
  );
};

export default AboutUs;
