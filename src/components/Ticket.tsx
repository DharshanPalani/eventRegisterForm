import { useRef } from "react";
import type { Registration } from "../types";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import "../styles/Ticket.css";

type Props = {
  registration: Registration;
};

export default function Ticket({ registration }: Props) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (ticketRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(ticketRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `Thinai2K26-Ticket-${registration.registration_no}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download ticket", err);
      alert(
        "Failed to download ticket. Please try again or take a screenshot.",
      );
    }
  };

  return (
    <div className="ticket-wrapper flex flex-col items-center">
      <button className="download-btn mb-6" onClick={handleDownload}>
        Download Ticket (PNG)
      </button>

      <div className="ticket-card flex flex-col items-center" ref={ticketRef}>
        <img
          className="ticket-bg"
          src="/ticket-background.png"
          alt="Ticket Background"
        />

        <img
          className="ticket-banner"
          src="/ticket-banner.png"
          alt="Event Banner"
        />

        <div className="ticket-title">THINAI 2K26</div>
        <div className="ticket-subtitle">Cultural Festival</div>

        <div className="ticket-details">
          <div className="detail-row">
            <div className="detail-item fixed-width">
              <div className="label">Name</div>
              <div className="value">{registration.name}</div>
            </div>
            <div className="detail-item">
              <div className="label">Register No.</div>
              <div className="value">{registration.registration_no}</div>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item fixed-width">
              <div className="label">Department</div>
              <div className="value">{registration.department}</div>
            </div>
            <div className="detail-item">
              <div className="label">Category</div>
              <div className="value">{registration.category || "N/A"}</div>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item fixed-width">
              <div className="label">Date</div>
              <div className="value">March 5 2026</div>
            </div>
            <div className="detail-item">
              <div className="label">Time</div>
              <div className="value">09:00 AM</div>
            </div>
          </div>
        </div>

        <div className="ticket-qr-section">
          <QRCodeSVG
            className="ticket-qr"
            value={registration.id.toString()}
            size={150}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          />
          <div className="qr-number">{registration.id}</div>
          <div className="qr-desc">Show this code to the Checker</div>
          <div className="important-notice">
            ENTRY TIME 8.00 AM TO 9.00 AM ONLY
          </div>
        </div>
      </div>
    </div>
  );
}
