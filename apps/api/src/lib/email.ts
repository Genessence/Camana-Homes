import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_29XjwgT5_5mNjnQJf6hC9nVbF9GGNnhhJ');

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  message?: string;
  source?: string;
  propertyTitle?: string;
  propertySlug?: string;
  agentEmail?: string;
  agentName?: string;
}

export interface EmailRecipients {
  to: string[];
  cc?: string[];
  bcc?: string[];
}

export class EmailService {
  // Send email for "Get Connected" and "List with Us" forms
  static async sendGeneralLeadEmail(formData: LeadFormData): Promise<void> {
    const { name, email, phone, location, message, source } = formData;
    
    const emailContent = `
      <h2>New Lead Submission - ${source || 'General Inquiry'}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    try {
      await resend.emails.send({
        from: 'query@camanahomes.com',
        to: ['hello@camanahomes.com', 'list@camanahomes.com'],
        subject: `New Lead: ${source || 'General Inquiry'} - ${name}`,
        html: emailContent,
      });
    } catch (error) {
      console.error('Error sending general lead email:', error);
      throw new Error('Failed to send lead email');
    }
  }

  // Send email to agent when contacted through listing/article
  static async sendAgentContactEmail(formData: LeadFormData): Promise<void> {
    const { name, email, phone, location, message, propertyTitle, propertySlug, agentEmail, agentName } = formData;
    
    if (!agentEmail) {
      throw new Error('Agent email is required for agent contact');
    }

    // Email to agent
    const agentEmailContent = `
      <h2>New Property Inquiry</h2>
      <p><strong>Property:</strong> ${propertyTitle || 'N/A'}</p>
      <p><strong>Property Link:</strong> ${propertySlug ? `https://camanahomes.com/listing/${propertySlug}` : 'N/A'}</p>
      <p><strong>Inquirer Name:</strong> ${name}</p>
      <p><strong>Inquirer Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Inquirer Phone:</strong> ${phone}</p>` : ''}
      ${location ? `<p><strong>Inquirer Location:</strong> ${location}</p>` : ''}
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Email to admin (hello@camanahomes.com)
    const adminEmailContent = `
      <h2>New Agent Contact - ${propertyTitle || 'General Inquiry'}</h2>
      <p><strong>Agent:</strong> ${agentName || 'N/A'}</p>
      <p><strong>Property:</strong> ${propertyTitle || 'N/A'}</p>
      <p><strong>Property Link:</strong> ${propertySlug ? `https://camanahomes.com/listing/${propertySlug}` : 'N/A'}</p>
      <p><strong>Inquirer Name:</strong> ${name}</p>
      <p><strong>Inquirer Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Inquirer Phone:</strong> ${phone}</p>` : ''}
      ${location ? `<p><strong>Inquirer Location:</strong> ${location}</p>` : ''}
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    try {
      // Send to agent
      await resend.emails.send({
        from: 'query@camanahomes.com',
        to: [agentEmail],
        subject: `New Property Inquiry - ${propertyTitle || 'General Inquiry'}`,
        html: agentEmailContent,
      });

      // Send to admin
      await resend.emails.send({
        from: 'query@camanahomes.com',
        to: ['hello@camanahomes.com'],
        subject: `New Agent Contact - ${propertyTitle || 'General Inquiry'} - ${name}`,
        html: adminEmailContent,
      });
    } catch (error) {
      console.error('Error sending agent contact email:', error);
      throw new Error('Failed to send agent contact email');
    }
  }

  // Send email when agent is contacted through agent profile page (no property context)
  static async sendAgentProfileContactEmail(formData: LeadFormData): Promise<void> {
    const { name, email, phone, location, message, agentEmail, agentName } = formData;
    
    if (!agentEmail) {
      throw new Error('Agent email is required for agent contact');
    }

    // Email to agent
    const agentEmailContent = `
      <h2>New Contact Request</h2>
      <p><strong>Inquirer Name:</strong> ${name}</p>
      <p><strong>Inquirer Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Inquirer Phone:</strong> ${phone}</p>` : ''}
      ${location ? `<p><strong>Inquirer Location:</strong> ${location}</p>` : ''}
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Email to admin
    const adminEmailContent = `
      <h2>New Agent Profile Contact</h2>
      <p><strong>Agent:</strong> ${agentName || 'N/A'}</p>
      <p><strong>Inquirer Name:</strong> ${name}</p>
      <p><strong>Inquirer Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Inquirer Phone:</strong> ${phone}</p>` : ''}
      ${location ? `<p><strong>Inquirer Location:</strong> ${location}</p>` : ''}
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    try {
      // Send to agent
      await resend.emails.send({
        from: 'query@camanahomes.com',
        to: [agentEmail],
        subject: 'New Contact Request',
        html: agentEmailContent,
      });

      // Send to admin
      await resend.emails.send({
        from: 'query@camanahomes.com',
        to: ['hello@camanahomes.com'],
        subject: `New Agent Profile Contact - ${name}`,
        html: adminEmailContent,
      });
    } catch (error) {
      console.error('Error sending agent profile contact email:', error);
      throw new Error('Failed to send agent profile contact email');
    }
  }
}

export default EmailService;

