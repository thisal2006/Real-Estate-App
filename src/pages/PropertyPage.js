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

  const images = property.images?.length > 0 ? property.images : [property.picture];

  // Similar properties
  const similar = data.properties
    .filter(p => p.id !== id && p.type === property.type)
    .slice(0, 3);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!name || !email || !bookingDate) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success(`Viewing request sent for ${bookingDate.toDateString()}! We'll contact you soon.`);
    setName("");
    setEmail("");
    setBookingDate(null);
  };

  const shareProperty = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Property link copied to clipboard!");
  };

  // Dynamic Google Maps Embed URL (no API key, fully interactive, looks exactly like your screenshot)
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d0!3d51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(property.location)}!5e0!3m2!1sen!2suk!4v1700000000000`;

  return (
    <div
      ref={drag}
      className="property-page"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <header className="property-header">
        <h1>{property.bedrooms} Bed {property.type} - £{property.price.toLocaleString()}</h1>
        <p>{property.location}</p>
        <div className="property-actions">
          <button onClick={() => favouritesUtil.add(property)}>Add to Favorites</button>
          <button onClick={shareProperty}>Share</button>
          <Link to="/">← Back to Search</Link>
        </div>
      </header>

      <div className="image-gallery">
        <img className="large-image" src={images[currentImageIndex]} alt="Property" />
        <div className="thumbnails">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => setCurrentImageIndex(idx)}
              className={idx === currentImageIndex ? 'active' : ''}
            />
          ))}
        </div>
      </div>

      <p className="property-description">{property.description}</p>

      <div className="property-details">
        <p><strong>Tenure:</strong> {property.tenure}</p>
        <p><strong>Has Garden:</strong> {property.hasGarden ? 'Yes' : 'No'}</p>
        <p><strong>Has Parking:</strong> {property.hasParking ? 'Yes' : 'No'}</p>
        <p><strong>Date Added:</strong> {property.dateAdded}</p>
      </div>

      <img src={property.floorplan} alt="Floor Plan" className="floor-plan" />

      <iframe src={mapEmbedUrl} title="Property Location" className="map-embed"></iframe>

      <Tabs>
        <TabList>
          <Tab>Book Viewing</Tab>
        </TabList>
        <TabPanel>
          <form onSubmit={handleBooking} className="booking-form">
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