// PropertyPage.js (Updated with process.env.PUBLIC_URL for all image paths)
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useDrag } from "react-dnd";
import "react-tabs/style/react-tabs.css";
import data from "../data/properties.json";
import favouritesUtil from "../utils/favourites";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import PropertyCard from "../components/PropertyCard";

function PropertyPage() {
  const { id } = useParams();
  const property = data.properties.find(p => p.id === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDate, setBookingDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY",
    item: { property },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }), [property]);

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property not found</h2>
        <Link to="/">← Back to Search</Link>
      </div>
    );
  }

  const images = property.images || []; // Assuming this is the array from properties.json
  const thumbnails = images; // Assuming thumbnails use the same images array

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !bookingDate) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(`Viewing request sent for ${bookingDate.toDateString()}`);
    setName("");
    setEmail("");
    setBookingDate(null);
  };

  const similar = data.properties.filter(
    p => p.id !== id && p.type === property.type && Math.abs(p.price - property.price) < 100000
  ).slice(0, 3);

  return (
    <div className="property-page" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="property-header">
        <h1>{property.bedrooms} Bed {property.type} - £{property.price.toLocaleString()}</h1>
        <p>{property.location}</p>
        <Link to="/">← Back to Search</Link>
      </div>

      <div className="image-gallery">
        <img 
          src={`${process.env.PUBLIC_URL}${images[currentImageIndex]}`} 
          alt="Property main" 
          className="main-image" 
        />
        <div className="thumbnails">
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={`${process.env.PUBLIC_URL}${img}`}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => setCurrentImageIndex(idx)}
              className={idx === currentImageIndex ? "active" : ""}
            />
          ))}
        </div>
      </div>

      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floorplan</Tab>
          <Tab>Map</Tab>
          <Tab>Book Viewing</Tab>
        </TabList>

        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>

        <TabPanel>
          <img 
            src={`${process.env.PUBLIC_URL}${property.floorplan}`} 
            alt="Floorplan" 
            className="floorplan" 
          />
        </TabPanel>

        <TabPanel>
          <div className="map-embed">
            <iframe
              title="Property Location"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.123456789012!2d${property.longitude || '0.0'}!3d${property.latitude || '51.5'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTEuNTAwMDAwMDAwMDAwMDA!5e0!3m2!1sen!2suk!4v1600000000000`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </TabPanel>

        <TabPanel>
          <form onSubmit={handleSubmit} className="booking-form">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <DatePicker
              selected={bookingDate}
              onChange={(date) => setBookingDate(date)}
              placeholderText="Select Preferred Date"
              required
            />
            <button type="submit">Send Viewing Request</button>
          </form>
        </TabPanel>
      </Tabs>

      {similar.length > 0 && (
        <div className="similar-properties">
          <h3>Similar Properties</h3>
          <div className="property-grid">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyPage;

// DEC 4 UPDATE: Added tabs navigation, booking form with validation, Google Maps embed, and similar properties section
// Improved image gallery with thumbnail navigation
// New: Moved styles to classes for mobile responsiveness
// Latest Update: Added process.env.PUBLIC_URL to all image srcs for GitHub Pages compatibility