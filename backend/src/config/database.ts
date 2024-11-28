import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('mydb', 'user', 'password', {
  // host: 'database',
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: console.log,
});

export async function initializeDatabase(sequelize: Sequelize) {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Conexión a la base de datos establecida exitosamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}
