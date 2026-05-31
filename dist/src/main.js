"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads',
    });
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Menu Digital QR API')
        .setDescription(`## API untuk aplikasi Menu Digital QR + Order Tracker\n\n` +
        `### Roles:\n` +
        `- **ADMIN** – Akses penuh ke semua data\n` +
        `- **OWNER** – Hanya bisa kelola store miliknya sendiri\n\n` +
        `### Autentikasi:\n` +
        `Gunakan endpoint \`/api/auth/login\` untuk mendapatkan token JWT, ` +
        `lalu klik tombol **Authorize** dan masukkan: \`Bearer <token>\``)
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth', 'Register & Login')
        .addTag('Users', 'Manajemen pengguna (Admin only)')
        .addTag('Stores', 'Manajemen toko/warung')
        .addTag('Categories', 'Kategori menu')
        .addTag('Menu Items', 'Item menu')
        .addTag('Orders', 'Pesanan & tracking status')
        .addTag('Upload', 'Upload gambar menu')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📚 Swagger docs: http://localhost:${port}/docs`);
    console.log(`🌐 API base URL: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map