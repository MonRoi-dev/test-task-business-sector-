To start application
```npm start```

To start in dev mode with nodemon
```npm run dev```

To run migrations
```npx prisma init --datasource-provider mysql```
```npx prisma migrate dev ---name <migration_name>```

You should create .env with JWT_SECRET and edit DATABASE_URL with your mysql credentials

Example:
DATABASE_URL="mysql://name:password@localhost:port/db_name"
JWT_SECRET="SECRET_KEY"