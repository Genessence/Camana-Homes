import { getApiBaseUrl } from './api';

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

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
}

export class LeadsApiService {
  // Submit general lead (Get Connected, List with Us)
  static async submitGeneralLead(formData: LeadFormData): Promise<LeadSubmissionResponse> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/forms/general-leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit lead');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting general lead:', error);
      throw error;
    }
  }

  // Submit agent contact (from listing/article pages)
  static async submitAgentContact(formData: LeadFormData): Promise<LeadSubmissionResponse> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/forms/agent-contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit agent contact');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting agent contact:', error);
      throw error;
    }
  }

  // Submit agent profile contact (from agent profile page)
  static async submitAgentProfileContact(formData: LeadFormData): Promise<LeadSubmissionResponse> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/forms/agent-profile-contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit agent profile contact');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting agent profile contact:', error);
      throw error;
    }
  }
}

export default LeadsApiService;
