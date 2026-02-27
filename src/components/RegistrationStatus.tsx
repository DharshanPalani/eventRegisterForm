import type { Registration } from "../types";
import Ticket from "./Ticket";
import "../styles/RegistrationStatus.css";

type Props = {
  registration: Registration;
};

export default function RegistrationStatus({ registration }: Props) {
  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-header"></div>

        <h1 className="registration-title">Registration Successful</h1>
        <div className="registration-info">
          <div className="emoji">✅</div>
          <h2>Welcome, {registration.name}!</h2>
          <p>Your Ticket ID:</p>
          <div className="ticket-id">{registration.id}</div>
          {registration.attended && (
            <p className="attended">You have been marked as attended!</p>
          )}
        </div>

        <Ticket registration={registration} />
      </div>
    </div>
  );
}
