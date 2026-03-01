import { useState } from "react";
import "../styles/FeedbackForm.css";

const QUESTIONS = [
  "Overall Event Experience",
  "Have you enjoyed the event?",
  "How would you rate the event organization (management, timing, flow of activities)?",
  "Did the event meet your expectations?",
  "Would you suggest for future intra-college events?",
];

export default function FeedbackForm() {
  const [step, setStep] = useState(0);
  const [ratings, setRatings] = useState<number[]>(
    new Array(QUESTIONS.length).fill(0),
  );
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (rating: number) => {
    const newRatings = [...ratings];
    newRatings[step] = rating;
    setRatings(newRatings);
  };

  const nextStep = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (submitted) {
    return (
      <div className="feedback-modal glass-card">
        <div className="feedback-success">
          <div className="emoji pulse">◈</div>
          <h2>Thank You!</h2>
          <p>Your feedback helps us make Thinai even better.</p>
          <button
            className="submit-btn"
            onClick={() => (window.location.href = "/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-modal glass-card">
      <div className="feedback-progress">
        <div
          className="progress-bar"
          style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="feedback-content">
        <span className="step-indicator">
          Question {step + 1} of {QUESTIONS.length}
        </span>
        <h2 className="question-text">{QUESTIONS[step]}</h2>

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`star-btn ${star <= ratings[step] ? "active" : ""}`}
              onClick={() => handleRate(star)}
              aria-label={`Rate ${star} stars`}
            >
              {star <= ratings[step] ? "★" : "☆"}
            </button>
          ))}
        </div>
      </div>

      <div className="feedback-actions">
        {step > 0 && (
          <button className="back-btn" onClick={prevStep}>
            Back
          </button>
        )}
        <button
          className="next-btn"
          onClick={nextStep}
          disabled={ratings[step] === 0}
        >
          {step === QUESTIONS.length - 1 ? "Submit Feedback" : "Next"}
        </button>
      </div>
    </div>
  );
}
