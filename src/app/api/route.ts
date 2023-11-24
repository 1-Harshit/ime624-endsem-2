import { NextRequest, NextResponse } from 'next/server';
import { Aadhar, Address, Applicant } from '@prisma/client';

import prisma from '../../../prisma/prisma';

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  // Do whatever you want
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: NextRequest) {
  // Do whatever you want
  let applicant: Applicant,
    aadhar: Aadhar,
    permAddress: Address,
    currAddress: Address;
  try {
    const body = await request.json();
    console.log(body);
    applicant = body.application as Applicant;
    aadhar = body.aadhar as Aadhar;
    permAddress = body.permAddress as Address;
    currAddress = body.currAddress as Address;
    console.log(applicant, aadhar, permAddress, currAddress);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Invalid Request' }, { status: 400 });
  }

  try {
    // CREATE AAHDAR
    permAddress = await prisma.address.create({
      data: {
        ...permAddress,
        pinZipcode: null,
        id: undefined,
      },
    });
    aadhar = await prisma.aadhar.create({
      data: {
        ...aadhar,
        addressId: permAddress.id,
      },
    });

    // CREATE APPLICANT
    currAddress = await prisma.address.create({
      data: {
        ...currAddress,
        pinZipcode: null,
        id: undefined,
      },
    });
    applicant = await prisma.applicant.create({
      data: {
        ...applicant,
        aadharNumber: aadhar.aadharNumber,
        addressId: currAddress.id,
      },
    });

    // CREATE ASSETS

    // CREATE LOAN APPLICATION
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
