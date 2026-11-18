# Loja de Aço Inoxidável

Loja online de joalharia em aço inoxidável, construída como projeto de portefólio.

## Stack

- **Backend**: Medusa v2 + PostgreSQL + Redis
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Pagamentos**: Stripe + MB Way + Multibanco
- **Infra**: Docker, GitHub Actions, Vercel

## Arrancar localmente

1. Clona o repositório

   ```bash
   git clone https://github.com/JCastro0/loja-aco-inox.git
   cd loja-aco-inox
   ```

2. Copia as variáveis de ambiente

   ```bash
   cp .env.example .env
   ```

3. Levanta a base de dados e o Redis
   ```bash
   docker compose up -d --wait
   ```

## Decisões técnicas

Ver [docs/decisions.md](docs/decisions.md).
