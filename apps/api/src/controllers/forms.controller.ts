import { RequestHandler } from 'express';
import { prisma } from '../lib/prisma';

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
