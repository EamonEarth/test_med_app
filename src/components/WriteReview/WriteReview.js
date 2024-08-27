import React, { useState } from 'react';
import './WriteReview.css';

const WriteReview = ({ onSubmit, doctorName }) => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0); // New state for rating


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, review, rating });
    setName('');
    setReview('');
    setRating(0); // Reset rating after submission


  };

  return (
    <div className="write-review-container">
      <h3>Leave a review of {doctorName}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">

          <label htmlFor="name">Your name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? 'star selected' : 'star'}
                onClick={() => setRating(star)}
                onMouseEnter={() => setRating(star)}  // Update rating on hover
                onMouseLeave={() => setRating(rating)} // Maintain rating on mouse leave
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default WriteReview;
