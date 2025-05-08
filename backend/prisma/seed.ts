import {
  PrismaClient,
  SubscriptionPlan,
  BoatType,
  TransactionStatus,
  RuleType,
  MapElementType,
  ObjectType,
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
      type: RuleType.WARNING,
      description: 'Maximum speed in this area is 5 knots.',
    },
  });

  const rule3 = await prisma.rule.create({
    data: {
      name: 'No Anchoring',
      type: RuleType.RESTRICTION,
      description:
        'Anchoring is not permitted in this area due to underwater cables.',
    },
  });

  const rule4 = await prisma.rule.create({
    data: {
      name: 'Nature Reserve',
      type: RuleType.WARNING,
      description: 'Protected nature area. Keep distance and minimize noise.',
    },
  });

  const rule5 = await prisma.rule.create({
    data: {
      name: 'No Fishing',
      type: RuleType.RESTRICTION,
      description: 'Fishing is not allowed in this area.',
    },
  });

  const rule6 = await prisma.rule.create({
    data: {
      name: 'Common Swimming Area',
      type: RuleType.INFO,
      description: 'Swimming is allowed in this area.',
    },
  });

  const rule7 = await prisma.rule.create({
    data: {
      name: 'Clean Water Zone',
      type: RuleType.INFO,
      description: 'Clean water zone',
    },
  });

  const rule8 = await prisma.rule.create({
    data: {
      name: 'Common anchoring area',
      type: RuleType.INFO,
      description: 'Anchoring is allowed in this area.',
    },
  });

  const noAnchoringZone = await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule3.id, // No anchoring
        },
      },
      name: 'No Anchoring Zone - Split Aerodrome',
      type: MapElementType.ZONE,
      coordinates: {
        coordinates: [
          [
            [16.32127679669142, 43.54160043991021],
            [16.320369277409412, 43.54189258270148],
            [16.31724451695058, 43.54152505485129],
            [16.31270128677164, 43.53984563901366],
            [16.310381538251562, 43.53940654202407],
            [16.30927141989514, 43.53889483588304],
            [16.308469539997617, 43.537576127289725],
            [16.30715723272806, 43.5355290537872],
            [16.306954547466148, 43.53370116651732],
            [16.304533347675573, 43.531287857007214],
            [16.302617893788096, 43.5314338486954],
            [16.302113298338753, 43.53055631054559],
            [16.30251175806856, 43.52887509733702],
            [16.30049759187071, 43.52938647695146],
            [16.299990533456395, 43.52836294897935],
            [16.29898184433398, 43.52748520430009],
            [16.297070104226236, 43.527118897074786],
            [16.295764869135468, 43.526898823807755],
            [16.294751879557793, 43.52594853831053],
            [16.298171783237365, 43.52199916110621],
            [16.313004604723744, 43.52382787596787],
            [16.323091756508262, 43.52887527047514],
            [16.331162502944522, 43.533995496686344],
            [16.32127679669142, 43.54160043991021],
          ],
        ],
      },
      description:
        'No anchoring allowed in this area due to areodrome operations',
      isActive: true,
      fillColor: '#eda509',
      fillOpacity: 0.3,
      lineColor: '#ed6509',
      lineWidth: 1.0,
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
      coordinates: {
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
      fillColor: '#FF0000',
      fillOpacity: 0.5,
      lineColor: '#FF0000',
      lineWidth: 2.0,
    },
  });

  const militaryZone2 = await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule1.id, // No entry
        },
      },
      name: 'Military Zone - Lora',
      type: MapElementType.ZONE,
      coordinates: {
        coordinates: [
          [
            [16.431028921972825, 43.52501232975598],
            [16.432803921880122, 43.52744273464489],
            [16.427848616420675, 43.52842027775071],
            [16.42671047205681, 43.52839488722154],
            [16.423305584014656, 43.527010283057564],
            [16.423952429740922, 43.526438106010374],
            [16.424172357287603, 43.52652252591588],
            [16.424366411005025, 43.52483410535439],
            [16.430265644017055, 43.52459959876114],
            [16.430265644017055, 43.524318189645896],
            [16.431028921972825, 43.52424314699317],
            [16.431132417289973, 43.524618359322346],
            [16.431417029407697, 43.52467464096995],
            [16.4315981462112, 43.52521869419397],
            [16.43118416494707, 43.525312495978],
            [16.431028921972825, 43.52501232975598],
          ],
        ],
      },
      description: 'Military restricted area - no entry allowed',
      isActive: true,
      fillColor: '#127a45',
      fillOpacity: 0.3,
      lineColor: '#094f2b',
      lineWidth: 1.0,
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
      coordinates: {
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
      fillColor: '#00FF00',
      fillOpacity: 0.2,
    },
  });

  await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule8.id,
        },
      },
      name: 'Ciovo Anchoring Area',
      type: MapElementType.POINT,
      objectType: ObjectType.ANCHOR,
      coordinates: {
        coordinates: [16.331010051824677, 43.50588039602954],
      },
      description: 'Ciovo anchoring area - anchoring allowed',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule7.id, // Clean water zone
        },
      },
      name: 'Ciovo Lighthouse',
      type: MapElementType.POINT,
      objectType: ObjectType.LIGHTHOUSE,
      coordinates: {
        coordinates: [16.391666737020813, 43.48923719439853],
      },
      description:
        'Ciovo Lighthouse - no anchoring within 100 meters of the lighthouse',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule7.id, // Clean water zone
        },
      },
      name: 'Marjan Lighthouse',
      type: MapElementType.POINT,
      objectType: ObjectType.LIGHTHOUSE,
      coordinates: {
        coordinates: [16.38879372168188, 43.50856375565189],
      },
      description:
        'Marjan Lighthouse - no anchoring within 100 meters of the lighthouse',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule6.id, // Common swimming area
        },
      },
      name: 'Split Breakwater Lighthouse',
      type: MapElementType.POINT,
      objectType: ObjectType.LIGHTHOUSE,
      coordinates: {
        coordinates: [16.441, 43.503],
      },
      description:
        'Split Breakwater Lighthouse - no anchoring within 100 meters of the lighthouse',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule8.id, // Common anchoring area
        },
      },
      name: 'Kaštel Area',
      type: MapElementType.POINT,
      objectType: ObjectType.ANCHOR,
      coordinates: {
        coordinates: [16.364137504105486, 43.546240911927924],
      },
      description: 'Anchoring allowed',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      name: 'Trogir ridge',
      type: MapElementType.POINT,
      objectType: ObjectType.RIDGE,
      coordinates: {
        coordinates: [16.269146611584745, 43.52116817399565],
      },
      description: 'Ridge area - caution advised',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      name: 'Ciovo Ridge',
      type: MapElementType.POINT,
      objectType: ObjectType.RIDGE,
      coordinates: {
        coordinates: [16.395086572572495, 43.48780897697486],
      },
      description: 'Ridge area - caution advised',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      name: 'Trogir fuel dock',
      type: MapElementType.POINT,
      objectType: ObjectType.FUEL_DOCK,
      coordinates: {
        coordinates: [16.271802350123693, 43.49205998369948],
      },
      description: 'Fill up your tank here',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      name: 'Split Harbor Master',
      type: MapElementType.POINT,
      objectType: ObjectType.HARBOR_MASTER,
      coordinates: {
        coordinates: [16.440529324152692, 43.507113552631324],
      },
      description: 'Harbor master office',
      isActive: true,
    },
  });

  await prisma.mapElement.create({
    data: {
      name: 'Fuel Dock - Split',
      type: MapElementType.POINT,
      objectType: ObjectType.FUEL_DOCK,
      coordinates: {
        coordinates: [16.439, 43.508],
      },
      description: 'Fuel dock available',
      isActive: true,
    },
  });

  await prisma.notification.create({
    data: {
      userId: user1.id,
      boatId: boat1.id,
      mapElementId: kornatNationalPark.id,
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
