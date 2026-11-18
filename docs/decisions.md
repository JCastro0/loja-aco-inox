# Decisões Técnicas

## Monorepo

- **O quê**: repositório único com `backend/` e `storefront/`
- **Porquê**: facilita mostrar o projeto completo a recrutadores e partilhar configurações (TypeScript, ESLint, Prettier)
- **Alternativas**: repositórios separados (mais complexo de gerir e de demonstrar)

## pnpm

- **O quê**: gestor de pacotes com workspaces
- **Porquê**: mais rápido que npm, suporte nativo a monorepos, economiza espaço em disco com hard links
- **Alternativas**: npm workspaces, yarn workspaces

## PostgreSQL

- **O quê**: base de dados relacional via Docker
- **Porquê**: requerido pelo Medusa, robusto para e-commerce, fácil de reproduzir com Docker
- **Alternativas**: MySQL (menos suportado pelo Medusa)

## Docker Compose

- **O quê**: PostgreSQL + Redis em containers
- **Porquê**: ambiente reproduzível, sem instalar serviços diretamente na máquina
- **Alternativas**: instalar PostgreSQL/Redis localmente (perde reprodutibilidade)
