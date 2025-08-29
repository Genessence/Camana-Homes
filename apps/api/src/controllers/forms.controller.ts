import { RequestHandler } from 'express';
import { prisma } from '../lib/prisma.js';
import EmailService, { LeadFormData } from '../lib/email.js';

export const createTourRequest: RequestHandler = async (req, res) => {
  const {
    property_id,
    visitor_name,
    visitor_email,
    visitor_phone,
    preferred_date,
    preferred_time,
    message,
  } = req.body;

  if (!property_id || !visitor_name || !visitor_email || !preferred_date || !preferred_time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const tourRequest = await prisma.tourRequest.create({
      data: {
        propertyId: property_id,
        visitorName: visitor_name,
        visitorEmail: visitor_email,
        visitorPhone: visitor_phone,
        preferredDate: new Date(preferred_date),
        preferredTime: preferred_time,
        message,
        status: 'pending',
      },
    });

    res.status(201).json({
      id: tourRequest.id,
      property_id: tourRequest.propertyId,
      visitor_name: tourRequest.visitorName,
      visitor_email: tourRequest.visitorEmail,
      visitor_phone: tourRequest.visitorPhone,
      preferred_date: tourRequest.preferredDate.toISOString(),
      preferred_time: tourRequest.preferredTime,
      message: tourRequest.message,
      status: tourRequest.status,
      created_at: tourRequest.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('Error creating tour request:', error);
    res.status(500).json({ error: 'Failed to create tour request' });
  }
};

export const createMortgageInquiry: RequestHandler = async (req, res) => {
  const {
    property_id,
    inquirer_name,
    inquirer_email,
    inquirer_phone,
    content_sum_insured,
    location,
    age,
    message,
  } = req.body;

  if (!inquirer_name || !inquirer_email || !content_sum_insured || !location || !age) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const mortgageInquiry = await prisma.mortgageInquiry.create({
      data: {
        propertyId: property_id,
        inquirerName: inquirer_name,
        inquirerEmail: inquirer_email,
        inquirerPhone: inquirer_phone,
        contentSumInsured: content_sum_insured,
        location,
        age,
        message,
        status: 'pending',
      },
    });

    res.status(201).json({
      id: mortgageInquiry.id,
      property_id: mortgageInquiry.propertyId,
      inquirer_name: mortgageInquiry.inquirerName,
      inquirer_email: mortgageInquiry.inquirerEmail,
      inquirer_phone: mortgageInquiry.inquirerPhone,
      content_sum_insured: mortgageInquiry.contentSumInsured,
      location: mortgageInquiry.location,
      age: mortgageInquiry.age,
      message: mortgageInquiry.message,
      status: mortgageInquiry.status,
      created_at: mortgageInquiry.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('Error creating mortgage inquiry:', error);
    res.status(500).json({ error: 'Failed to create mortgage inquiry' });
  }
};

export const createGeneralLead: RequestHandler = async (req, res) => {
  const {
    name,
    email,
    phone,
    location,
    message,
    source,
  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    // Send email
    await EmailService.sendGeneralLeadEmail({
      name,
      email,
      phone,
      location,
      message,
      source,
    });

    res.status(200).json({
      success: true,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('Error creating general lead:', error);
    res.status(500).json({ error: 'Failed to submit lead' });
  }
};

export const createAgentContact: RequestHandler = async (req, res) => {
  const {
    name,
    email,
    phone,
    location,
    message,
    propertyTitle,
    propertySlug,
    agentEmail,
    agentName,
  } = req.body;

  if (!name || !email || !agentEmail) {
    return res.status(400).json({ error: 'Name, email, and agent email are required' });
  }

  try {
    // Send email to agent and admin
    await EmailService.sendAgentContactEmail({
      name,
      email,
      phone,
      location,
      message,
      propertyTitle,
      propertySlug,
      agentEmail,
      agentName,
    });

    res.status(200).json({
      success: true,
      message: 'Agent contact submitted successfully',
    });
  } catch (error) {
    console.error('Error creating agent contact:', error);
    res.status(500).json({ error: 'Failed to submit agent contact' });
  }
};

export const createAgentProfileContact: RequestHandler = async (req, res) => {
  const {
    name,
    email,
    phone,
    location,
    message,
    agentEmail,
    agentName,
  } = req.body;

  if (!name || !email || !agentEmail) {
    return res.status(400).json({ error: 'Name, email, and agent email are required' });
  }

  try {
    // Send email to agent and admin
    await EmailService.sendAgentProfileContactEmail({
      name,
      email,
      phone,
      location,
      message,
      agentEmail,
      agentName,
    });

    res.status(200).json({
      success: true,
      message: 'Agent profile contact submitted successfully',
    });
  } catch (error) {
    console.error('Error creating agent profile contact:', error);
    res.status(500).json({ error: 'Failed to submit agent profile contact' });
  }
};
