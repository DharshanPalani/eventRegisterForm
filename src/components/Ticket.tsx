import type { Registration } from "../types";
import { QRCodeSVG } from "qrcode.react";
import "../styles/Ticket.css";

type Props = {
  registration: Registration;
};

export default function Ticket({ registration }: Props) {
  return (
    <div className="ticket-wrapper">
      <div className="ticket-card">
        <h3>🎟️ Event Ticket 🎟️</h3>

        <QRCodeSVG
          className="ticket-qr"
          value={registration.id.toString()}
          size={120}
          bgColor="#ffffff"
          fgColor="#673ab7"
          level="H"
        />

        <div className="ticket-info">
          <div>
            <strong>Name:</strong> {registration.name}
          </div>
          {registration.phone && (
            <div>
              <strong>Phone:</strong> {registration.phone}
            </div>
          )}
          {registration.registration_no && (
            <div>
              <strong>Registration Number:</strong>
              {registration.registration_no}
            </div>
          )}
          <div>
            <strong>Ticket ID:</strong> {registration.id}
          </div>
          {registration.department && (
            <div>
              <strong>Department:</strong> {registration.department}
            </div>
          )}
          {registration.attended && (
            <div className="attended">✅ Marked attended</div>
          )}
        </div>
      </div>
    </div>
  );
}
