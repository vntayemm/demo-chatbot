# ARCHITECTURE DOCUMENT AND DIAGRAMS (VI-EN) - Enterprise Chatbot | AI

## 1. Muc dich / Purpose

**VI:** Tai lieu tong hop cac so do kien truc va luong xu ly de phuc vu design review, pre-sales va trien khai production.  
**EN:** This document consolidates architecture and process diagrams for design review, pre-sales, and production planning.

## 2. Landscape Diagram

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

**VI:** So do mo ta bo canh tong the tu nguoi dung den cac lop ung dung/du lieu/van hanh.  
**EN:** This diagram shows the end-to-end context from user to application/data/operations layers.

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

## 4. Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Retriever
    participant Corpus
    participant Observability

    User->>Frontend: Submit question
    Frontend->>Backend: POST /chat/price or /chat/guide
    Backend->>Retriever: query + top_k
    Retriever->>Corpus: semantic retrieval
    Corpus-->>Retriever: relevant chunks
    Retriever-->>Backend: top_k contexts
    Backend-->>Frontend: answer + metadata
    Frontend-->>User: render response
    Backend->>Observability: logs + metrics
```

## 5. Workflow Diagram

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
```

**VI:** ERD la mo hinh logic de thong nhat tu dien du lieu, khong bat buoc trung 100% voi storage vat ly hien tai.  
**EN:** The ERD is a logical model for data dictionary alignment and may differ from physical storage implementation.

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

## 8. Scale Diagram

```mermaid
flowchart LR
    subgraph Ingress
      GW[API Gateway]
    end
    subgraph App Cluster
      S1[Chat Service Pod 1]
      S2[Chat Service Pod 2]
      SN[Chat Service Pod N]
    end
    subgraph Data
      CM[(Cache)]
      KB[(Corpus/Index)]
    end
    GW --> S1
    GW --> S2
    GW --> SN
    S1 --> CM
    S2 --> CM
    SN --> CM
    CM --> KB
```

## 9. Network Diagram

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

## 10. Security Diagram

```mermaid
flowchart TD
    U[User] --> T[TLS/HTTPS]
    T --> AUTH[Authentication]
    AUTH --> RBAC[Authorization RBAC]
    RBAC --> API[Backend API]
    API --> SAN[Input Validation]
    SAN --> DATA[Data Access]
    API --> AUDIT[Audit Logging]
    AUDIT --> SIEM[Monitoring/Alerting]
```

## 11. User Role Diagram

```mermaid
flowchart LR
    R1[End User] --> P1[Ask chatbot question]
    R2[Business Owner/PO] --> P2[View KPI + approve UAT]
    R3[Operator/Support] --> P3[Monitor + incident handling]
    R4[Admin/Security] --> P4[Access control + audit]
    R5[Dev/DevOps] --> P5[Deploy + maintain]
```

## 12. Ghi chu su dung / Usage Notes

- **VI:** Cac so do mang tinh tham chieu logic, can tuy chinh theo ha tang thuc te khi trien khai.  
- **EN:** Diagrams are logical references and should be adapted to actual deployment infrastructure.

- **VI:** Khi trinh bay cho khach hang, uu tien 5 so do: Landscape, HLA, Sequence, Security, User Role.  
- **EN:** For customer-facing reviews, prioritize 5 diagrams: Landscape, HLA, Sequence, Security, and User Role.
