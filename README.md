# The Bay Services - Operator Dashboard

A comprehensive web-based dashboard for managing operations, properties, payments, and services for The Bay Services company.

## Features

- **Role-based Access Control**: Operator and Manager roles with different permissions
- **Google Sign-In Integration**: Secure authentication with Google accounts
- **Schedule Management**: View and track current operators with real-time updates
- **Property Management**: Add, edit, and manage property information
- **Payment Tracking**: Monitor outstanding payments and invoices
- **Message Templates**: Quick access to pre-written service messages
- **Service Information**: Detailed service descriptions and pricing
- **Integrated Browser**: Access external websites within the dashboard
- **File Management**: Upload and manage administrative files (Manager only)
- **Interactive Map**: Bay Area location search and mapping

## Setup Instructions

### For GitHub Pages Deployment:

1. **Clone or Download**: Get all the files (index.html, styles.css, data.js, app.js)

2. **Google Sign-In Setup** (Optional):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Sign-In API
   - Create OAuth 2.0 credentials
   - Replace `YOUR_GOOGLE_CLIENT_ID` in index.html with your actual client ID
   - Add your GitHub Pages domain to authorized origins

3. **Upload to GitHub**:
   - Create a new repository
   - Upload all files to the repository
   - Go to repository Settings > Pages
   - Select source branch (usually main/master)
   - Your dashboard will be available at: `https://yourusername.github.io/repository-name`

4. **Demo Access**:
   - Use "Demo Login" button to access without Google account
   - Demo login provides Manager access to see all features

## File Structure

\`\`\`
├── index.html          # Main HTML file with dashboard structure
├── styles.css          # Custom CSS styles and responsive design
├── data.js            # Sample data and configuration
├── app.js             # Main application logic and functionality
└── README.md          # This documentation file
\`\`\`

## Usage

### Navigation
- **Schedule**: View current operator schedule and contact information
- **Properties**: Manage property database with contact details
- **Payments**: Track outstanding payments and invoices
- **Messages**: Access message templates for quick responses
- **Services**: View service information and pricing
- **Browser**: Integrated web browser with quick links
- **Files**: File management system (Manager only)
- **Map**: Bay Area map with location search

### Data Storage
- All data is stored locally in browser localStorage
- Data persists between sessions
- No external database required for basic functionality

### Security Notes
- Replace Google Client ID with your own for production use
- Consider implementing server-side authentication for sensitive data
- Current implementation is suitable for internal use and demos

## Customization

### Adding New Services
Edit the `services` array in `data.js` to add new service offerings.

### Modifying Schedule
Update the `schedule` array in `data.js` to reflect your actual operator schedule.

### Styling Changes
Modify `styles.css` to customize colors, fonts, and layout to match your branding.

### Adding Features
Extend `app.js` with additional functionality as needed for your specific requirements.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Requires JavaScript enabled
- localStorage support required for data persistence

## Support

For issues or questions, please refer to the code comments or create an issue in the repository.
