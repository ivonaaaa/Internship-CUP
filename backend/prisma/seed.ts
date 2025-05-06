import {
  PrismaClient,
  SubscriptionPlan,
  BoatType,
  TransactionStatus,
  RuleType,
  MapElementType,
  MapElementColor,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany({});
  await prisma.mapElement.deleteMany({});
  await prisma.boat.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.rule.deleteMany({});
  await prisma.user.deleteMany({});

  const user1 = await prisma.user.create({
    data: {
      email: 'marko@gmail.com',
      username: 'markosailorman',
      passwordHash: await bcrypt.hash('password123', 10),
      subscriptionPlan: SubscriptionPlan.FREE_TRIAL,
      phoneNumber: '+38598123456',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'ana@gmail.com',
      username: 'ana_adriatic',
      passwordHash: await bcrypt.hash('securepass456', 10),
      subscriptionPlan: SubscriptionPlan.PAID,
      phoneNumber: '+38591234567',
      subscriptionExpiry: new Date('2026-03-15'),
    },
  });

  const boat1 = await prisma.boat.create({
    data: {
      userId: user1.id,
      length: 6.5,
      width: 2.3,
      boatType: BoatType.MOTORBOAT,
    },
  });

  const boat2 = await prisma.boat.create({
    data: {
      userId: user2.id,
      length: 12.0,
      width: 4.2,
      boatType: BoatType.YACHT,
    },
  });

  const boat3 = await prisma.boat.create({
    data: {
      userId: user2.id,
      length: 4.5,
      width: 1.8,
      boatType: BoatType.DINGHY,
    },
  });

  await prisma.transaction.create({
    data: {
      userId: user2.id,
      amount: 9.99,
      status: TransactionStatus.SUCCESSFUL,
      transactionDate: new Date('2025-03-15'),
    },
  });

  const rule1 = await prisma.rule.create({
    data: {
      name: 'No Entry Zone',
      type: RuleType.RESTRICTION,
      description: 'This area is completely restricted for all vessels.',
    },
  });

  const rule2 = await prisma.rule.create({
    data: {
      name: 'Speed Limit 5 Knots',
      type: RuleType.SPEED_RESTRICTION,
      description: 'Maximum speed in this area is 5 knots.',
    },
  });

  const rule3 = await prisma.rule.create({
    data: {
      name: 'No Anchoring',
      type: RuleType.ANCHORING_RESTRICTION,
      description:
        'Anchoring is not permitted in this area due to underwater cables.',
    },
  });

  const rule4 = await prisma.rule.create({
    data: {
      name: 'Nature Reserve',
      type: RuleType.ENVIRONMENTAL_PROTECTION,
      description: 'Protected nature area. Keep distance and minimize noise.',
    },
  });

  const splitHarbor = await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule2.id, // Speed limit
        },
      },
      name: 'Split Harbor Entrance',
      type: MapElementType.ZONE,
      color: MapElementColor.BLUE,
      coordinates: {
        type: 'Polygon',
        coordinates: [
          [
            [16.43, 43.5],
            [16.44, 43.5],
            [16.44, 43.51],
            [16.43, 43.51],
            [16.43, 43.5],
          ],
        ],
      },
      description: 'Harbor approach area with speed restrictions',
      isActive: true,
    },
  });

  const militaryZone = await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule1.id, // No entry
        },
      },
      name: 'Vis Military Zone',
      type: MapElementType.ZONE,
      color: MapElementColor.RED,
      coordinates: {
        type: 'Polygon',
        coordinates: [
          [
            [16.15, 43.05],
            [16.17, 43.05],
            [16.17, 43.06],
            [16.15, 43.06],
            [16.15, 43.05],
          ],
        ],
      },
      description: 'Military restricted area - no entry allowed',
      isActive: true,
    },
  });

  const kornatNationalPark = await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule4.id, // Nature reserve
        },
      },
      name: 'Kornati National Park',
      type: MapElementType.ZONE,
      color: MapElementColor.GREEN,
      coordinates: {
        type: 'Polygon',
        coordinates: [
          [
            [15.23, 43.8],
            [15.33, 43.8],
            [15.33, 43.85],
            [15.23, 43.85],
            [15.23, 43.8],
          ],
        ],
      },
      description:
        'Protected national park area with environmental restrictions',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule3.id, // No anchoring
        },
      },
      name: 'Underwater Cable Area - Brač Channel',
      type: MapElementType.POINT,
      color: MapElementColor.YELLOW,
      coordinates: {
        type: 'Point',
        coordinates: [16.45, 43.4],
      },
      description: 'Underwater telecommunications cable. No anchoring allowed.',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule2.id, // Speed limit
        },
      },
      name: 'Hvar Marina Entrance',
      type: MapElementType.POINT,
      color: MapElementColor.ORANGE,
      coordinates: {
        type: 'Point',
        coordinates: [16.65, 43.17],
      },
      description: 'Approach to Hvar Marina. Reduce speed to 5 knots.',
      isActive: true,
    },
  });

  await prisma.notification.create({
    data: {
      userId: user1.id,
      boatId: boat1.id,
      mapElementId: splitHarbor.id,
      ruleId: rule2.id,
      timestamp: new Date('2025-04-03T14:23:15Z'),
      locationCoordinates: {
        type: 'Point',
        coordinates: [16.435, 43.502],
      },
    },
  });

  await prisma.notification.create({
    data: {
      userId: user2.id,
      boatId: boat2.id,
      mapElementId: militaryZone.id,
      ruleId: rule1.id,
      timestamp: new Date('2025-04-04T09:18:42Z'),
      locationCoordinates: {
        type: 'Point',
        coordinates: [16.158, 43.055],
      },
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
