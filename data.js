// Sample data for the dashboard
const sampleData = {
  schedule: [
    { day: "Monday", operator: "John Smith", time: "9:00 AM - 5:00 PM", phone: "(555) 123-4567" },
    { day: "Tuesday", operator: "Sarah Johnson", time: "9:00 AM - 5:00 PM", phone: "(555) 234-5678" },
    { day: "Wednesday", operator: "Mike Davis", time: "9:00 AM - 5:00 PM", phone: "(555) 345-6789" },
    { day: "Thursday", operator: "Emily Wilson", time: "9:00 AM - 5:00 PM", phone: "(555) 456-7890" },
    { day: "Friday", operator: "David Brown", time: "9:00 AM - 5:00 PM", phone: "(555) 567-8901" },
    { day: "Saturday", operator: "Lisa Garcia", time: "10:00 AM - 4:00 PM", phone: "(555) 678-9012" },
    { day: "Sunday", operator: "Tom Martinez", time: "10:00 AM - 4:00 PM", phone: "(555) 789-0123" },
  ],

  properties: [
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main St, San Francisco, CA",
      contact: "John Manager",
      phone: "(415) 555-0101",
      email: "john@sunsetapts.com",
      units: 24,
      type: "Residential",
    },
    {
      id: 2,
      name: "Bay View Office Complex",
      address: "456 Business Ave, Oakland, CA",
      contact: "Sarah Admin",
      phone: "(510) 555-0202",
      email: "sarah@bayviewoffice.com",
      units: 12,
      type: "Commercial",
    },
  ],

  payments: [
    {
      id: 1,
      property: "Sunset Apartments",
      amount: "$2,500.00",
      dueDate: "2024-01-15",
      status: "Overdue",
      contact: "John Manager",
    },
    {
      id: 2,
      property: "Bay View Office Complex",
      amount: "$5,200.00",
      dueDate: "2024-01-20",
      status: "Pending",
      contact: "Sarah Admin",
    },
  ],

  messageTemplates: [
    {
      title: "Cleaning Service Confirmation",
      message:
        "Hello! This is to confirm your cleaning service appointment scheduled for [DATE] at [TIME]. Our team will arrive promptly and complete the work efficiently. Thank you for choosing The Bay Services!",
    },
    {
      title: "Maintenance Request Received",
      message:
        "We have received your maintenance request for [PROPERTY]. Our technician will contact you within 24 hours to schedule a convenient time. Reference #[REF_NUMBER]",
    },
    {
      title: "Payment Reminder",
      message:
        "This is a friendly reminder that your payment of $[AMOUNT] for [SERVICE] is due on [DATE]. Please contact us if you have any questions.",
    },
    {
      title: "Service Completion",
      message:
        "Your [SERVICE] has been completed successfully. If you have any concerns or feedback, please don't hesitate to contact us. Thank you for your business!",
    },
  ],

  services: [
    {
      name: "Residential Cleaning",
      description: "Comprehensive cleaning services for apartments and homes",
      pricing: "Starting at $120/visit",
      features: ["Deep cleaning", "Regular maintenance", "Eco-friendly products", "Insured staff"],
    },
    {
      name: "Commercial Cleaning",
      description: "Professional cleaning for offices and commercial spaces",
      pricing: "Starting at $200/visit",
      features: ["Office cleaning", "Restroom sanitization", "Floor maintenance", "Flexible scheduling"],
    },
    {
      name: "Property Maintenance",
      description: "General maintenance and repair services",
      pricing: "Starting at $85/hour",
      features: ["Plumbing repairs", "Electrical work", "HVAC maintenance", "Emergency services"],
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
}
