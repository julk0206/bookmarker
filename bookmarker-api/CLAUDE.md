# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build
./mvnw clean package

# Run (requires PostgreSQL or uses H2 runtime fallback)
./mvnw spring-boot:run

# Run all tests (spins up PostgreSQL via Testcontainers — Docker must be running)
./mvnw test

# Run a single test class
./mvnw test -Dtest=BookmarkerApiApplicationTests

# Run without tests
./mvnw spring-boot:run -DskipTests
```

## Architecture

Spring Boot 4 REST API (Java 21, Maven) with a standard layered structure:

```
domain/Bookmark       — JPA entity mapped to bookmarks table (id, title, url, createdAt)
repository/           — Spring Data JPA (JpaRepository<Bookmark, Long>)
service/              — @Transactional service layer
ctrl/                 — REST controllers under /api/bookmarks
sample/DataInitializer — CommandLineRunner that seeds 20 bookmarks on every startup
```

**Database:** PostgreSQL in production; H2 available at runtime. Flyway is on the classpath for migrations (no migration scripts exist yet — schema is currently managed by `spring.jpa.hibernate.ddl-auto=update`). Flyway scripts should go in `src/main/resources/db/migration/` following `V1__description.sql` naming.

**Testing:** `BookmarkerApiApplicationTests` uses `@SpringBootTest` + Testcontainers (`PostgreSQLContainer`) via `@ServiceConnection` — no manual datasource config needed. Docker must be running for tests to pass.

**Context:** This project is part of a Kubernetes learning exercise (lives under `k8s/bookmarker-api`). It is likely intended to be containerized and deployed to a local cluster.