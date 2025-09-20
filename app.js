// Main application logic
class DashboardApp {
  constructor() {
    this.currentSection = "schedule"
    this.userData = {
      currentUser: null,
      userRole: "operator",
      isLoggedIn: false,
    }
    this.STORAGE_KEYS = {
      USER_DATA: "userData",
      PROPERTIES: "properties",
      PAYMENTS: "payments",
      FILES: "files",
    }
    this.sampleData = {
      schedule: [
        { day: "Monday", operator: "John Doe", time: "9:00 AM", phone: "123-456-7890" },
        { day: "Tuesday", operator: "Jane Smith", time: "10:00 AM", phone: "098-765-4321" },
      ],
      properties: [
        {
          id: 1,
          name: "Property A",
          address: "123 Main St",
          contact: "John",
          phone: "123-456-7890",
          email: "john@example.com",
          units: 10,
          type: "Residential",
        },
      ],
      payments: [{ property: "Property A", amount: "$500", dueDate: "2023-10-01", contact: "John", status: "Due" }],
      messageTemplates: [{ title: "Payment Reminder", message: "Please make your payment by the due date." }],
      services: [
        {
          name: "Cleaning",
          description: "Professional cleaning services.",
          pricing: "$100 per unit",
          features: ["Weekly cleaning", "Deep cleaning"],
        },
      ],
    }
    this.init()
  }

  init() {
    this.loadUserData()
    this.setupEventListeners()
    this.startTimeUpdater()
    this.showLoadingScreen()

    setTimeout(() => {
      this.hideLoadingScreen()
      this.showLoginScreen()
    }, 1500)
  }

  loadUserData() {
    const stored = localStorage.getItem(this.STORAGE_KEYS.USER_DATA)
    if (stored) {
      this.userData = { ...this.userData, ...JSON.parse(stored) }
    }
  }

  saveUserData() {
    localStorage.setItem(this.STORAGE_KEYS.USER_DATA, JSON.stringify(this.userData))
  }

