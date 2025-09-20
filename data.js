// Sample data for the dashboard
const sampleData = {
  schedule: [
    {
      day: "Monday",
      operator: "Thomas",
      manager: "David",
      time: "9:00 AM - 5:00 PM",
      phone: "(555) 123-4567",
      email: "thomas@thebayservices.com",
    },
    {
      day: "Tuesday",
      operator: "David",
      manager: "Emma",
      time: "9:00 AM - 5:00 PM",
      phone: "(555) 234-5678",
      email: "david@thebayservices.com",
    },
    {
      day: "Wednesday",
      operator: "Emma",
      manager: "Eric",
      time: "9:00 AM - 5:00 PM",
      phone: "(555) 345-6789",
      email: "emma@thebayservices.com",
    },
    {
      day: "Thursday",
      operator: "Eric",
      manager: "Nora",
      time: "9:00 AM - 5:00 PM",
      phone: "(555) 456-7890",
      email: "eric@thebayservices.com",
    },
    {
      day: "Friday",
      operator: "Nora",
      manager: "Trinity",
      time: "9:00 AM - 5:00 PM",
      phone: "(555) 567-8901",
      email: "nora@thebayservices.com",
    },
    {
      day: "Saturday",
      operator: "Trinity",
      manager: "Kenny",
      time: "10:00 AM - 4:00 PM",
      phone: "(555) 678-9012",
      email: "trinity@thebayservices.com",
    },
    {
      day: "Sunday",
      operator: "Kenny",
      manager: "Thomas",
      time: "10:00 AM - 4:00 PM",
      phone: "(555) 789-0123",
      email: "kenny@thebayservices.com",
    },
  ],

  properties: [
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main St, San Francisco, CA 94102",
      contact: "John Manager",
      phone: "(415) 555-0101",
      email: "john@sunsetapts.com",
      units: 24,
      type: "Residential",
      notes: "High-end residential complex with concierge service",
    },
    {
      id: 2,
      name: "Bay View Office Complex",
      address: "456 Business Ave, Oakland, CA 94607",
      contact: "Sarah Admin",
      phone: "(510) 555-0202",
      email: "sarah@bayviewoffice.com",
      units: 12,
      type: "Commercial",
      notes: "Modern office building with tech companies",
    },
    {
      id: 3,
      name: "Golden Gate Condos",
      address: "789 Ocean Blvd, San Francisco, CA 94121",
      contact: "Mike Property",
      phone: "(415) 555-0303",
      email: "mike@ggcondos.com",
      units: 36,
      type: "Residential",
      notes: "Luxury condominiums with ocean views",
    },
  ],

  payments: [
    {
      id: 1,
      property: "Sunset Apartments",
      amount: 2500.0,
      dueDate: "2024-01-15",
      status: "Overdue",
      contact: "John Manager",
      phone: "(415) 555-0101",
      description: "Monthly cleaning service",
    },
    {
      id: 2,
      property: "Bay View Office Complex",
      amount: 5200.0,
      dueDate: "2024-01-20",
      status: "Pending",
      contact: "Sarah Admin",
      phone: "(510) 555-0202",
      description: "Commercial cleaning and maintenance",
    },
    {
      id: 3,
      property: "Golden Gate Condos",
      amount: 3800.0,
      dueDate: "2024-01-25",
      status: "Due",
      contact: "Mike Property",
      phone: "(415) 555-0303",
      description: "Deep cleaning service",
    },
  ],

  messageTemplates: [
    {
      title: "Cleaning Service Confirmation",
      message:
        "Hello! This is {operatorName} from The Bay Services. I'm confirming your cleaning service appointment scheduled for [DATE] at [TIME]. Our professional team will arrive promptly and complete the work efficiently. Thank you for choosing The Bay Services!",
    },
    {
      title: "Maintenance Request Received",
      message:
        "Hi, this is {operatorName} from The Bay Services. We have received your maintenance request for [PROPERTY]. Our certified technician will contact you within 24 hours to schedule a convenient time. Reference #[REF_NUMBER]. Thank you!",
    },
    {
      title: "Payment Reminder",
      message:
        "Hello, this is {operatorName} from The Bay Services. This is a friendly reminder that your payment of $[AMOUNT] for [SERVICE] is due on [DATE]. Please contact us at your earliest convenience if you have any questions.",
    },
    {
      title: "Service Completion",
      message:
        "Hi! This is {operatorName} from The Bay Services. Your [SERVICE] has been completed successfully. Our team has ensured everything meets our high standards. If you have any concerns or feedback, please don't hesitate to contact us. Thank you for your business!",
    },
    {
      title: "Emergency Service Response",
      message:
        "Hello, this is {operatorName} from The Bay Services emergency line. We have received your urgent request and are dispatching our team immediately. Expected arrival time: [TIME]. Please ensure safe access to the property.",
    },
    {
      title: "Follow-up Service Check",
      message:
        "Hi! This is {operatorName} from The Bay Services. I'm following up on the [SERVICE] we completed on [DATE]. We want to ensure everything is working perfectly and you're completely satisfied with our service. Please let us know if you need anything else!",
    },
  ],

  services: [
    {
      name: "Residential Cleaning",
      description: "Comprehensive cleaning services for apartments, condos, and homes throughout the Bay Area",
      pricing: "Starting at $120/visit",
      features: [
        "Deep cleaning of all rooms",
        "Kitchen and bathroom sanitization",
        "Floor cleaning and mopping",
        "Dusting and vacuuming",
        "Eco-friendly cleaning products",
        "Insured and bonded staff",
      ],
      details:
        "Our residential cleaning service includes thorough cleaning of all living spaces, with special attention to high-touch areas. We use environmentally safe products and provide flexible scheduling to meet your needs.",
      frequency: "Weekly, bi-weekly, or monthly options available",
    },
    {
      name: "Commercial Cleaning",
      description: "Professional cleaning services for offices, retail spaces, and commercial buildings",
      pricing: "Starting at $200/visit",
      features: [
        "Office space cleaning",
        "Restroom sanitization",
        "Floor maintenance and waxing",
        "Window cleaning (interior)",
        "Trash removal and recycling",
        "Flexible after-hours scheduling",
      ],
      details:
        "Designed for businesses of all sizes, our commercial cleaning ensures a professional, healthy work environment. We work around your schedule to minimize disruption to your operations.",
      frequency: "Daily, weekly, or custom schedules available",
    },
    {
      name: "Property Maintenance",
      description: "General maintenance and repair services for residential and commercial properties",
      pricing: "Starting at $85/hour",
      features: [
        "Plumbing repairs and maintenance",
        "Basic electrical work",
        "HVAC system maintenance",
        "Painting and touch-ups",
        "Emergency repair services",
        "Licensed and insured technicians",
      ],
      details:
        "Our skilled maintenance team handles everything from minor repairs to preventive maintenance, helping you avoid costly emergency situations and maintain property value.",
      frequency: "On-demand or scheduled maintenance plans",
    },
    {
      name: "Deep Cleaning",
      description: "Intensive cleaning service for move-ins, move-outs, and seasonal deep cleans",
      pricing: "Starting at $300/service",
      features: [
        "Complete property deep clean",
        "Inside appliance cleaning",
        "Baseboard and trim cleaning",
        "Light fixture cleaning",
        "Cabinet interior cleaning",
        "Post-construction cleanup available",
      ],
      details:
        "Perfect for new tenants, property turnovers, or seasonal cleaning. Our deep cleaning service covers areas not included in regular cleaning, ensuring every corner is spotless.",
      frequency: "One-time service or seasonal scheduling",
    },
    {
      name: "Carpet Cleaning",
      description: "Professional carpet and upholstery cleaning using advanced equipment",
      pricing: "Starting at $150/room",
      features: [
        "Hot water extraction method",
        "Stain removal treatment",
        "Pet odor elimination",
        "Upholstery cleaning",
        "Fast drying techniques",
        "Eco-friendly cleaning solutions",
      ],
      details:
        "Using state-of-the-art equipment and proven techniques, we restore carpets and upholstery to like-new condition while extending their lifespan.",
      frequency: "Recommended every 6-12 months",
    },
    {
      name: "Window Cleaning",
      description: "Interior and exterior window cleaning for residential and commercial properties",
      pricing: "Starting at $8/window",
      features: [
        "Interior and exterior cleaning",
        "Screen cleaning and repair",
        "Sill and frame cleaning",
        "High-rise window access",
        "Streak-free guarantee",
        "Safety equipment certified",
      ],
      details:
        "Professional window cleaning that enhances natural light and improves property appearance. We handle everything from ground-level to high-rise windows safely and efficiently.",
      frequency: "Monthly, quarterly, or bi-annual service",
    },
  ],
}

// User data storage
const userData = {
  currentUser: null,
  userRole: "operator", // 'operator' or 'manager'
  isLoggedIn: false,
}

// Local storage keys
const STORAGE_KEYS = {
  USER_DATA: "bayServices_userData",
  PROPERTIES: "bayServices_properties",
  PAYMENTS: "bayServices_payments",
  FILES: "bayServices_files",
  SCHEDULE: "bayServices_schedule",
}
