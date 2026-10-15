# otel-stack-lab
A reproducible OpenTelemetry laboratory with an OTLP collector, Prometheus, Tempo, and Grafana. It uses pinned images, bounded collector memory, batching, trace export, and Prometheus metric export.

```bash
docker compose up -d
./scripts/validate.sh
```

## Data flow
```mermaid
flowchart LR
  Services -->|OTLP| Collector
  Collector --> Tempo
  Collector --> Prometheus
  Tempo --> Grafana
  Prometheus --> Grafana
```

Next milestones add instrumented Rust/TypeScript services, Loki, provisioned dashboards, failure injection, SLOs, alerts, and an incident exercise.
The sample checkout service emits OpenTelemetry spans over OTLP, JSON logs containing trace IDs, and Prometheus request/failure counters. Inject a reproducible incident with:

```sh
curl -i -X POST -H 'x-failure-mode: payment-timeout' localhost:8080/checkout
```

Use Tempo for the trace, Prometheus for the error counter, Loki for correlated JSON logs, and Grafana as the shared investigation surface.
