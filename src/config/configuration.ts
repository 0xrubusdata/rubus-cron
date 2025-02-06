export default () => {
  const isDocker = process.env.IN_DOCKER === 'true'; 

  return {
    port: Number(process.env.PORT) || 3000,
    database: {
      host: isDocker ? process.env.POSTGRES_HOST : process.env.POSTGRES_LOCALHOST,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'rubus',
    },
  };
};
