import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'theenglishsparrow@gmail.com';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON
  app.use(express.json());

  // API Route for receiving leads and sending emails
  app.post('/api/leads', async (req, res) => {
    try {
      const { name, whatsapp, goal, score, discount, promoCode, timestamp } = req.body;

      if (!name || !whatsapp) {
        return res.status(400).json({ error: 'Имя и телефон WhatsApp обязательны' });
      }

      console.log('📬 Получена новая заявка:', { name, whatsapp, goal, score, discount, promoCode, timestamp });

      // Generate text & HTML body for the email
      const emailSubject = `🔥 Новая заявка от ${name} | Global Sparrow`;
      
      const emailText = `
Новая заявка на консультацию!

Имя: ${name}
WhatsApp: ${whatsapp}
Главная цель: ${goal}
Дата отправки: ${timestamp || new Date().toISOString()}

🎮 Результаты игры:
Очки: ${score || 0}
Полученная скидка: ${discount || 0}%
Промокод: ${promoCode || 'Нет промокода'}
      `;

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
          <div style="background-color: #0d9488; padding: 15px; border-radius: 8px 8px 0 0; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: -0.025em;">Global Sparrow</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Новая заявка на консультацию</p>
          </div>
          <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #1e293b; margin-bottom: 20px;">Поступил новый лид с сайта:</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; width: 35%;">Имя клиента:</td>
                <td style="padding: 10px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">WhatsApp (Телефон):</td>
                <td style="padding: 10px 0; color: #0f172a;"><a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" style="color: #0d9488; text-decoration: none; font-weight: bold;">${whatsapp}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Главная цель:</td>
                <td style="padding: 10px 0; color: #0f172a;">${goal}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Дата заявки:</td>
                <td style="padding: 10px 0; color: #0f172a;">${new Date(timestamp || Date.now()).toLocaleString('ru-RU')}</td>
              </tr>
            </table>

            <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <h3 style="margin-top: 0; color: #0f766e; font-size: 15px; border-bottom: 1px solid #99f6e4; padding-bottom: 5px; margin-bottom: 10px;">🎮 Результаты полетной игры:</h3>
              <p style="margin: 5px 0; font-size: 14px; color: #1e293b;"><strong>Набрано очков:</strong> ${score || 0}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #1e293b;"><strong>Скидка:</strong> ${discount || 0}%</p>
              <p style="margin: 5px 0; font-size: 14px; color: #1e293b;"><strong>Подарочный промокод:</strong> <code style="background-color: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-weight: bold; color: #0d9488;">${promoCode || 'Нет'}</code></p>
            </div>

            <div style="margin-top: 25px; text-align: center;">
              <a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" style="display: inline-block; padding: 12px 24px; background-color: #22c55e; color: white; text-decoration: none; font-weight: bold; border-radius: 8px;">Связаться в WhatsApp</a>
            </div>
          </div>
          <div style="text-align: center; padding: 15px; font-size: 11px; color: #94a3b8;">
            Письмо отправлено автоматически сервером Global Sparrow. Все права защищены.
          </div>
        </div>
      `;

      // Set up transporter (defaults to your provided Gmail SMTP credentials)
      const host = process.env.SMTP_HOST || 'smtp.gmail.com';
      const port = parseInt(process.env.SMTP_PORT || '465');
      const user = process.env.SMTP_USER || 'as19960423@gmail.com';
      const pass = process.env.SMTP_PASS || 'Sparrow3467';
      const from = process.env.SMTP_FROM || 'as19960423@gmail.com';

      let emailSent = false;
      let emailError = null;

      // Validate SMTP host to prevent DNS lookup crashes if placeholder/invalid host is provided
      const isHostValid = host && (host.includes('.') || host === 'localhost');

      if (isHostValid && user && pass) {
        try {
          // Set standard connection timeouts so requests don't hang indefinitely
          const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
            connectionTimeout: 10000, // 10s connection timeout
            greetingTimeout: 10000,
            socketTimeout: 15000,
          });

          await transporter.sendMail({
            from,
            to: RECIPIENT_EMAIL,
            subject: emailSubject,
            text: emailText,
            html: emailHtml
          });

          console.log(`✅ Письмо успешно отправлено на ${RECIPIENT_EMAIL}`);
          emailSent = true;
        } catch (mailErr: any) {
          console.error(`❌ Ошибка Nodemailer при отправке письма:`, mailErr);
          emailError = mailErr?.message || String(mailErr);
        }
      } else {
        let reason = 'настройки SMTP отсутствуют или неполные в переменных окружения';
        if (host && !isHostValid) {
          reason = `указан недействительный хост SMTP_HOST ("${host}")`;
        }
        console.warn(`⚠️ Пропущена отправка почты на сервере: ${reason}. Письмо выведено в логи.`);
        console.log('--- ТЕКСТ ПИСЬМА ---');
        console.log(`Кому: ${RECIPIENT_EMAIL}`);
        console.log(`Тема: ${emailSubject}`);
        console.log(emailText);
        console.log('--------------------');
      }

      // We ALWAYS return a success status to the client, even if the email failed,
      // to ensure the lead conversion isn't blocked and is stored state-side.
      return res.json({ 
        success: true, 
        message: emailSent 
          ? 'Заявка успешно принята и отправлена на почту!' 
          : (emailError ? `Заявка записана, но произошла ошибка отправки почты: ${emailError}` : 'Заявка успешно принята!'),
        emailSent,
        emailError,
        dev: !emailSent
      });
    } catch (error: any) {
      console.error('❌ Ошибка отправки заявки:', error);
      return res.status(500).json({ error: error?.message || 'Внутренняя ошибка сервера' });
    }
  });

  // Serve Vite or static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