  setupEventListeners() {
    // URL input enter key
    document.getElementById("urlInput")?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.loadCustomUrl()
      }
    })

    // Map search enter key
    document.getElementById("mapSearch")?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.searchLocation()
      }
    })
  }

  showLoadingScreen() {
    document.getElementById("loadingScreen").classList.remove("hidden")
    document.getElementById("loginScreen").classList.add("hidden")
    document.getElementById("dashboard").classList.add("hidden")
  }

  hideLoadingScreen() {
    document.getElementById("loadingScreen").classList.add("hidden")
  }

  showLoginScreen() {
    document.getElementById("loginScreen").classList.remove("hidden")
    document.getElementById("dashboard").classList.add("hidden")
  }

  showDashboard() {
    document.getElementById("loginScreen").classList.add("hidden")
    document.getElementById("dashboard").classList.remove("hidden")
    this.updateUserInterface()
    this.loadSectionData()
  }

  updateUserInterface() {
    document.getElementById("userName").textContent = this.userData.currentUser || "Demo User"
    document.getElementById("userRole").textContent = this.userData.userRole.toUpperCase()

    // Show/hide manager-only elements
    const managerElements = document.querySelectorAll(".manager-only")
    managerElements.forEach((el) => {
      if (this.userData.userRole === "manager") {
        el.classList.add("show")
      } else {
        el.classList.remove("show")
      }
    })
  }

  startTimeUpdater() {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      document.getElementById("currentTime").textContent = timeString

      // Update current operator
      this.updateCurrentOperator()
    }

    updateTime()
    setInterval(updateTime, 1000)
  }

  updateCurrentOperator() {
    const now = new Date()
    const dayName = now.toLocaleDateString("en-US", { weekday: "long" })
    const currentSchedule = this.sampleData.schedule.find((s) => s.day === dayName)

    if (currentSchedule) {
      document.getElementById("currentOperatorName").textContent =
        `${currentSchedule.operator} (${currentSchedule.phone})`
    }
  }

  showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("hidden")
    })

    // Show selected section
    document.getElementById(sectionName + "Section").classList.remove("hidden")

    // Update navigation
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active")
      btn.classList.add("text-gray-300")
      btn.classList.remove("text-white")
    })

    event.target.classList.add("active")
    event.target.classList.add("text-white")
    event.target.classList.remove("text-gray-300")

    this.currentSection = sectionName
    this.loadSectionData()
  }

  loadSectionData() {
    switch (this.currentSection) {
      case "schedule":
        this.loadScheduleData()
        break
      case "properties":
        this.loadPropertiesData()
        break
      case "payments":
        this.loadPaymentsData()
        break
      case "messages":
        this.loadMessagesData()
        break
      case "services":
        this.loadServicesData()
        break
      case "files":
        this.loadFilesData()
        break
    }
  }

  loadScheduleData() {
    const grid = document.getElementById("scheduleGrid")
    grid.innerHTML = this.sampleData.schedule
      .map(
        (item) => `
            <div class="schedule-item bg-gray-50 p-4 rounded-lg border">
                <h3 class="font-medium text-gray-900">${item.day}</h3>
                <p class="text-sm text-gray-600 mt-1">${item.operator}</p>
                <p class="text-sm text-gray-500">${item.time}</p>
                <p class="text-sm text-blue-600">${item.phone}</p>
            </div>
        `,
      )
      .join("")
  }

  loadPropertiesData() {
    const list = document.getElementById("propertiesList")
    const properties = this.getStoredData(this.STORAGE_KEYS.PROPERTIES) || this.sampleData.properties

    list.innerHTML = properties
      .map(
        (property) => `
            <div class="property-card bg-gray-50 p-4 rounded-lg border">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-900">${property.name}</h3>
                        <p class="text-sm text-gray-600 mt-1">${property.address}</p>
                        <div class="mt-2 space-y-1">
                            <p class="text-sm"><span class="font-medium">Contact:</span> ${property.contact}</p>
                            <p class="text-sm"><span class="font-medium">Phone:</span> ${property.phone}</p>
                            <p class="text-sm"><span class="font-medium">Email:</span> ${property.email}</p>
                            <p class="text-sm"><span class="font-medium">Units:</span> ${property.units} (${property.type})</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="app.editProperty(${property.id})" class="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                        <button onclick="app.deleteProperty(${property.id})" class="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  loadPaymentsData() {
    const list = document.getElementById("paymentsList")
    const payments = this.getStoredData(this.STORAGE_KEYS.PAYMENTS) || this.sampleData.payments

    list.innerHTML = payments
      .map(
        (payment) => `
            <div class="bg-gray-50 p-4 rounded-lg border">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-medium text-gray-900">${payment.property}</h3>
                        <p class="text-sm text-gray-600 mt-1">Amount: ${payment.amount}</p>
                        <p class="text-sm text-gray-600">Due: ${payment.dueDate}</p>
                        <p class="text-sm text-gray-600">Contact: ${payment.contact}</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full ${payment.status === "Overdue" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}">
                        ${payment.status}
                    </span>
                </div>
            </div>
        `,
      )
      .join("")
  }

  loadMessagesData() {
    const container = document.getElementById("messageTemplates")
    container.innerHTML = this.sampleData.messageTemplates
      .map(
        (template) => `
            <div class="message-template bg-gray-50 p-4 rounded-lg border" onclick="app.copyMessage('${template.message.replace(/'/g, "\\'")}')">
                <h3 class="font-medium text-gray-900 mb-2">${template.title}</h3>
                <p class="text-sm text-gray-600">${template.message}</p>
                <p class="text-xs text-blue-600 mt-2">Click to copy</p>
            </div>
        `,
      )
      .join("")
  }

  loadServicesData() {
    const list = document.getElementById("servicesList")
    list.innerHTML = this.sampleData.services
      .map(
        (service) => `
            <div class="bg-gray-50 p-6 rounded-lg border">
                <h3 class="font-medium text-gray-900 text-lg mb-2">${service.name}</h3>
                <p class="text-gray-600 mb-3">${service.description}</p>
                <p class="text-blue-600 font-medium mb-3">${service.pricing}</p>
                <ul class="space-y-1">
                    ${service.features.map((feature) => `<li class="text-sm text-gray-600">• ${feature}</li>`).join("")}
                </ul>
            </div>
        `,
      )
      .join("")
  }

  loadFilesData() {
    const list = document.getElementById("filesList")
    const files = this.getStoredData(this.STORAGE_KEYS.FILES) || []

    if (files.length === 0) {
      list.innerHTML = '<p class="text-gray-500 text-center py-4">No files uploaded yet.</p>'
      return
    }

    list.innerHTML = files
      .map(
        (file) => `
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded border">
                <span class="text-sm text-gray-700">${file.name}</span>
                <button onclick="app.deleteFile('${file.id}')" class="text-red-600 hover:text-red-800 text-sm">Delete</button>
            </div>
        `,
      )
      .join("")
  }

  // Utility methods
  getStoredData(key) {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  }

  saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  copyMessage(message) {
    navigator.clipboard.writeText(message).then(() => {
      alert("Message copied to clipboard!")
    })
  }

  // Property management
  addProperty() {
    const name = prompt("Property Name:")
    if (!name) return

    const address = prompt("Address:")
    const contact = prompt("Contact Person:")
    const phone = prompt("Phone:")
    const email = prompt("Email:")
    const units = prompt("Number of Units:")
    const type = prompt("Type (Residential/Commercial):")

    const properties = this.getStoredData(this.STORAGE_KEYS.PROPERTIES) || this.sampleData.properties
    const newProperty = {
      id: Date.now(),
      name,
      address,
      contact,
      phone,
      email,
      units,
      type,
    }

    properties.push(newProperty)
    this.saveData(this.STORAGE_KEYS.PROPERTIES, properties)
    this.loadPropertiesData()
  }

  editProperty(id) {
    const properties = this.getStoredData(this.STORAGE_KEYS.PROPERTIES) || this.sampleData.properties
    const property = properties.find((p) => p.id === id)
    if (!property) return

    property.name = prompt("Property Name:", property.name) || property.name
    property.address = prompt("Address:", property.address) || property.address
    property.contact = prompt("Contact Person:", property.contact) || property.contact
    property.phone = prompt("Phone:", property.phone) || property.phone
    property.email = prompt("Email:", property.email) || property.email
    property.units = prompt("Number of Units:", property.units) || property.units
    property.type = prompt("Type (Residential/Commercial):", property.type) || property.type

    this.saveData(this.STORAGE_KEYS.PROPERTIES, properties)
    this.loadPropertiesData()
  }

  deleteProperty(id) {
    if (!confirm("Are you sure you want to delete this property?")) return

    const properties = this.getStoredData(this.STORAGE_KEYS.PROPERTIES) || this.sampleData.properties
    const filtered = properties.filter((p) => p.id !== id)
    this.saveData(this.STORAGE_KEYS.PROPERTIES, filtered)
    this.loadPropertiesData()
  }

  // Browser functionality
  loadSite(url) {
    document.getElementById("browserFrame").src = url
  }

  loadCustomUrl() {
    const url = document.getElementById("urlInput").value
    if (url) {
      this.loadSite(url)
    }
  }

  // File management
  uploadFiles() {
    const fileInput = document.getElementById("fileInput")
    const files = Array.from(fileInput.files)

    if (files.length === 0) {
      alert("Please select files to upload.")
      return
    }

    const storedFiles = this.getStoredData(this.STORAGE_KEYS.FILES) || []

    files.forEach((file) => {
      storedFiles.push({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
      })
    })

    this.saveData(this.STORAGE_KEYS.FILES, storedFiles)
    this.loadFilesData()
    fileInput.value = ""
    alert("Files uploaded successfully!")
  }

  deleteFile(id) {
    if (!confirm("Are you sure you want to delete this file?")) return

    const files = this.getStoredData(this.STORAGE_KEYS.FILES) || []
    const filtered = files.filter((f) => f.id !== id)
    this.saveData(this.STORAGE_KEYS.FILES, filtered)
    this.loadFilesData()
  }

  // Map functionality
  searchLocation() {
    const query = document.getElementById("mapSearch").value
    if (query) {
      alert(`Searching for: ${query}\n(In a real implementation, this would integrate with a mapping service)`)
    }
  }
}

// Global functions for HTML onclick handlers
function loginWithRole(role) {
  window.app.userData.currentUser = role === "manager" ? "Manager User" : "Operator User"
  window.app.userData.userRole = role
  window.app.userData.isLoggedIn = true
  window.app.saveUserData()
  window.app.showDashboard()
}

function demoLogin() {
  // This function is no longer needed but kept for compatibility
  loginWithRole("manager")
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.app.userData = {
      currentUser: null,
      userRole: "operator",
      isLoggedIn: false,
    }
    window.app.saveUserData()
    location.reload()
  }
}

function showSection(section) {
  window.app.showSection(section)
}

function addProperty() {
  window.app.addProperty()
}

function loadSite(url) {
  window.app.loadSite(url)
}

function loadCustomUrl() {
  window.app.loadCustomUrl()
}

function uploadFiles() {
  window.app.uploadFiles()
}

function searchLocation() {
  window.app.searchLocation()
}

// Initialize the application
let app
document.addEventListener("DOMContentLoaded", () => {
  app = new DashboardApp()
  window.app = app // Expose app to global scope for onclick handlers
})
