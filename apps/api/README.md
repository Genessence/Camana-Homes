# Camana Homes API

## Email Functionality Setup

The API now includes email functionality using Resend for lead form submissions.

### Environment Variables

Create a `.env` file in the `apps/api` directory with the following:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

### Email Endpoints

The following new endpoints have been added for lead submissions:

#### 1. General Lead Submission
- **POST** `/forms/general-leads`
- Used for "Get Connected" and "List with Us" forms
- Sends emails to: `hello@camanahomes.com`, `list@camanahomes.com`

#### 2. Agent Contact (from listing/article pages)
- **POST** `/forms/agent-contacts`
- Used when contacting agents through property listings or articles
- Sends emails to: agent's email + `hello@camanahomes.com`
- Includes property information in the email

#### 3. Agent Profile Contact
- **POST** `/forms/agent-profile-contacts`
- Used when contacting agents through their profile page
- Sends emails to: agent's email + `hello@camanahomes.com`

### Email Templates

All emails are sent from `query@camanahomes.com` and include:
- Lead form details (name, email, phone, location, message)
- Source information (form type, property title if applicable)
- Timestamp
- Proper formatting and styling

### Frontend Integration

The frontend has been updated to use these new endpoints:
- `LeadsApiService` class handles all API calls
- Toast notifications for success/error feedback
- Form validation and loading states
- Automatic form reset after successful submission

### Testing

To test the email functionality:
1. Ensure your Resend API key is valid
2. Submit a lead form from any page
3. Check the specified email addresses for incoming emails
4. Verify email content and formatting

### Error Handling

The API includes comprehensive error handling:
- Validation of required fields
- Email delivery confirmation
- Proper HTTP status codes
- Detailed error messages for debugging

