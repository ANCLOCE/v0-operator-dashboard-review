// Main application logic
class DashboardApp {
  constructor() {
    this.currentSection = "dashboard"
    this.userData = {
      currentUser: null,
      userRole: "operator",
      isLoggedIn: false,
    }
    this.selectedOperator = "Thomas"
    this.STORAGE_KEYS = {
      USER_DATA: "userData",
      PROPERTIES: "properties",
      PAYMENTS: "payments",
      FILES: "files",
      SCHEDULE: "schedule",
    }
    this.sampleData = {
      properties: [],
      payments: [],
      messageTemplates: [],
      services: [],
      schedule: [],
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
    // Operator name selection
    document.getElementById("operatorNameSelect")?.addEventListener("change", (e) => {
      this.selectedOperator = e.target.value
      this.loadMessagesData()
    })

    // URL inputs enter key
    document.getElementById("urlInput1")?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.loadCustomUrl(1)
    })
    document.getElementById("urlInput2")?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.loadCustomUrl(2)
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
    this.setupNavigation()
    this.loadSectionData()
  }

  setupNavigation() {
    const navigationTabs = document.getElementById("navigationTabs")
    let tabs = []

    if (this.userData.userRole === "operator") {
      tabs = [
        { id: "dashboard", label: "Dashboard" },
        { id: "automaticAnswers", label: "Automatic Answers" },
        { id: "serviceInfo", label: "Service Info & Prices" },
        { id: "propertyManagement", label: "Property Management" },
        { id: "browser", label: "Browser" },
      ]
    } else if (this.userData.userRole === "manager") {
      tabs = [
        { id: "dashboard", label: "Dashboard" },
        { id: "propertyManagement", label: "Property Management" },
        { id: "outstandingPayments", label: "Outstanding Payments" },
        { id: "administrativeFiles", label: "Administrative Files" },
        { id: "browser", label: "Browser" },
      ]
    }

    navigationTabs.innerHTML = tabs
      .map(
        (tab) => `
      <button onclick="showSection('${tab.id}')" class="nav-btn ${tab.id === "dashboard" ? "text-white" : "text-gray-300"} px-3 py-4 text-sm font-medium hover:bg-gray-700 ${tab.id === "dashboard" ? "active" : ""}">
        ${tab.label}
      </button>
    `,
      )
      .join("")
  }

  updateUserInterface() {
    document.getElementById("userRole").textContent = this.userData.userRole.toUpperCase()

    // Show/hide role-specific elements
    const operatorElements = document.querySelectorAll(".operator-only")
    const managerElements = document.querySelectorAll(".manager-only")

    operatorElements.forEach((el) => {
      if (this.userData.userRole === "operator") {
        el.classList.remove("hidden")
      } else {
        el.classList.add("hidden")
      }
    })

    managerElements.forEach((el) => {
      if (this.userData.userRole === "manager") {
        el.classList.remove("hidden")
      } else {
        el.classList.add("hidden")
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
      const operatorInfo = `${currentSchedule.operator} (${currentSchedule.phone})`
      document.getElementById("currentOperatorName").textContent = operatorInfo
    }
  }

  showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("hidden")
    })

    // Show selected section
    const targetSection = document.getElementById(sectionName + "Section")
    if (targetSection) {
      targetSection.classList.remove("hidden")
    }

    // Update navigation
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active", "text-white")
      btn.classList.add("text-gray-300")
    })

    // Find and activate the clicked button
    const activeBtn = Array.from(document.querySelectorAll(".nav-btn")).find(
      (btn) => btn.onclick && btn.onclick.toString().includes(`'${sectionName}'`),
    )
    if (activeBtn) {
      activeBtn.classList.add("active", "text-white")
      activeBtn.classList.remove("text-gray-300")
    }

    this.currentSection = sectionName
    this.loadSectionData()
  }

  loadSectionData() {
    switch (this.currentSection) {
      case "dashboard":
        this.loadDashboardData()
        break
      case "automaticAnswers":
        this.loadMessagesData()
        break
      case "serviceInfo":
        this.loadServicesData()
        break
      case "propertyManagement":
        this.loadPropertiesData()
        break
      case "outstandingPayments":
        this.loadPaymentsData()
        break
      case "administrativeFiles":
        this.loadFilesData()
        break
    }
  }

  loadDashboardData() {
    // Update dashboard statistics
    const properties = this.getStoredData(this.STORAGE_KEYS.PROPERTIES) || this.sampleData.properties
    const payments = this.getStoredData(this.STORAGE_KEYS.PAYMENTS) || this.sampleData.payments

    document.getElementById("activePropertiesCount").textContent = properties.length
    document.getElementById("completedTodayCount").textContent = Math.floor(Math.random() * 10) + 1
    document.getElementById("pendingTasksCount").textContent = payments.filter((p) => p.status !== "Paid").length

    // Load schedule
    this.loadScheduleData()
  }

  loadScheduleData() {
    const grid = document.getElementById("scheduleGrid")
    const schedule = this.getStoredData(this.STORAGE_KEYS.SCHEDULE) || this.sampleData.schedule

    grid.innerHTML = schedule
      .map(
        (item) => `
      <div class="schedule-item bg-gray-50 p-4 rounded-lg border hover:bg-gray-100 transition-colors">
        <h3 class="font-medium text-gray-900 mb-2">${item.day}</h3>
        <div class="space-y-1 text-sm">
          <p><span class="font-medium">Operator:</span> ${item.operator}</p>
          <p><span class="font-medium">Manager:</span> ${item.manager}</p>
          <p><span class="font-medium">Time:</span> ${item.time}</p>
          <p><span class="font-medium">Phone:</span> ${item.phone}</p>
        </div>
        <button onclick="app.editScheduleItem('${item.day}')" class="mt-2 text-blue-600 hover:text-blue-800 text-xs">Edit</button>
      </div>
    `,
      )
      .join("")
  }

  loadMessagesData() {
    const container = document.getElementById("messageTemplates")
    if (!container) return

    container.innerHTML = this.sampleData.messageTemplates
      .map((template) => {
        const personalizedMessage = template.message.replace(/{operatorName}/g, this.selectedOperator)
        return `
        <div class="message-template bg-gray-50 p-4 rounded-lg border hover:bg-blue-50 transition-colors cursor-pointer" onclick="app.copyMessage('${personalizedMessage.replace(/'/g, "\\'")}')">
          <h3 class="font-medium text-gray-900 mb-2">${template.title}</h3>
          <p class="text-sm text-gray-600 mb-2">${personalizedMessage}</p>
          <p class="text-xs text-blue-600 font-medium">Click to copy</p>
        </div>
      `
      })
      .join("")
  }

  loadServicesData() {
    const list = document.getElementById("servicesList")
    if (!list) return

    list.innerHTML = this.sampleData.services
      .map(
        (service) => `
      <div class="service-card bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border hover:shadow-md transition-shadow cursor-pointer" onclick="app.showServiceModal('${service.name}')">
        <h3 class="font-semibold text-blue-900 text-lg mb-2">${service.name}</h3>
        <p class="text-blue-700 text-sm mb-3">${service.description}</p>
        <p class="text-blue-800 font-medium">${service.pricing}</p>
        <div class="mt-3 text-xs text-blue-600">Click for details</div>
      </div>
    `,
      )
      .join("")
  }

  showServiceModal(serviceName) {
    const service = this.sampleData.services.find((s) => s.name === serviceName)
    if (!service) return

    document.getElementById("serviceModalTitle").textContent = service.name
    document.getElementById("serviceModalContent").innerHTML = `
      <div class="space-y-4">
        <p class="text-gray-700">${service.description}</p>
        <div>
          <h4 class="font-medium text-gray-900 mb-2">Pricing</h4>
          <p class="text-blue-600 font-medium">${service.pricing}</p>
          ${service.frequency ? `<p class="text-sm text-gray-600">${service.frequency}</p>` : ""}
        </div>
        <div>
          <h4 class="font-medium text-gray-900 mb-2">Features & Benefits</h4>
          <ul class="space-y-1">
            ${service.features.map((feature) => `<li class="text-sm text-gray-600">• ${feature}</li>`).join("")}
          </ul>
        </div>
        ${
          service.details
            ? `
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Details</h4>
            <p class="text-sm text-gray-600">${service.details}</p>
          </div>
        `
            : ""
        }
      </div>
    `
    document.getElementById("serviceModal").classList.remove("hidden")
  }

  closeServiceModal() {
    document.getElementById("serviceModal").classList.add("hidden")
  }

  loadPropertiesData() {
    const list = document.getElementById("propertiesList")
    if (!list) return

    const properties = this.getStoredData(this.STORAGE_KEYS.PROPERTIES) || this.sampleData.properties

    list.innerHTML = properties
      .map(
        (property) => `
      <div class="property-card bg-gray-50 p-6 rounded-lg border hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900 text-lg mb-2">${property.name}</h3>
            <p class="text-gray-600 mb-3">${property.address}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p><span class="font-medium">Contact:</span> ${property.contact}</p>
                <p><span class="font-medium">Phone:</span> ${property.phone}</p>
                <p><span class="font-medium">Email:</span> ${property.email}</p>
              </div>
              <div>
                <p><span class="font-medium">Units:</span> ${property.units}</p>
                <p><span class="font-medium">Type:</span> ${property.type}</p>
                ${property.notes ? `<p><span class="font-medium">Notes:</span> ${property.notes}</p>` : ""}
              </div>
            </div>
          </div>
          <div class="flex flex-col space-y-2 ml-4">
            <button onclick="app.editProperty(${property.id})" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
            <button onclick="app.deleteProperty(${property.id})" class="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
          </div>
        </div>
      </div>
    `,
      )
      .join("")
  }

  loadPaymentsData() {
    const list = document.getElementById("paymentsList")
    if (!list) return

    const payments = this.getStoredData(this.STORAGE_KEYS.PAYMENTS) || this.sampleData.payments

    // Calculate total outstanding
    const totalOutstanding = payments.filter((p) => p.status !== "Paid").reduce((sum, p) => sum + p.amount, 0)

    document.getElementById("totalOutstanding").textContent = `$${totalOutstanding.toLocaleString()}`

    list.innerHTML = payments
      .map(
        (payment) => `
      <div class="payment-card bg-gray-50 p-6 rounded-lg border hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900 text-lg mb-2">${payment.property}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p><span class="font-medium">Amount:</span> $${payment.amount.toLocaleString()}</p>
                <p><span class="font-medium">Due Date:</span> ${payment.dueDate}</p>
                <p><span class="font-medium">Contact:</span> ${payment.contact}</p>
                <p><span class="font-medium">Phone:</span> ${payment.phone}</p>
              </div>
              <div>
                <p><span class="font-medium">Description:</span> ${payment.description}</p>
                <div class="mt-2">
                  <span class="px-3 py-1 text-xs rounded-full font-medium ${
                    payment.status === "Overdue"
                      ? "bg-red-100 text-red-800"
                      : payment.status === "Due"
                        ? "bg-yellow-100 text-yellow-800"
                        : payment.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                  }">
                    ${payment.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col space-y-2 ml-4">
            <select onchange="app.updatePaymentStatus(${payment.id}, this.value)" class="text-sm border border-gray-300 rounded px-2 py-1">
              <option value="Pending" ${payment.status === "Pending" ? "selected" : ""}>Pending</option>
              <option value="Due" ${payment.status === "Due" ? "selected" : ""}>Due</option>
              <option value="Overdue" ${payment.status === "Overdue" ? "selected" : ""}>Overdue</option>
              <option value="Paid" ${payment.status === "Paid" ? "selected" : ""}>Paid</option>
            </select>
            <button onclick="app.editPayment(${payment.id})" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
            <button onclick="app.deletePayment(${payment.id})" class="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
          </div>
        </div>
      </div>
    `,
      )
      .join("")
  }

  loadFilesData() {
    const list = document.getElementById("filesList")
    if (!list) return

    const files = this.getStoredData(this.STORAGE_KEYS.FILES) || []

    if (files.length === 0) {
      list.innerHTML = '<p class="text-gray-500 text-center py-8">No files uploaded yet.</p>'
      return
    }

    list.innerHTML = files
      .map(
        (file) => `
      <div class="flex justify-between items-center p-4 bg-gray-50 rounded border hover:bg-gray-100 transition-colors">
        <div class="flex-1">
          <span class="font-medium text-gray-900">${file.name}</span>
          <div class="text-sm text-gray-500">
            Uploaded: ${new Date(file.uploadDate).toLocaleDateString()} • Size: ${this.formatFileSize(file.size)}
          </div>
        </div>
        <div class="flex space-x-2">
          <button onclick="app.downloadFile('${file.id}')" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Download</button>
          <button onclick="app.deleteFile('${file.id}')" class="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
        </div>
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

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  copyMessage(message) {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        // Show temporary success message
        const toast = document.createElement("div")
        toast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"
        toast.textContent = "Message copied to clipboard!"
        document.body.appendChild(toast)
        setTimeout(() => toast.remove(), 2000)
      })
      .catch(() => {
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
    const notes = prompt("Notes (optional):")

    const properties = this.getStoredData(this.STORAGE_KEYS.PROPERTIES) || this.sampleData.properties
    const newProperty = {
      id: Date.now(),
      name: name || "Unnamed Property",
      address: address || "",
      contact: contact || "",
      phone: phone || "",
      email: email || "",
      units: units || 0,
      type: type || "Residential",
      notes: notes || "",
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
    property.notes = prompt("Notes:", property.notes || "") || property.notes

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

  // Payment management
  addPayment() {
    const property = prompt("Property Name:")
    if (!property) return

    const amount = Number.parseFloat(prompt("Amount (numbers only):"))
    const dueDate = prompt("Due Date (YYYY-MM-DD):")
    const contact = prompt("Contact Person:")
    const phone = prompt("Phone:")
    const description = prompt("Description:")

    const payments = this.getStoredData(this.STORAGE_KEYS.PAYMENTS) || this.sampleData.payments
    const newPayment = {
      id: Date.now(),
      property: property,
      amount: amount || 0,
      dueDate: dueDate || new Date().toISOString().split("T")[0],
      status: "Pending",
      contact: contact || "",
      phone: phone || "",
      description: description || "",
    }

    payments.push(newPayment)
    this.saveData(this.STORAGE_KEYS.PAYMENTS, payments)
    this.loadPaymentsData()
  }

  editPayment(id) {
    const payments = this.getStoredData(this.STORAGE_KEYS.PAYMENTS) || this.sampleData.payments
    const payment = payments.find((p) => p.id === id)
    if (!payment) return

    payment.property = prompt("Property Name:", payment.property) || payment.property
    payment.amount = Number.parseFloat(prompt("Amount:", payment.amount)) || payment.amount
    payment.dueDate = prompt("Due Date (YYYY-MM-DD):", payment.dueDate) || payment.dueDate
    payment.contact = prompt("Contact Person:", payment.contact) || payment.contact
    payment.phone = prompt("Phone:", payment.phone) || payment.phone
    payment.description = prompt("Description:", payment.description) || payment.description

    this.saveData(this.STORAGE_KEYS.PAYMENTS, payments)
    this.loadPaymentsData()
  }

  updatePaymentStatus(id, newStatus) {
    const payments = this.getStoredData(this.STORAGE_KEYS.PAYMENTS) || this.sampleData.payments
    const payment = payments.find((p) => p.id === id)
    if (!payment) return

    payment.status = newStatus

    // If marked as paid, could move to archive (for now just update status)
    if (newStatus === "Paid") {
      payment.paidDate = new Date().toISOString().split("T")[0]
    }

    this.saveData(this.STORAGE_KEYS.PAYMENTS, payments)
    this.loadPaymentsData()
  }

  deletePayment(id) {
    if (!confirm("Are you sure you want to delete this payment record?")) return

    const payments = this.getStoredData(this.STORAGE_KEYS.PAYMENTS) || this.sampleData.payments
    const filtered = payments.filter((p) => p.id !== id)
    this.saveData(this.STORAGE_KEYS.PAYMENTS, filtered)
    this.loadPaymentsData()
  }

  // Schedule management
  editScheduleItem(day) {
    const schedule = this.getStoredData(this.STORAGE_KEYS.SCHEDULE) || this.sampleData.schedule
    const item = schedule.find((s) => s.day === day)
    if (!item) return

    item.operator = prompt("Operator:", item.operator) || item.operator
    item.manager = prompt("Manager:", item.manager) || item.manager
    item.time = prompt("Time:", item.time) || item.time
    item.phone = prompt("Phone:", item.phone) || item.phone
    item.email = prompt("Email:", item.email) || item.email

    this.saveData(this.STORAGE_KEYS.SCHEDULE, schedule)
    this.loadScheduleData()
  }

  // Browser functionality
  loadSite(url, browserNumber = 1) {
    const frame = document.getElementById(`browserFrame${browserNumber}`)
    if (frame) {
      frame.src = url
    }
  }

  loadCustomUrl(browserNumber = 1) {
    const input = document.getElementById(`urlInput${browserNumber}`)
    const url = input?.value
    if (url) {
      this.loadSite(url, browserNumber)
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
        type: file.type,
      })
    })

    this.saveData(this.STORAGE_KEYS.FILES, storedFiles)
    this.loadFilesData()
    fileInput.value = ""

    // Show success message
    const toast = document.createElement("div")
    toast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"
    toast.textContent = `${files.length} file(s) uploaded successfully!`
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  }

  downloadFile(id) {
    // In a real implementation, this would download the actual file
    alert("File download would start here. (This is a demo - files are stored locally)")
  }

  deleteFile(id) {
    if (!confirm("Are you sure you want to delete this file?")) return

    const files = this.getStoredData(this.STORAGE_KEYS.FILES) || []
    const filtered = files.filter((f) => f.id !== id)
    this.saveData(this.STORAGE_KEYS.FILES, filtered)
    this.loadFilesData()
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

function addPayment() {
  window.app.addPayment()
}

function loadSite(url, browserNumber) {
  window.app.loadSite(url, browserNumber)
}

function loadCustomUrl(browserNumber) {
  window.app.loadCustomUrl(browserNumber)
}

function uploadFiles() {
  window.app.uploadFiles()
}

function closeServiceModal() {
  window.app.closeServiceModal()
}

// Initialize the application
let app
document.addEventListener("DOMContentLoaded", () => {
  app = new DashboardApp()
  window.app = app // Expose app to global scope for onclick handlers
})
