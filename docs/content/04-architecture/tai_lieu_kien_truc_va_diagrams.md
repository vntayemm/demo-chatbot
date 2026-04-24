# TAI LIEU KIEN TRUC ARCHITECT VA DIAGRAMS - DEMO-CHATBOT

## 1. Muc dich

Tai lieu nay tong hop cac so do kien truc va luong xu ly de phuc vu:
- Thiet ke ky thuat
- Review voi stakeholder/business/IT/security
- Lam can cu trien khai production

## 2. Landscape Diagram (Tong the he sinh thai)

```mermaid
flowchart LR
    U[End User] --> W[Web UI - Frontend]
    W --> G[API Gateway / Reverse Proxy]
    G --> B[Chatbot Backend - FastAPI]
    B --> K[(Knowledge Corpus\nCSV/Markdown)]
    B --> M[(MLflow Tracking)]
    B --> L[(Logs/Metrics)]
    L --> O[Monitoring/Alerting]
    A[Admin/Ops] --> O
    A --> M
```

## 3. High Level Architecture Diagram

```mermaid
flowchart TB
    subgraph Presentation Layer
      FE[Vue Frontend]
    end

    subgraph Application Layer
      API[FastAPI Service]
      RET[Retrieval/Ranking Module]
      RES[Response Composer]
    end

    subgraph Data and Knowledge Layer
      PRICE[(Price Corpus)]
      GUIDE[(Guide Corpus)]
    end

    subgraph Ops and Governance Layer
      MLF[(MLflow)]
      OBS[(Logs/Metrics/Tracing)]
      DOCS[UAT/Go-live/SLO/Runbook]
    end

    FE --> API
    API --> RET
    RET --> PRICE
    RET --> GUIDE
    RET --> RES
    RES --> API
    API --> FE
    API --> MLF
    API --> OBS
    DOCS --> API
```

## 4. Sequence Diagram (Chat request)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Retriever
    participant Corpus
    participant Observability

    User->>Frontend: Nhap cau hoi
    Frontend->>Backend: POST /chat/price or /chat/guide
    Backend->>Retriever: xu ly query + top_k
    Retriever->>Corpus: tim ngu canh lien quan
    Corpus-->>Retriever: tra ve documents
    Retriever-->>Backend: top_k context
    Backend-->>Frontend: answer + metadata
    Frontend-->>User: hien thi cau tra loi
    Backend->>Observability: ghi log + metrics
```

## 5. Workflow Diagram (Business to Operation)

```mermaid
flowchart TD
    A[Collect Requirements] --> B[Design and Planning]
    B --> C[Build and Integrate]
    C --> D[Internal Testing]
    D --> E[Business UAT]
    E --> F{UAT Pass?}
    F -- No --> C
    F -- Yes --> G[Go-live Readiness]
    G --> H{GO Decision}
    H -- No --> C
    H -- Yes --> I[Production Go-live]
    I --> J[Hypercare]
    J --> K[Steady Operations]
```

## 6. ERD (Logical Data Model)

```mermaid
erDiagram
    BOT_DOMAIN ||--o{ CORPUS_DOCUMENT : contains
    CORPUS_DOCUMENT ||--o{ DOCUMENT_CHUNK : split_into
    CHAT_SESSION ||--o{ CHAT_MESSAGE : has
    CHAT_MESSAGE }o--|| BOT_DOMAIN : routed_to
    CHAT_MESSAGE }o--o{ DOCUMENT_CHUNK : references
    CHAT_SESSION ||--o{ METRIC_EVENT : emits

    BOT_DOMAIN {
      string domain_id PK
      string domain_name
      string endpoint
    }

    CORPUS_DOCUMENT {
      string document_id PK
      string domain_id FK
      string source_type
      string source_path
      datetime updated_at
    }

    DOCUMENT_CHUNK {
      string chunk_id PK
      string document_id FK
      int chunk_index
      text content
    }

    CHAT_SESSION {
      string session_id PK
      string user_id
      datetime created_at
    }

    CHAT_MESSAGE {
      string message_id PK
      string session_id FK
      string domain_id FK
      text question
      text answer
      datetime created_at
    }

    METRIC_EVENT {
      string event_id PK
      string session_id FK
      float latency_ms
      int top_k
      int token_count
      datetime created_at
    }
```

## 7. High Availability Diagram

```mermaid
flowchart TB
    U[Users] --> LB[Load Balancer]
    LB --> API1[Backend Instance 1]
    LB --> API2[Backend Instance 2]
    LB --> API3[Backend Instance N]

    API1 --> C[(Shared Corpus Storage)]
    API2 --> C
    API3 --> C

    API1 --> O[(Central Logs/Metrics)]
    API2 --> O
    API3 --> O

    O --> A[Alerting and On-call]
```

## 8. Scale Diagram (Horizontal scaling strategy)

```mermaid
flowchart LR
    subgraph Ingress
      GW[API Gateway]
    end

    subgraph App Cluster
      S1[Chat Service Pod 1]
      S2[Chat Service Pod 2]
      S3[Chat Service Pod 3]
      SN[Chat Service Pod N]
    end

    subgraph Data
      KB[(Corpus/Index)]
      CM[(Cache Layer)]
    end

    GW --> S1
    GW --> S2
    GW --> S3
    GW --> SN
    S1 --> CM
    S2 --> CM
    S3 --> CM
    SN --> CM
    CM --> KB
```

## 9. Network Diagram (Production reference)

```mermaid
flowchart TB
    INTERNET[Internet] --> WAF[WAF]
    WAF --> RP[Reverse Proxy/API Gateway]

    subgraph Private Subnet - App
      FE[Frontend Host]
      API[Backend Service]
    end

    subgraph Private Subnet - Data
      KS[(Knowledge Storage)]
      LG[(Log/Metric Stack)]
    end

    RP --> FE
    RP --> API
    API --> KS
    API --> LG
```

## 10. Security Diagram (Control layers)

```mermaid
flowchart TD
    U[User] --> T[TLS/HTTPS]
    T --> AUTH[Authentication\nJWT/OAuth2/SSO]
    AUTH --> RBAC[Authorization\nRBAC]
    RBAC --> API[Backend API]
    API --> SAN[Input Validation/Sanitization]
    SAN --> DATA[Data Access]
    API --> SECLOG[Security Logging/Audit Trail]
    SECLOG --> SIEM[Monitoring/Alerting]
```

## 11. User Role Diagram

```mermaid
flowchart LR
    subgraph Roles
      R1[End User]
      R2[Business Owner / PO]
      R3[Operator / Support]
      R4[Admin / Security]
      R5[Developer / DevOps]
    end

    subgraph Permissions
      P1[Ask chatbot question]
      P2[View dashboard and KPI]
      P3[Run UAT and sign-off]
      P4[Manage config and access]
      P5[Deploy and maintain service]
      P6[Incident response and RCA]
    end

    R1 --> P1
    R2 --> P2
    R2 --> P3
    R3 --> P2
    R3 --> P6
    R4 --> P4
    R4 --> P6
    R5 --> P5
    R5 --> P6
```

## 12. Ghi chu su dung

- Cac diagram la logical reference de review va planning.
- Khi trien khai production, can cap nhat theo ha tang thuc te (cloud/on-prem, subnet, IAM, monitoring stack).
- Neu can trinh bay cho khach hang, uu tien dung:
  - Landscape
  - High Level Architecture
  - Sequence
  - Security
  - User Role
