# heroo.shop

Лендинг heroo на Next.js 16 (App Router) + страница входа для клиентов.
Языки: EN / ES / PL / FR (адреса `/en`, `/es`, `/pl`, `/fr`).

## Запуск локально

```bash
npm install
npm run dev        # http://localhost:3000
```

Нужен Node.js 20.9 или новее.

## Деплой на Vercel

1. Залейте папку в репозиторий на GitHub.
2. На vercel.com нажмите **Add New → Project** и выберите репозиторий. Vercel сам определит Next.js, ничего настраивать не нужно.
3. В **Settings → Domains** добавьте `heroo.shop` и пропишите у регистратора DNS-записи, которые покажет Vercel.

## Что где лежит

| Что | Файл |
|---|---|
| Все тексты на 4 языках | `app/[lang]/dictionaries/*.json` |
| Главная страница | `app/[lang]/page.js` |
| Страница входа | `app/[lang]/login/page.js` + `app/components/LoginForm.js` |
| API входа (сейчас всегда отказ) | `app/api/login/route.js` |
| Цвета, анимации, вёрстка | `app/globals.css` (переменные в `:root`) |
| Домен, e-mail, Telegram, WhatsApp | `lib/i18n.js` → `site` |
| Попап «Contact» | `app/components/ContactModal.js` (тексты — блок `contact` в JSON) |
| Определение языка посетителя | `proxy.js` (cookie → язык браузера → EN) |
| Сервисы в бегущей строке | `brandsA` / `brandsB` в `app/[lang]/page.js` |

## Что нужно заполнить

- `[XX]%` — сколько экономят клиенты (`stats.saveValue` в каждом JSON).
- `[PRICE]` / `[PRECIO]` / `[CENA]` / `[PRIX]` — цены пакетов (`pricing.plans`).
- `hello@heroo.shop` в `lib/i18n.js` — ваш реальный e-mail. Форма «Get started» открывает почтовую программу с этим адресом.
- `telegram` и `whatsapp` в `lib/i18n.js` — ваш Telegram-username (без @) и номер WhatsApp только цифрами с кодом страны (например `48600123456`).
- Ссылки Terms / Privacy / Affiliate disclosure в футере пока ведут наверх страницы.

## Вход

Регистрации нет — логины и пароли выдаёте вы. Пока кабинета нет, `/api/login`
всегда отвечает «неверный логин или пароль» (HTTP 401). Когда будете делать
дашборд, замените проверку в `app/api/login/route.js` на настоящую
(хеши паролей в базе + подписанная cookie-сессия) и добавьте редирект в
`LoginForm.js` (там есть комментарий).

## Попап «Contact»

Любая ссылка с `href="#contact"` открывает попап с Telegram и WhatsApp — так сделаны пункт «Contact» в меню, «Book a call», «Support 24/7» и «Contact support» на странице входа. Чтобы добавить такую кнопку в другом месте, достаточно `<a href="#contact">…</a>`. Прямая ссылка `heroo.shop/en#contact` открывает сайт сразу с попапом.
