# Checkout error budget burn

1. Confirm the alert ratio and request volume in Prometheus.
2. Open a failing trace in Tempo and copy its trace ID.
3. Search Loki for the same `trace_id`; identify the failing dependency and failure mode.
4. Stop injected failures, or roll back the responsible deployment. Do not retry non-idempotent payments blindly.
5. Confirm the five-minute error ratio is recovering, then record the timeline and follow-up action.
