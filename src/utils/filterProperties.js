const filterProperties = (properties, criteria) => {
  if (!properties || !Array.isArray(properties)) return [];

  return properties.filter((p) => {
    if (criteria.type && criteria.type !== "any" && p.type.toLowerCase() !== criteria.type.toLowerCase()) return false;
    if (criteria.minPrice != null && p.price < criteria.minPrice) return false;
    if (criteria.maxPrice != null && p.price > criteria.maxPrice) return false;
    if (criteria.minBedrooms != null && p.bedrooms < criteria.minBedrooms) return false;
    if (criteria.maxBedrooms != null && p.bedrooms > criteria.maxBedrooms) return false;
    if (criteria.tenure && criteria.tenure !== "any" && p.tenure.toLowerCase() !== criteria.tenure.toLowerCase()) return false;
    if (criteria.hasGarden && !p.hasGarden) return false;
    if (criteria.hasParking && !p.hasParking) return false;

    const propPostcode = p.postcode || p.location.split(' ').pop();
    if (criteria.postcode && !propPostcode.toUpperCase().startsWith(criteria.postcode.toUpperCase())) return false;

    if (criteria.dateFrom && new Date(p.dateAdded) < new Date(criteria.dateFrom)) return false;

    return true;
  });
};

export default filterProperties;