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
      name: 'Marko',
      surname: 'Marinović',
      passwordHash: await bcrypt.hash('password123', 10),
      subscriptionPlan: SubscriptionPlan.FREE_TRIAL,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'anne@gmail.com',
      name: 'Anne',
      surname: 'Smith',
      passwordHash: await bcrypt.hash('securepass456', 10),
      subscriptionPlan: SubscriptionPlan.PAID,
      subscriptionExpiry: new Date('2026-03-15'),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'sime@gmail.com',
      name: 'Šime',
      surname: 'Šimić',
      passwordHash: await bcrypt.hash('securepass456', 10),
      subscriptionPlan: SubscriptionPlan.PAID,
      subscriptionExpiry: new Date('2026-03-15'),
    },
  });

  const boat1 = await prisma.boat.create({
    data: {
      name: 'Mala Sirena',
      registration: 'HR-1234',
      userId: user1.id,
      length: 6.5,
      width: 2.3,
      boatType: BoatType.MOTORBOAT,
    },
  });

  const boat2 = await prisma.boat.create({
    data: {
      name: 'Sea Breeze',
      registration: 'HR-5678',
      userId: user2.id,
      length: 12.0,
      width: 4.2,
      boatType: BoatType.YACHT,
    },
  });

  const boat3 = await prisma.boat.create({
    data: {
      name: 'Dolphin Explorer',
      registration: 'HR-9101',
      userId: user2.id,
      length: 4.5,
      width: 1.8,
      boatType: BoatType.DINGHY,
    },
  });

  const boat4 = await prisma.boat.create({
    data: {
      name: 'Orca 37',
      registration: 'HR-4953',
      userId: user3.id,
      length: 6.5,
      width: 2.5,
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

  const shallowWaterZone = await prisma.mapElement.create({
    data: {
      rule: {
        connect: {
          id: rule2.id,
        },
      },
      name: 'Shallow Water Zone',
      type: MapElementType.ZONE,
      coordinates: {
        coordinates: [
          [
            [16.232069783092413, 43.48889352568166],
            [16.23065359746018, 43.48884304133744],
            [16.229251057514062, 43.48869207474834],
            [16.227875677253852, 43.48844208055074],
            [16.226540708585347, 43.488095467536134],
            [16.225259013457205, 43.48765557540666],
            [16.224042939783033, 43.48712664254923],
            [16.22290420235167, 43.48651376514121],
            [16.221853769879214, 43.485822847984345],
            [16.22090175929553, 43.48506054754383],
            [16.22005733828622, 43.48423420774466],
            [16.219328637029744, 43.48335178914737],
            [16.21872266997861, 43.482421792189086],
            [16.218245268434877, 43.48145317523266],
            [16.217901024564345, 43.480455268216524],
            [16.217693247381934, 43.47943768273978],
            [16.217623931124066, 43.47841021945082],
            [16.217693736303396, 43.47738277363314],
            [16.217901983618294, 43.47636523989884],
            [16.218246660765413, 43.47536741690788],
            [16.218724442079253, 43.4743989130303],
            [16.21933072079967, 43.47346905385899],
            [16.22005965364733, 43.47258679246176],
            [16.220904217269798, 43.47176062323458],
            [16.221856276008065, 43.47099850018301],
            [16.22290666032598, 43.470307760415096],
            [16.22404525514423, 43.469695053579066],
            [16.225261097227243, 43.46916627792168],
            [16.22654248068611, 43.46872652357921],
            [16.227877069584498, 43.46838002364347],
            [16.22925201656809, 43.46813011347105],
            [16.230654086381683, 43.4679791986244],
            [16.232069783092413, 43.46792873175147],
            [16.233485479803143, 43.4679791986244],
            [16.234887549616737, 43.46813011347105],
            [16.23626249660033, 43.46838002364347],
            [16.237597085498717, 43.46872652357921],
            [16.238878468957584, 43.46916627792168],
            [16.2400943110406, 43.469695053579066],
            [16.241232905858848, 43.470307760415096],
            [16.24228329017676, 43.47099850018301],
            [16.243235348915032, 43.47176062323458],
            [16.2440799125375, 43.47258679246176],
            [16.244808845385155, 43.47346905385899],
            [16.245415124105573, 43.4743989130303],
            [16.245892905419414, 43.47536741690788],
            [16.246237582566536, 43.47636523989884],
            [16.246445829881434, 43.47738277363314],
            [16.24651563506076, 43.47841021945082],
            [16.246446318802896, 43.47943768273978],
            [16.24623854162048, 43.480455268216524],
            [16.24589429774995, 43.48145317523266],
            [16.24541689620622, 43.482421792189086],
            [16.244810929155086, 43.48335178914737],
            [16.244082227898605, 43.48423420774466],
            [16.243237806889297, 43.48506054754383],
            [16.242285796305612, 43.485822847984345],
            [16.24123536383316, 43.48651376514121],
            [16.240096626401794, 43.48712664254923],
            [16.238880552727622, 43.48765557540666],
            [16.23759885759948, 43.488095467536134],
            [16.236263888930974, 43.48844208055074],
            [16.234888508670767, 43.48869207474834],
            [16.23348596872465, 43.48884304133744],
            [16.232069783092413, 43.48889352568166],
          ],
        ],
      },
      description: 'Shallow water zone - speed limit of 5 knots',
      isActive: true,
      fillColor: '#153b61',
      fillOpacity: 0.3,
      lineColor: '#d6dcef',
      lineWidth: 1.0,
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
            [16.32372804339576, 43.54380653210322],
            [16.309933575032375, 43.539165208436316],
            [16.307293791170395, 43.53619943392863],
            [16.306303750596953, 43.53318500868562],
            [16.306897777225032, 43.529835485307416],
            [16.32247496317393, 43.528782495030384],
            [16.333498313099142, 43.53342433136558],
            [16.340098940560466, 43.539022842779076],
            [16.333032774323215, 43.54811116252438],
            [16.32372804339576, 43.54380653210322],
          ],
        ],
      },
      description:
        'No anchoring allowed in this area due to areodrome operations',
      isActive: true,
      fillColor: '#d6dcef',
      fillOpacity: 0.3,
      lineColor: '#153b61',
      lineWidth: 1.0,
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
      mapElementId: militaryZone2.id,
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
      mapElementId: militaryZone2.id,
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
