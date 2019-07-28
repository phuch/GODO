export const calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
  const radLat1 = (Math.PI * lat1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
};

/**
 * @param {number} distance - distance (km) from the point represented by centerPoint
 * @param {array} centerPoint - two-dimensional array containing center coords [latitude, longitude]
 * @description
 *   calculates the four coordinates of a square bounding box
 */

getBoundingBox = function(centerPoint, distance) {
  if (distance < 0) {
    return "Illegal arguments";
  }

  // helper functions (degrees<–>radians)
  Number.prototype.degToRad = function() {
    return this * (Math.PI / 180);
  };
  Number.prototype.radToDeg = function() {
    return (180 * this) / Math.PI;
  };

  // Earth's radius (km)
  const R = 6378.1;

  // coordinate limits
  const MIN_LAT = (-90).degToRad();
  const MAX_LAT = (90).degToRad();
  const MIN_LON = (-180).degToRad();
  const MAX_LON = (180).degToRad();

  // angular distance in radians on a great circle
  const radDist = distance / R;
  // center point coordinates (deg)
  const degLat = centerPoint[0];
  const degLon = centerPoint[1];

  // center point coordinates (rad)
  const radLat = degLat.degToRad();
  const radLon = degLon.degToRad();

  // minimum and maximum latitudes for given distance
  let minLat = radLat - radDist;
  let maxLat = radLat + radDist;

  let minLon, maxLon;

  // define deltaLon to help determine min and max longitudes
  const deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));

  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    minLon = radLon - deltaLon;
    maxLon = radLon + deltaLon;
    if (minLon < MIN_LON) {
      minLon = minLon + 2 * Math.PI;
    }
    if (maxLon > MAX_LON) {
      maxLon = maxLon - 2 * Math.PI;
    }
  }
  // a pole is within the given distance
  else {
    minLat = Math.max(minLat, MIN_LAT);
    maxLat = Math.min(maxLat, MAX_LAT);
    minLon = MIN_LON;
    maxLon = MAX_LON;
  }
  return [
    minLon.radToDeg(),
    minLat.radToDeg(),
    maxLon.radToDeg(),
    maxLat.radToDeg()
  ];
};
