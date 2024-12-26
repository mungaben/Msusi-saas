import { PrismaClient, UserRole, BookingStatus, SalonistStatus } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
//   await cleanDatabase()

  // Create Admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Salon Manager',
      email: 'admin@salon.com',
      // In production, use proper password hashing
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  // Create Salonists
  const salonists = await Promise.all([
    createSalonistWithProfile('Sarah Johnson', 'sarah@salon.com', {
      bio: 'Expert in hair styling with 5 years of experience',
      experience: 5,
      specialties: ['Haircut', 'Coloring', 'Styling'],
      hourlyRate: 50,
      rating: 4.8,
    }),
    createSalonistWithProfile('Mike Chen', 'mike@salon.com', {
      bio: 'Specialized in modern hair techniques',
      experience: 3,
      specialties: ['Haircut', 'Beard Trim', 'Men\'s Styling'],
      hourlyRate: 45,
      rating: 4.5,
    }),
    createSalonistWithProfile('Emma Davis', 'emma@salon.com', {
      bio: 'Makeup artist and hair specialist',
      experience: 7,
      specialties: ['Makeup', 'Wedding Styling', 'Hair Treatment'],
      hourlyRate: 60,
      rating: 4.9,
    }),
  ])

  // Create Customers
  const customers = await Promise.all([
    createCustomerWithProfile('John Doe', 'john@example.com', {
      addresses: [{
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        coordinates: {
          type: 'Point',
          coordinates: [-73.935242, 40.730610],
        },
      }],
      preferences: ['Haircut', 'Beard Trim'],
    }),
    createCustomerWithProfile('Alice Smith', 'alice@example.com', {
      addresses: [{
        street: '456 Park Ave',
        city: 'New York',
        state: 'NY',
        postalCode: '10002',
        country: 'USA',
        coordinates: {
          type: 'Point',
          coordinates: [-73.935242, 40.730610],
        },
      }],
      preferences: ['Makeup', 'Hair Treatment'],
    }),
  ])

  // Create Services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Men\'s Haircut',
        description: 'Professional men\'s haircut including wash and style',
        duration: 30,
        price: 35,
        category: 'Haircut',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Women\'s Haircut & Style',
        description: 'Professional women\'s haircut including wash and style',
        duration: 60,
        price: 65,
        category: 'Haircut',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Hair Coloring',
        description: 'Full hair coloring service',
        duration: 120,
        price: 120,
        category: 'Coloring',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Bridal Makeup',
        description: 'Complete bridal makeup service',
        duration: 90,
        price: 150,
        category: 'Makeup',
      },
    }),
  ])

  // Create some bookings with reviews
  await createSampleBookings(customers[0], salonists[0], services[0])
  await createSampleBookings(customers[1], salonists[1], services[1])
}

// async function cleanDatabase() {
//   // Clean up the database before seeding
//   const modelNames = [
//     'Review',
//     'Booking',
//     'WorkingHours',
//     'Service',
//     'Customer',
//     'Salonist',
//     'Account',
//     'Session',
//     'User',
//     'VerificationToken',
//   ]
  
//   await Promise.all(
//     modelNames.map(model => 
//       prisma[model.toLowerCase()].deleteMany()
//     )
//   )
// }

async function createSalonistWithProfile(name: string, email: string, profileData: any) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      role: 'SALONIST',
      emailVerified: new Date(),
    },
  })

  const salonist = await prisma.salonist.create({
    data: {
      userId: user.id,
      ...profileData,
      status: 'AVAILABLE',
      availability: {
        create: [
          {
            dayOfWeek: 1, // Monday
            startTime: '09:00',
            endTime: '17:00',
          },
          {
            dayOfWeek: 2, // Tuesday
            startTime: '09:00',
            endTime: '17:00',
          },
          {
            dayOfWeek: 3, // Wednesday
            startTime: '09:00',
            endTime: '17:00',
          },
          {
            dayOfWeek: 4, // Thursday
            startTime: '09:00',
            endTime: '17:00',
          },
          {
            dayOfWeek: 5, // Friday
            startTime: '09:00',
            endTime: '17:00',
          },
        ],
      },
    },
    include: {
      user: true,
      availability: true,
    },
  })

  return salonist
}

async function createCustomerWithProfile(name: string, email: string, profileData: any) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      role: 'CUSTOMER',
      emailVerified: new Date(),
    },
  })

  const customer = await prisma.customer.create({
    data: {
      userId: user.id,
      ...profileData,
    },
    include: {
      user: true,
    },
  })

  return customer
}

async function createSampleBookings(customer: any, salonist: any, service: any) {
  // Create a completed booking with review
  const completedBooking = await prisma.booking.create({
    data: {
      customerId: customer.userId,
      salonistId: salonist.userId,
      serviceId: service.id,
      status: 'COMPLETED',
      dateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      location: customer.addresses[0],
      price: service.price,
      notes: 'Regular appointment',
    },
  })

  await prisma.review.create({
    data: {
      bookingId: completedBooking.id,
      rating: 4.5,
      comment: 'Great service! Very professional.',
    },
  })

  // Create a pending future booking
  await prisma.booking.create({
    data: {
      customerId: customer.userId,
      salonistId: salonist.userId,
      serviceId: service.id,
      status: 'PENDING',
      dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      location: customer.addresses[0],
      price: service.price,
      notes: 'Please bring all necessary equipment',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })