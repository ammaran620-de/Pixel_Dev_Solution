export const site = {
  name: "Pixel-Dev Solution",
  email: "hello@pixel-dev.com",
  whatsapp: "https://wa.me/923304070719",
  calLink: "https://cal.com/pixel-dev",
  location: "Pakistan",
  hours: "2pm–10pm PKT — the full European working day",
  priceLine: "Most custom models start at $15k and are deployed within 6 weeks.",
  founders: [
    {
      name: "Ali Raza",
      role: "Lead Computer Vision Engineer",
      bio: "Former ML lead at a major robotics firm. Ali specializes in optimizing PyTorch and YOLO architectures for ultra-low latency edge devices.",
      photo: "/founders/founder1.jpg"
    },
    {
      name: "Fahad Hassan",
      role: "Systems Architect",
      bio: "Fahad builds the robust real-time platforms that handle the massive data streams our models generate, ensuring factory operators get exactly what they need.",
      photo: "/founders/founder2.jpg"
    }
  ],
  engagement: {
    pilot: { label: "Pilot", duration: "2 weeks", price: "from $3k", scope: "Trained model on your footage + accuracy report" },
    build: { label: "Build", duration: "6–10 weeks", price: "from $15k", scope: "Deployed system on your hardware, integrated to PLC/MES" },
    support: { label: "Support", duration: "monthly", price: "from $1k", scope: "Documentation, retraining pipeline, 30-day support" },
  },
  problemTypes: [
    { icon: "defect", title: "Surface defect detection", description: "Scratches, bridges, voids, and contamination on moving parts.", constraint: "down to 0.2 mm at 240 units/min" },
    { icon: "verify", title: "Assembly verification", description: "Confirm every component is present, seated, and correct.", constraint: "14-point check in 40 ms" },
    { icon: "read", title: "Label and code reading", description: "OCR and barcode capture on curved, scuffed, or low-contrast surfaces.", constraint: "99.6% read rate, no re-scan" },
    { icon: "dimension", title: "Counting and dimensioning", description: "Parcel, pallet, and part counts with volumetric measurement.", constraint: "±3 mm on moving cartons" },
    { icon: "zone", title: "Zone and safety monitoring", description: "Detect people and equipment entering restricted areas.", constraint: "sub-100 ms alert to PLC" },
    { icon: "speed", title: "Line speed inspection", description: "Full-rate inspection without slowing the line.", constraint: "0 line-rate reduction" }
  ]
};
