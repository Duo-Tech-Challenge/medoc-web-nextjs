import { PrismaClient, UserRole, PharmacyStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyage des données existantes
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.pharmacyMedication.deleteMany();
  await prisma.medication.deleteMany();
  await prisma.pharmacy.deleteMany();
  await prisma.user.deleteMany();
  await prisma.admin.deleteMany();

  // Créer admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@medoc.fr',
      password: adminPassword,
      firstName: 'Super',
      lastName: 'Admin',
    },
  });

  // Créer utilisateurs
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user@example.fr',
      password: userPassword,
      firstName: 'Jean',
      lastName: 'Dupont',
      role: UserRole.USER,
    },
  });

  // Créer pharmacies
  const pharmacyPassword = await bcrypt.hash('pharma123', 10);
  const pharmacies = await Promise.all([
    prisma.pharmacy.create({
      data: {
        email: 'pharma1@pharmacie.fr',
        password: pharmacyPassword,
        name: 'Pharmacie du Centre',
        street: '15 Rue de la République',
        city: 'Paris',
        zipCode: '75001',
        country: 'France',
        latitude: 48.8566,
        longitude: 2.3522,
        phone: '0142012345',
        status: PharmacyStatus.VALIDATED,
        operatingHours: {
          Lundi: '08:00-20:00',
          Mardi: '08:00-20:00',
          Mercredi: '08:00-20:00',
          Jeudi: '08:00-20:00',
          Vendredi: '08:00-20:00',
          Samedi: '09:00-19:00',
          Dimanche: '09:00-13:00',
        },
      },
    }),
    prisma.pharmacy.create({
      data: {
        email: 'pharma2@pharmacie.fr',
        password: pharmacyPassword,
        name: 'Pharmacie Saint-Louis',
        street: '102 Avenue des Champs-Élysées',
        city: 'Paris',
        zipCode: '75008',
        country: 'France',
        latitude: 48.8698,
        longitude: 2.3076,
        phone: '0144012345',
        status: PharmacyStatus.VALIDATED,
        operatingHours: {
          Lundi: '08:30-19:30',
          Mardi: '08:30-19:30',
          Mercredi: '08:30-19:30',
          Jeudi: '08:30-19:30',
          Vendredi: '08:30-19:30',
          Samedi: '09:00-18:00',
          Dimanche: 'Fermé',
        },
      },
    }),
    prisma.pharmacy.create({
      data: {
        email: 'pharma3@pharmacie.fr',
        password: pharmacyPassword,
        name: 'Pharmacie de la Bastille',
        street: '45 Place de la Bastille',
        city: 'Paris',
        zipCode: '75011',
        country: 'France',
        latitude: 48.8530,
        longitude: 2.3692,
        phone: '0143012345',
        status: PharmacyStatus.PENDING, // En attente de validation
        operatingHours: {
          Lundi: '08:00-20:00',
          Mardi: '08:00-20:00',
          Mercredi: '08:00-20:00',
          Jeudi: '08:00-20:00',
          Vendredi: '08:00-20:00',
          Samedi: '09:00-19:00',
          Dimanche: 'Fermé',
        },
      },
    }),
  ]);

  // Créer médicaments
  const medications = await Promise.all([
    prisma.medication.create({
      data: {
        name: 'Doliprane 500mg',
        genericName: 'Paracétamol',
        form: 'Comprimé',
        dosage: '500mg',
        manufacturer: 'Sanofi',
      },
    }),
    prisma.medication.create({
      data: {
        name: 'Ibuprofène 400mg',
        genericName: 'Ibuprofène',
        form: 'Comprimé',
        dosage: '400mg',
        manufacturer: 'Mylan',
      },
    }),
    prisma.medication.create({
      data: {
        name: 'Amoxicilline 1g',
        genericName: 'Amoxicilline',
        form: 'Gélule',
        dosage: '1g',
        manufacturer: 'Pfizer',
      },
    }),
    prisma.medication.create({
      data: {
        name: 'Ventoline 100μg',
        genericName: 'Salbutamol',
        form: 'Aérosol',
        dosage: '100μg/dose',
        manufacturer: 'GSK',
      },
    }),
    prisma.medication.create({
      data: {
        name: 'Spasfon 80mg',
        genericName: 'Phloroglucinol',
        form: 'Comprimé',
        dosage: '80mg',
        manufacturer: 'Teva',
      },
    }),
  ]);

  // Associer médicaments aux pharmacies (disponibilités)
  const availabilityMatrix = [
    // Pharmacy 1 (Pharmacie du Centre)
    { pharmacyIndex: 0, medIndex: 0, available: true },  // Doliprane
    { pharmacyIndex: 0, medIndex: 1, available: true },  // Ibuprofène
    { pharmacyIndex: 0, medIndex: 2, available: false }, // Amoxicilline
    { pharmacyIndex: 0, medIndex: 3, available: true },  // Ventoline
    { pharmacyIndex: 0, medIndex: 4, available: true },  // Spasfon
    
    // Pharmacy 2 (Pharmacie Saint-Louis)
    { pharmacyIndex: 1, medIndex: 0, available: true },  // Doliprane
    { pharmacyIndex: 1, medIndex: 1, available: false }, // Ibuprofène
    { pharmacyIndex: 1, medIndex: 2, available: true },  // Amoxicilline
    { pharmacyIndex: 1, medIndex: 3, available: true },  // Ventoline
    { pharmacyIndex: 1, medIndex: 4, available: false }, // Spasfon
    
    // Pharmacy 3 (Pharmacie de la Bastille)
    { pharmacyIndex: 2, medIndex: 0, available: true },  // Doliprane
    { pharmacyIndex: 2, medIndex: 1, available: true },  // Ibuprofène
    { pharmacyIndex: 2, medIndex: 2, available: false }, // Amoxicilline
    { pharmacyIndex: 2, medIndex: 3, available: false }, // Ventoline
    { pharmacyIndex: 2, medIndex: 4, available: true },  // Spasfon
  ];

  await Promise.all(
    availabilityMatrix.map(({ pharmacyIndex, medIndex, available }) =>
      prisma.pharmacyMedication.create({
        data: {
          pharmacyId: pharmacies[pharmacyIndex].id,
          medicationId: medications[medIndex].id,
          isAvailable: available,
        },
      })
    )
  );

  // Créer quelques avis
  await Promise.all([
    prisma.review.create({
      data: {
        pharmacyId: pharmacies[0].id,
        userId: user.id,
        rating: 5,
        comment: 'Pharmacie très professionnelle, personnel accueillant.',
      },
    }),
    prisma.review.create({
      data: {
        pharmacyId: pharmacies[1].id,
        userId: user.id,
        rating: 4,
        comment: 'Service rapide, parfois un peu d\'attente.',
      },
    }),
  ]);

  // Créer favoris
  await Promise.all([
    prisma.favorite.create({
      data: {
        userId: user.id,
        pharmacyId: pharmacies[0].id,
      },
    }),
    prisma.favorite.create({
      data: {
        userId: user.id,
        medicationId: medications[0].id,
      },
    }),
  ]);

  console.log('✅ Seeding terminé avec succès!');
  console.log(`📊 Données créées:`);
  console.log(`   - 1 admin: ${admin.email}`);
  console.log(`   - 1 utilisateur: ${user.email}`);
  console.log(`   - 3 pharmacies (2 validées, 1 en attente)`);
  console.log(`   - 5 médicaments`);
  console.log(`   - Disponibilités médicaments par pharmacie`);
  console.log(`   - 2 avis`);
  console.log(`   - 2 favoris`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });