# Portfolio Sergio

Portfolio em Next.js 16 com tela publica e painel administrativo para editar perfil, sobre mim, habilidades, projetos e experiencia.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse:

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

## Supabase com Prisma

O Supabase entra como banco Postgres gratuito, e o Prisma faz a conexao e cria as tabelas.

1. Crie um projeto gratuito no Supabase.
2. Em Project Settings > Database, copie a connection string.
3. Crie `.env.local` baseado em `.env.example`.
4. Preencha `DATABASE_URL`.
5. Rode:

```bash
npm run prisma:push
```

O Prisma cria uma tabela para cada parte do portfolio:

- `portfolio_profiles`
- `portfolio_about`
- `portfolio_skills`
- `portfolio_projects`
- `portfolio_experiences`

Depois disso, o CRUD em `/admin` salva os dados nessas tabelas separadas. Sem `DATABASE_URL`, o projeto usa `data/portfolio.json` como fallback local.

## Idiomas

O projeto suporta `pt` e `en` por query string:

- `/?lang=pt`
- `/?lang=en`
- `/admin?lang=pt`
- `/admin?lang=en`

Os dados do portfolio ficam no banco com a coluna `locale`. Para criar as colunas no Supabase, rode:

```bash
npm run prisma:push
```

No admin, trocar para `EN` edita/salva os registros em ingles; trocar para `PT` edita/salva os registros em portugues.

## Proteger o admin

Configure tambem no `.env.local`:

```bash
ADMIN_PASSWORD="sua-senha-do-painel"
AUTH_SECRET="uma-string-grande-aleatoria"
```

Em desenvolvimento, se `ADMIN_PASSWORD` nao existir, a senha temporaria e `admin`. Em producao, defina obrigatoriamente `ADMIN_PASSWORD` e `AUTH_SECRET` nas variaveis do deploy.

## Comandos uteis

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:studio
npm run lint
npm run build
```
