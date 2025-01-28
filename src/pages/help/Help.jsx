import React from "react";

import "./Help.css";

const Help = () => {
  const faqs = [
    {
      question: "How do I browse products on Articraft?",
      answer:
        "You can explore our wide range of handmade crafts by navigating to the 'Shop' page and using the filters to narrow down your search.",
    },
    {
      question: "How can I place an order?",
      answer:
        "Select the product you like, click on 'Add to Cart,' and proceed to checkout. Follow the instructions to complete your purchase.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Go to the 'My Orders' section in your account to view the status and tracking details of your order.",
    },

    {
      question: "Can I save items for later?",
      answer:
        "Yes, you can add items to your wishlist by clicking the 'Add to Wishlist' button on the product page.",
    },
  ];

  const troubleshootingIssues = [
    {
      issue: "I can't log in to my account.",
      solution:
        "Ensure your email and password are correct.",
    },
    {
      issue: "I can't add a product to my cart.",
      solution:
        "Ensure the product is in stock. If the issue persists, try refreshing the page or contacting support.",
    },
   
    {
      issue: "I’m unable to complete the checkout process.",
      solution:
        "Double-check your payment details. If the issue persists, try using a different payment method or contact support.",
    },
    {
      issue: "My order hasn't arrived yet.",
      solution:
        "Check the tracking details in the 'My Orders' section. If there’s no update or the delivery is delayed, contact support for assistance.",
    },
  ];

  return (
    <div>
      
      <div className="help-container">
        <h1 className="help-header">Help Center</h1>

        {/* FAQ Section */}
        <h2 className="section-title">
          Frequently Asked Questions (FAQs)
          <div className="underline"></div>
        </h2>
        <div className="faq-section">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Troubleshooting Section */}
        <h2 className="section-title">
          Troubleshooting Common Issues
          <div className="underline" style={{ backgroundColor: "#dc3545" }}></div>
        </h2>
        <div className="troubleshooting-section">
          {troubleshootingIssues.map((issue, index) => (
            <div key={index} className="troubleshooting-item">
              <h3>Issue: {issue.issue}</h3>
              <p>Solution: {issue.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
